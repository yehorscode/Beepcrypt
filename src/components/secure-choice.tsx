import { useState } from "react";
import { Button } from "./ui/button";
import { Lock, LockOpen, Shuffle, Pause, Play, CopyIcon } from "lucide-react";
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
import { toast } from "sonner";

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
                        <Button className="ml-2 border-2 border-green-500" onClick={randomiseSeed}>
                            <Shuffle /> Shuffle
                        </Button>
                    </div>
                </div>
                {error && <p className="text-red-500 mt-3">{error}</p>}
                <div className="mt-5">
                    <h2 className="text-xl mt-5">3. Ready to morselock?</h2>
                    <div className="flex justify-center">
                        <Button type="submit" className="mt-3 h-10 w-40 border-2 border-green-900" variant={"success"}>
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
                            <div className="relative w-full max-w-md">
                                <Textarea
                                    value={morseOutput}
                                    readOnly
                                    placeholder=".-.. - .- -. -. -.-"
                                    className="h-30 pr-10"
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className="absolute top-2 right-2"
                                    onClick={() => {
                                        navigator.clipboard.writeText(morseOutput);
                                        toast.success("Copied!");
                                    }}
                                    aria-label="Copy"
                                >
                                    <CopyIcon size={18} />
                                </Button>
                            </div>
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
                                        className="border-2 border-green-900"
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
    // Brute-force protection state
    const [attempts, setAttempts] = useState<number>(0);
    const [firstAttemptTime, setFirstAttemptTime] = useState<number | null>(null);
    const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
    const [lastFullSeed, setLastFullSeed] = useState<string>("");

    // Helper: check if in cooldown
    const isCooldown = cooldownUntil && Date.now() < cooldownUntil;
    const cooldownLeft = isCooldown ? Math.ceil((cooldownUntil! - Date.now()) / 1000) : 0;

    // Helper: handle full code change
    function handleSeedChange(value: string) {
        setSeed(value);
        if (value.length === 8 && value !== lastFullSeed) {
            setLastFullSeed(value);
            // Only count as attempt if all 8 digits filled and changed
            handleAttempt();
        }
    }

    function handleAttempt() {
        const now = Date.now();
        if (!firstAttemptTime || now - firstAttemptTime > 60000) {
            // Reset window if more than 1 min passed
            setFirstAttemptTime(now);
            setAttempts(1);
        } else {
            setAttempts((prev) => {
                const newAttempts = prev + 1;
                if (newAttempts >= 20) {
                    setCooldownUntil(now + 10000); // 10s cooldown
                }
                return newAttempts;
            });
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (isCooldown) {
            setError(`Too many attempts. Wait ${cooldownLeft}s before trying again.`);
            return;
        }
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
        const normalizedMorse = morseInput.replace(/\//g, " / ").replace(/\s+/g, " ").trim();
        const decoded = reverseMorseToText(normalizedMorse, reverseShuffledMorse);
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
                            onChange={handleSeedChange}
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
                {isCooldown && (
                    <p className="text-orange-500 mt-3">
                        Too many attempts. Wait {cooldownLeft}s before trying again.
                    </p>
                )}
                {error && <p className="text-red-500 mt-3">{error}</p>}
                <div className="mt-5">
                    <h2 className="text-xl mt-5">3. Ready to unlock?</h2>
                    <div className="flex justify-center">
                        <Button type="submit" className="mt-3 h-10 w-40 border-2 border-green-900" variant={"success"} disabled={!!isCooldown}>
                            Hell yeah
                        </Button>
                    </div>
                    {/* Pokazuje liczbę prób w aktualnym oknie */}
                    <div className="text-xs text-gray-400 mt-2">
                        Attempts this minute: {attempts}/20
                    </div>
                </div>
                {decodedText && (
                    <div className="mt-5">
                        <h2 className="text-xl mt-5">
                            Here is your decoded text!
                        </h2>
                        <div className="flex justify-center relative">
                            <Textarea
                                value={decodedText}
                                readOnly
                                placeholder="Your decoded text"
                                className="max-w-md h-30 mt-2"
                            />
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="absolute top-2 right-2"
                                onClick={() => {
                                    navigator.clipboard.writeText(decodedText);
                                    toast.success("Copied!");
                                }}
                                aria-label="Copy"
                            >
                                <CopyIcon size={18} />
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
