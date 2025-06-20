import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./Homepage.module.scss";

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
                Voice chats,{" "}
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
            </h1>
        </div>
    );
}

