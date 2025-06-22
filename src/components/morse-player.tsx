let isStopped = false;
let playTimeout: number | null = null;

export function playMorseSequence(
    morseString: string,
    unit = 0.05,
    onEnd?: () => void,
    setIsPlaying?: (v: boolean) => void,
    setProgress?: (progress: number) => void,
    customDotSound?: File | string | null,
    customDashSound?: File | string | null,
    onCharIndexChange?: (idx: number) => void // <--- DODANE
) {
    if (!morseString) return;
    isStopped = false;
    if (setIsPlaying) setIsPlaying(true);
    const chars = morseString.split("");
    let index = 0;
    const total = chars.length;

    let dotAudio: HTMLAudioElement | null = null;
    let dashAudio: HTMLAudioElement | null = null;
    if (customDotSound) {
        if (typeof customDotSound === "string") {
            dotAudio = new Audio(customDotSound);
        } else if (customDotSound instanceof File && customDotSound.type.startsWith("audio/")) {
            dotAudio = new Audio(URL.createObjectURL(customDotSound));
        } else {
            dotAudio = null;
        }
    }
    if (customDashSound) {
        if (typeof customDashSound === "string") {
            dashAudio = new Audio(customDashSound);
        } else if (customDashSound instanceof File && customDashSound.type.startsWith("audio/")) {
            dashAudio = new Audio(URL.createObjectURL(customDashSound));
        } else {
            dashAudio = null;
        }
    }
    if (!dotAudio) dotAudio = new Audio('/sound_presets/beep/dot.ogg');
    if (!dashAudio) dashAudio = new Audio('/sound_presets/beep/dash.ogg');

    const playNext = () => {
        if (isStopped || index >= total) {
            if (setIsPlaying) setIsPlaying(false);
            if (setProgress) setProgress(1);
            if (onCharIndexChange) onCharIndexChange(-1); // reset po zakończeniu
            if (onEnd) onEnd();
            return;
        }
        const symbol = chars[index];
        if (setProgress) setProgress(index / total);
        if (onCharIndexChange) onCharIndexChange(index); // <--- DODANE
        let audio: HTMLAudioElement | null = null;
        let delay = unit * 1000;
        if (symbol === ".") {
            audio = dotAudio;
        } else if (symbol === "-") {
            audio = dashAudio;
        }
        if (audio) {
            audio.currentTime = 0;
            audio.play();
            let baseDot = 1.2;
            let baseDash = 3;
            let maxDuration = symbol === "." ? baseDot * unit / 0.05 : baseDash * unit / 0.05;
            let cutTimeout = setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
                if (audio.onended) audio.onended = null;
                let extraDelay = symbol === "." ? unit * 1000 : unit * 2 * 1000;
                playTimeout = window.setTimeout(() => {
                    index++;
                    playNext();
                }, extraDelay);
            }, maxDuration * 1000);
            audio.onended = () => {
                clearTimeout(cutTimeout);
                let extraDelay = symbol === "." ? unit * 1000 : unit * 2 * 1000;
                playTimeout = window.setTimeout(() => {
                    index++;
                    playNext();
                }, extraDelay);
            };
        } else {
            delay = symbol === " " ? unit * 5 * 1000 : symbol === "/" ? unit * 2 * 1000 : unit * 200;
            playTimeout = window.setTimeout(() => {
                index++;
                playNext();
            }, delay);
        }
    };
    playNext();
}

export function stopMorsePlayback(setIsPlaying?: (v: boolean) => void) {
    isStopped = true;
    if (setIsPlaying) setIsPlaying(false);
    if (playTimeout) {
        clearTimeout(playTimeout);
        playTimeout = null;
    }
}

