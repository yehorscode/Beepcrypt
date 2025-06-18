import { useEffect, useState } from "react";
import { toast } from "sonner"
export function useIncrementProfanityCount() {
    const [profanityCount, setProfanityCount] = useState(() => {
        const stored = localStorage.getItem("profanityCount");
        return stored ? parseInt(stored) : 0;
    });

    useEffect(() => {
        localStorage.setItem("profanityCount", profanityCount.toString());
    }, [profanityCount]);

    const increment = () => {
        setProfanityCount((prev) => prev + 1);
        toast("PROFANITY FOUND!", {
            description: "The text contains forbidden words, stop using them",
            icon: "🚨",
            className: "my-toast-class",
            style: {
                background: "red",
                color: "white",
            }
        });
    };

    return [profanityCount, increment] as const;
}
