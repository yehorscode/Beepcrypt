// Eksport funkcji do formatowania tekstu na kod Morse'a i odwrotnie
import { morseAlphabet } from "./morse-alpfabet";

export function textToMorse(text: string): string {
    return text
        .split("")
        .map((char) => morseAlphabet[char.toLowerCase()] || char)
        .join(" ");
}

export function morseToText(morse: string): string {
    return morse
        .split(" ")
        .map(
            (code) =>
                Object.keys(morseAlphabet).find(
                    (key) => morseAlphabet[key] === code
                ) || code
        )
        .join("");
}
