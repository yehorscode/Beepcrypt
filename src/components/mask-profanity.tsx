import { useIncrementProfanityCount } from "./increment-profanity";
import profanity from "@/assets/filters/profanity.json";

export default function useMaskProfanity() {
    const [profanityCount, incrementProfanityCount] = useIncrementProfanityCount();
    const maskProfanity = (text: string): string => {
        if (!Array.isArray(profanity)) return text;
        let masked = text;
        let found = false;
        for (const entry of profanity) {
            if (!entry.match) continue;
            const pattern = new RegExp(`\\b(${entry.match})\\b`, "gi");
            if (pattern.test(masked)) {
                found = true;
            }
            masked = masked.replace(pattern, (m: string) => "*".repeat(m.length));
        }
        if (found) incrementProfanityCount();
        return masked;
    };
    return maskProfanity;
}
