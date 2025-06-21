import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./Homepage.module.scss";
import { Button } from "@/components/ui/button";
import morseencrypting from "@/assets/images/morseencrypting.png";
import morsetranslating from "@/assets/images/morsetranslator.png";

export default function Homepage() {
    const titlelist = [
        "reinvented",
        "but worse",
        "made painful",
        "beep bop beep",
        "but bad",
        "probably secure",
    ];
    // const wordlist = [
    //     "voice",
    //     "chat",
    //     "abcd"
    // ]
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const spanRef = useRef<HTMLSpanElement>(null);

    const transitionTitle = useCallback(() => {
        setIsExiting(true);
    }, []);

    useEffect(() => {
        if (isExiting) {
            const spanElement = spanRef.current;
            if (spanElement) {
                const handleAnimationEnd = () => {
                    setCurrentTitleIndex(
                        (prevIndex) => (prevIndex + 1) % titlelist.length
                    );
                    setIsExiting(false);
                    spanElement.removeEventListener(
                        "animationend",
                        handleAnimationEnd
                    );
                };
                spanElement.addEventListener(
                    "animationend",
                    handleAnimationEnd
                );
                return () => {
                    spanElement.removeEventListener(
                        "animationend",
                        handleAnimationEnd
                    );
                };
            }
        }
    }, [isExiting, titlelist.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            transitionTitle();
        }, 2000);
        return () => clearInterval(interval);
    }, [transitionTitle]);

    return (
        <div>
            <h1 className="font-mono text-4xl mt-40">
                <div className="gap-3 flex items-center justify-center">
                    <div className="w-16 h-16 bg-accent-foreground rounded-full inline-block"></div>
                    <div className="w-16 h-6 bg-accent-foreground rounded-none inline-block"></div>
                </div>
                <br />
                Morse code,{" "}
                <span
                    ref={spanRef}
                    className={`font-bold inline-block ${isExiting
                        ? styles.animateSlideDown
                        : styles.animateSlideUp
                        }`}
                    key={titlelist[currentTitleIndex]}
                >
                    {titlelist[currentTitleIndex]}
                </span>
                <br />
                <span className="text-xl">Ever wanted, to do something with your morse? Like.. <i>encrypt it?</i></span>
                <br />
                <span className="text-xl">Or maybe just.. listen to it? Yeaaah, you like that</span>
                <br />
                <br />
                <div className="flex justify-center">
                    <Button onClick={() => (window.location.href = "/secure")}>SECURE the morse code</Button>
                    <Button className="inline-block ml-1" variant={"outline"} onClick={() => (window.location.href = "/translate")}>translatah 4 morse code</Button>
                </div>
                <Card className="mt-10">
                    <CardHeader className="flex">
                        <img className="h-60 mr-4" src={morseencrypting} alt="Encrypting morse code" />
                        <div className="text-base text-left">
                            <span>You can encrypt and decrypt morse!</span> <br />
                            <span>Try this: --.- .. .. .-.. --- --. .. -.. code: 2137-2137</span> <br />
                            <Button className="mt-3">Try encrypting / decrypting</Button>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="mt-5">
                    <CardHeader className="flex">
                        <img className="h-60 mr-4" src={morsetranslating} alt="Translating morse code" />
                        <div className="text-base text-left">
                            <span>And now translate this!</span> <br />
                            <span>.. ..-.  /  -.-- --- ..-  /  -.-. .- -.  /  ... . .  /  - .... .. ...  /  -- . ... ... .- --. .  /  .. -  /  -- . .- -. ...  /  - .... .- -  /  - .... .  /  - .-. .- -. ... .-.. .- - --- .-.  /  .-- --- .-. -.- ...</span> <br />
                            <Button className="mt-3">Try translating</Button>
                        </div>
                    </CardHeader>
                </Card>
            </h1>
        </div>
    );
}