import dotSoundFile from "../assets/sounds/dot.ogg";
import dashSoundFile from "../assets/sounds/dash.ogg";

const dotSound = new Audio(dotSoundFile);
const dashSound = new Audio(dashSoundFile);

let isStopped = false;
let playTimeout: number | null = null;

export function playMorseSequence(
    morseString: string,
    unit = 0.05,
    onEnd?: () => void,
    setIsPlaying?: (v: boolean) => void,
    setProgress?: (progress: number) => void
) {
    if (!morseString) return;
    isStopped = false;
    if (setIsPlaying) setIsPlaying(true);
    const chars = morseString.split("");
    let index = 0;
    const total = chars.length;

    const playNext = () => {
        if (isStopped || index >= total) {
            if (setIsPlaying) setIsPlaying(false);
            if (setProgress) setProgress(1);
            if (onEnd) onEnd();
            return;
        }
        const symbol = chars[index];
        if (setProgress) setProgress(index / total);
        let delay = unit * 1000;
        if (symbol === ".") {
            dotSound.currentTime = 0;
            dotSound.play();
            delay = unit * 2 * 1000;
        } else if (symbol === "-") {
            dashSound.currentTime = 0;
            dashSound.play();
            delay = unit * 3 * 1000;
        } else if (symbol === " ") {
            delay = unit * 5 * 1000; // przerwa między słowami
        } else if (symbol === "/") {
            delay = unit * 2 * 1000; // przerwa między literami
        } else {
            delay = unit * 200;
        }
        index++;
        playTimeout = window.setTimeout(playNext, delay);
    };
    playNext();
}

export function stopMorsePlayback(setIsPlaying?: (v: boolean) => void) {
    isStopped = true;
    if (setIsPlaying) setIsPlaying(false);
    dotSound.pause();
    dashSound.pause();
    dotSound.currentTime = 0;
    dashSound.currentTime = 0;
    if (playTimeout) {
        clearTimeout(playTimeout);
        playTimeout = null;
    }
}

