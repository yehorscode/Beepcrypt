import { useState } from "react";
import { Button } from "./ui/button";
import { Lock, LockOpen, Shuffle, Pause, Play } from "lucide-react";
import { morseAlphabet } from "./morse-alpfabet";
import { textToMorse, reverseMorseToText } from "./morse-formatter";
import { playMorseSequence, stopMorsePlayback } from "./morse-player";
import { Textarea } from "./ui/textarea";
import useMaskProfanity from "./mask-profanity";
import { mulberry32, shuffleArray } from "@/components/utils/morse-utils";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";

export default function SecureChoice() {
    const [showLock, setShowLock] = useState(false);
    const [showUnlock, setShowUnlock] = useState(false);

    function ShowLockProcedure() {
        setShowLock(true);
        setShowUnlock(false);
    }
    function ShowUnlockProcedure() {
        setShowUnlock(true);
        setShowLock(false);
    }
    return (
        <div className="mt-10">
            <h1 className="text-lg font-mono">
                Do you want to make secure morse? Or decode it?
            </h1>
            <div className="flex gap-4 justify-center mt-3">
                <Button className="h-10 w-40" onClick={ShowLockProcedure}>
                    <Lock />
                    Secure
                </Button>
                <Button
                    variant={"outline"}
                    className="h-10 w-40"
                    onClick={ShowUnlockProcedure}
                >
                    <LockOpen />
                    Decode
                </Button>
            </div>
            <br />
            <br />
            {showLock && <LockProcedure />}
            {showUnlock && <UnlockProcedure />}
        </div>
    );
}

