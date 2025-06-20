import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./Homepage.module.scss";
import { Button } from "@/components/ui/button";
export default function Homepage() {
    const titlelist = [
        "reinvented",
        "but worse",
        "made painful",
        "beep bop beep",
        "but bad",
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
                <del>Voice chats,{" "}
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
                </del>
                <br />
                <span className="text-4xl">THE VOICE CHATS DONT WORK FOR NOW</span>
                <br /><span>stearted with esier things, like:</span>
                <br />
                <br />
                <div className="flex justify-center">
                    <Button onClick={() => (window.location.href = "/secure")}>SECURING morse code</Button>
                    <Button className="inline-block ml-1" variant={"outline"} onClick={() => (window.location.href = "/translate")}>translator</Button>
                </div>
            </h1>
        </div>
    );
}

