import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { ArrowLeftRight, Play, Pause, Copy } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { textToMorse, morseToText } from "./morse-formatter";
import { playMorseSequence, stopMorsePlayback } from "./morse-player";
import { Progress } from "./ui/progress";
import useMaskProfanity from "./mask-profanity";
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner";
import { soundPresets } from "../assets/sound_presets/custom-presets";
import { CustomSoundSelector } from "./custom-sound-selector";

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
    const [customDot, setCustomDot] = useState<File | null>(null);
    const [customDash, setCustomDash] = useState<File | null>(null);

    const [selectedPreset, setSelectedPreset] = useState(0);

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
            setProgress,
            customDot,
            customDash
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

    useEffect(() => {
        const preset = soundPresets[selectedPreset];
        if (selectedPreset === 0) {
            setCustomDot(null);
            setCustomDash(null);
        } else {
            setCustomDot(preset.dot as any); // string lub null
            setCustomDash(preset.dash as any);
        }
    }, [selectedPreset]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start w-full max-w-5xl mx-auto p-4">
            <div className="flex flex-col rounded-2xl p-3 bg-zinc-900/60 shadow-md">
                <span className="text-accent-foreground font-medium mb-2">
                    {fromText}
                </span>
                <Textarea
                    className="h-60 pr-10 bg-zinc-800 text-lg rounded-xl border border-zinc-700 focus:ring-2 focus:ring-green-700"
                    value={fromValue}
                    onChange={(e) => setFromValue(e.target.value)}
                    placeholder={mode === "to-morse" ? "Type your text here..." : "Type morse code (.-/--)"}
                />
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => {
                        navigator.clipboard.writeText(fromValue);
                        toast.success("Copied!");
                    }}
                    aria-label="Copy"
                >
                    <Copy size={18} />
                </Button>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <Tooltip>
                    <TooltipTrigger>
                        <ArrowLeftRight
                            size={41}
                            onClick={switchValues}
                            className="cursor-pointer border-3 border-green-700 p-1 rounded-md hover:bg-green-900/30 transition"
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Switch values</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <div className="flex flex-col rounded-2xl p-3 bg-zinc-900/60 shadow-md">
                <span className="text-accent-foreground font-medium mb-2">
                    {toText}
                </span>
                <Textarea
                    className="h-60 pr-10 bg-zinc-800 text-lg rounded-xl border border-zinc-700 focus:ring-2 focus:ring-green-700"
                    value={formattedFromText}
                    onChange={(e) => setToValue(e.target.value)}
                    placeholder={mode === "to-morse" ? "Morse code output..." : "Text output..."}
                />
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => {
                        navigator.clipboard.writeText(formattedFromText);
                        toast.success("Copied!");
                    }}
                    aria-label="Copy"
                >
                    <Copy size={18} />
                </Button>
            </div>
            {/* UI narzędzi i presetów na dole */}
            <div className="col-span-1 md:col-span-3 mt-8 w-full flex flex-col items-center gap-6">
                <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center">
                    <div className="flex flex-col gap-2 bg-zinc-900/60 rounded-xl p-3 shadow w-full md:w-1/2">
                        <span className="font-semibold text-lg mb-1">Sound Preset</span>
                        <select
                            className="bg-zinc-800 text-white rounded px-2 py-1 border border-zinc-700 focus:ring-2 focus:ring-green-700"
                            value={selectedPreset}
                            onChange={e => setSelectedPreset(Number(e.target.value))}
                        >
                            {soundPresets.map((preset, idx) => (
                                <option value={idx} key={preset.name}>{preset.name}</option>
                            ))}
                        </select>
                        <span className="text-xs text-zinc-400">Or upload your own:</span>
                        <CustomSoundSelector
                            customDot={customDot}
                            setCustomDot={setCustomDot}
                            customDash={customDash}
                            setCustomDash={setCustomDash}
                            />
                            <Tooltip delayDuration={500}>
                                <TooltipTrigger asChild>
                                    <span className="text-xs text-zinc-400 cursor-help hover:underline">How to contribute sounds</span>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <div className="bg-zinc-900 p-3 rounded-md shadow-lg">
                                        <p className="text-white font-semibold">Want to contribute custom sounds?</p>
                                        <p className="text-white mt-1">
                                            Record your own dot and dash sounds and submit them via
                                            <a
                                                href="https://github.com/yehorscode/beepcrypt/issues/new"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-500 underline ml-1 hover:text-green-400"
                                            >
                                                a GitHub issue
                                            </a>
                                            . We'll add them to our collection!
                                        </p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-1/2">
                        <span className="font-semibold">Speed</span>
                        <Slider
                            value={[speed * 100]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={([val]) => setSpeed(val / 100)}
                        />
                        <Progress value={progress * 100} />
                        <div className="flex gap-2 mt-2">
                            {isPlaying ? (
                                <Button className="bg-red-700 text-white" onClick={stopSound}>
                                    <Pause />
                                    Stop
                                </Button>
                            ) : (
                                <Button className="bg-green-700 text-white border-2 border-green-900" onClick={playSound}>
                                    <Play />
                                    Play morse
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