function LockProcedure() {
    const maskProfanity = useMaskProfanity();
    const [morseAlf] = useState(morseAlphabet);
    const [seed, setSeed] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [morseOutput, setMorseOutput] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [speed, setSpeed] = useState(0.04);

    function shuffleArray(array: string[], seed: number) {
        const rand = mulberry32(seed);
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!/^\d{8}$/.test(seed)) {
            setError("Please enter an 8-digit numeric code");
            return;
        }

        if (!text.trim()) {
            setError("Please enter text to encode");
            return;
        }

        const cleanText = maskProfanity(text.toLowerCase());

        const seedNum = parseInt(seed);
        const morseValues = Object.values(morseAlf);
        const shuffledValues = shuffleArray(morseValues, seedNum);
        const keys = Object.keys(morseAlf);
        const shuffledMorseAlphabet: { [letter: string]: string } = {};
        keys.forEach((key, index) => {
            shuffledMorseAlphabet[key] = shuffledValues[index];
        });

        const encoded = textToMorse(cleanText, shuffledMorseAlphabet);
        setMorseOutput(encoded);
    };

    function randomiseSeed() {
        let newSeed = Math.floor(Math.random() * 100000000).toString();
        while (newSeed.length < 8) {
            newSeed = "0" + newSeed;
        }
        setSeed(newSeed);
    }

    function playSound() {
        setProgress(0);
        playMorseSequence(
            morseOutput,
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

    return (
        <div className="text-center">
            <h1 className="text-xl font-mono mt-5">
                Let's guide you through the procedure!
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="mt-10">
                    <h2 className="text-xl mt-5">
                        1. What text do you want to morselock?
                    </h2>
                    <div className="flex justify-center">
                        <Textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="mt-2 max-w-md h-30"
                            placeholder="I want to collect points for a framework laptop <3"
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <h2 className="text-xl mt-5">2. What key to use?</h2>
                    <div className="justify-center flex mt-3">
                        <InputOTP
                            maxLength={8}
                            value={seed}
                            onChange={(value) => setSeed(value)}
                            pattern={REGEXP_ONLY_DIGITS}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                                <InputOTPSlot index={6} />
                                <InputOTPSlot index={7} />
                            </InputOTPGroup>
                        </InputOTP>
                        <Separator orientation="vertical" />
                        <Button className="ml-2" onClick={randomiseSeed}>
                            <Shuffle /> Shuffle
                        </Button>
                    </div>
                </div>
                {error && <p className="text-red-500 mt-3">{error}</p>}
                <div className="mt-5">
                    <h2 className="text-xl mt-5">3. Ready to morselock?</h2>
                    <div className="flex justify-center">
                        <Button type="submit" className="mt-3 h-10 w-40" variant={"success"}>
                            Hell yeah
                        </Button>
                    </div>
                </div>
                {morseOutput && (
                    <div className="mt-10 py-5">
                        <h2 className="text-xl font-medium mt-5">
                            Here is your complete locked morse value!
                        </h2>
                        <div className="flex justify-center mt-5">
                            <Textarea
                                value={morseOutput}
                                readOnly
                                placeholder=".-.. - .- -. -. -.-"
                                className="max-w-md h-30"
                            />
                        </div>
                        <center>
                        <div className="text-left mt-10 max-w-150 flex-col justify-center">
                            <h1 className="font-medium text-2xl mb-2">Tools</h1>
                            <div className="flex gap-2">
                                {isPlaying ? (
                                    <Button
                                        variant="destructive"
                                        onClick={stopSound}
                                    >
                                        <Pause />
                                        Stop
                                    </Button>
                                ) : (
                                    <Button
                                        variant="success"
                                        onClick={playSound}
                                    >
                                        <Play />
                                        Play morse
                                    </Button>
                                )}
                            </div>
                            <div className="mt-4">
                                <Progress value={progress * 100} />
                            </div>
                            <div className="mt-4">
                                <span className="mr-2">Speed</span>
                                <Slider
                                    value={[speed * 100]}
                                    min={1}
                                    max={10}
                                    step={1}
                                    onValueChange={([val]) =>
                                        setSpeed(val / 100)
                                    }
                                />
                            </div>
                        </div>
                        </center>
                    </div>
                )}
            </form>
        </div>
    );
}

// BLOODY HELL
// TODO: shtuff

function UnlockProcedure() {
    const [morseAlf] = useState(morseAlphabet);
    const [seed, setSeed] = useState<string>("");
    const [morseInput, setMorseInput] = useState<string>("");
    const [decodedText, setDecodedText] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!/^\d{8}$/.test(seed)) {
            setError("Please enter an 8-digit numeric code");
            return;
        }

        if (!morseInput.trim()) {
            setError("Please enter Morse code to decode");
            return;
        }
        if (!/^[\.-\s\/]+$/.test(morseInput)) {
            setError("Morse code can only contain '.', '-', ' ', or '/'");
            return;
        }

        const seedNum = parseInt(seed);
        const morseValues = Object.values(morseAlf);
        const shuffledValues = shuffleArray(morseValues, seedNum);
        const keys = Object.keys(morseAlf);
        const shuffledMorseAlphabet: { [letter: string]: string } = {};
        keys.forEach((key, index) => {
            shuffledMorseAlphabet[key] = shuffledValues[index];
        });
        const reverseShuffledMorse: { [code: string]: string } = {};
        Object.entries(shuffledMorseAlphabet).forEach(([letter, code]) => {
            reverseShuffledMorse[code] = letter;
        });
        console.log("Shuffled Morse Alphabet:", shuffledMorseAlphabet);
        console.log("Reverse mapping:", reverseShuffledMorse);
        const normalizedMorse = morseInput.replace(/\//g, " / ").replace(/\s+/g, " ").trim();
        console.log("Normalized Morse input:", normalizedMorse);
        const decoded = reverseMorseToText(normalizedMorse, reverseShuffledMorse);
        console.log("Decoded text:", decoded);

        setDecodedText(decoded);
    };

    return (
        <div className="text-center">
            <h1 className="text-xl font-mono mt-5">
                Let's decode your Morse code!
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="mt-10">
                    <h2 className="text-xl mt-5">
                        1. Enter your Morse code to unlock
                    </h2>
                    <div className="flex justify-center">
                        <Textarea
                            value={morseInput}
                            onChange={(e) => setMorseInput(e.target.value)}
                            className="mt-2 max-w-md h-30"
                            placeholder="Enter Morse code (e.g., -... .-.-.- .-.. .-)"
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <h2 className="text-xl mt-5">2. What key to use?</h2>
                    <div className="justify-center flex mt-3">
                        <InputOTP
                            maxLength={8}
                            value={seed}
                            onChange={(value) => setSeed(value)}
                            pattern={REGEXP_ONLY_DIGITS}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                                <InputOTPSlot index={6} />
                                <InputOTPSlot index={7} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                </div>
                {error && <p className="text-red-500 mt-3">{error}</p>}
                <div className="mt-5">
                    <h2 className="text-xl mt-5">3. Ready to unlock?</h2>
                    <div className="flex justify-center">
                        <Button type="submit" className="mt-3 h-10 w-40" variant={"success"}>
                            Hell yeah
                        </Button>
                    </div>
                </div>
                {decodedText && (
                    <div className="mt-5">
                        <h2 className="text-xl mt-5">
                            Here is your decoded text!
                        </h2>
                        <div className="flex justify-center">
                            <Textarea
                                value={decodedText}
                                readOnly
                                placeholder="Your decoded text"
                                className="max-w-md h-30 mt-2"
                            />
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
