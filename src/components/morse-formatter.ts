import { morseAlphabet } from "./morse-alpfabet";

export function textToMorse(text: string, alphabet: { [letter: string]: string } = morseAlphabet): string {
    return text
        .split("")
        .map((char) => {
            const morseCode = alphabet[char.toLowerCase()];
            if (!morseCode) {
                console.warn(`Character '${char}' not found in Morse alphabet.`);
                return "[unknown]"; // Provide a meaningful fallback
            }
            return morseCode;
        })
        .join(" ");
}

export function reverseMorseToText(morse: string, reverseAlphabet: { [code: string]: string }): string {
    return morse
        .split(" ")
        .map((code) => {
            const letter = reverseAlphabet[code];
            if (!letter) {
                console.warn(`Morse code '${code}' not found in reverse alphabet.`);
                return "[unknown]"; // Provide a meaningful fallback
            }
            return letter;
        })
        .join("");
}


export function morseToText(morse: string, alphabet: { [letter: string]: string } = morseAlphabet): string {
    return morse
        .split(" ")
        .map((code) => {
            const letter = Object.entries(alphabet).find(
                ([_, value]) => value === code
            )?.[0];
            if (!letter) {
                console.warn(`Morse code '${code}' not found in alphabet.`);
                return "[unknown]"; // Provide a meaningful fallback
            }
            return letter;
        })
        .join("");
}