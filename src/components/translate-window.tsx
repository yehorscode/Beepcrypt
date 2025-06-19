import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { ArrowLeftRight, Play, Pause } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { textToMorse, morseToText } from "./morse-formatter";
import { playMorseSequence, stopMorsePlayback } from "./morse-player";
import { Progress } from "./ui/progress";
import useMaskProfanity from "./mask-profanity";
import { Slider } from "@/components/ui/slider"

export default function TranslateWindow() {
    const [fromValue, setFromValue] = useState("");
    const [toValue, setToValue] = useState("");
    const [mode, setMode] = useState("to-morse"); // to-morse or to-text
    const [formattedFromText, setFormattedFromText] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const fromText = mode === "to-morse" ? "Text" : "Morse code";
    const toText = mode === "to-morse" ? "Morse code" : "Text";

    const [speed, setSpeed] = useState(0.04);

    const maskProfanity = useMaskProfanity();

    const formatFromText = () => {
        if (mode === "to-morse") {
            setFormattedFromText(textToMorse(maskProfanity(fromValue)));
        } else {
            setFormattedFromText(maskProfanity(morseToText(fromValue)));
        }
    };

    function playSound() {
        setProgress(0);
        playMorseSequence(
            formattedFromText,
            speed,
            undefined,
            setIsPlaying,
            setProgress
        );
    }

    function stopSound() {
        stopMorsePlayback(setIsPlaying);
        setProgress(0);
    }

    const switchValues = () => {
        setFromValue(toValue);
        setToValue(fromValue);
        setMode(mode === "to-morse" ? "to-text" : "to-morse");
    };

    useEffect(() => {
        formatFromText();
    }, [fromValue, mode]);

    return (
        <div className="grid grid-cols-3 gap-1 items-center">
            <div className="flex flex-col rounded-2xl p-3">
                <span className="text-accent-foreground font-medium">
                    {fromText}
                </span>
                <Textarea
                    className="mt-1 h-60"
                    value={fromValue}
                    onChange={(e) => setFromValue(e.target.value)}
                    placeholder=""
                />
            </div>
            <div className="flex justify-center">
                <Tooltip>
                    <TooltipTrigger>
                        <ArrowLeftRight
                            size={24}
                            onClick={switchValues}
                            className="cursor-pointer"
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Switch values</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <div className="flex flex-col rounded-2xl p-3">
                <span className="text-accent-foreground font-medium">
                    {toText}
                </span>
                <Textarea
                    className="mt-1 h-60"
                    value={formattedFromText}
                    onChange={(e) => setToValue(e.target.value)}
                    placeholder=""
                />
            </div>
            <div className="text-left mt-5">
                <h1 className="font-medium text-2xl mb-2">Tools</h1>
                <div className="flex gap-2">
                    {isPlaying ? (
                        <Button className="bg-red-700 text-white" onClick={stopSound}>
                            <Pause />
                            Stop
                        </Button>
                    ) : (
                        <Button className="bg-green-700 text-white" onClick={playSound}>
                            <Play />
                            Play morse
                        </Button>
                    )}
                </div>
                <div className="mt-4">
                    <Progress value={progress * 100} />
                </div>
                <div className="mt-4">
                    <span>Speed</span>
                <div>
                <Slider
                    value={[speed * 100]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={([val]) => setSpeed(val / 100)}
                />
                </div>
                </div>
            </div>
        </div>
    );
}

