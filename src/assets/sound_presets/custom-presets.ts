export type SoundPreset = {
    name: string;
    dot: string | null;
    dash: string | null;
};

export const soundPresets: SoundPreset[] = [
    {
        name: "Beep (short/long)",
        dot: "/sound_presets/beep/dot.ogg",
        dash: "/sound_presets/beep/dash.ogg",
    },
    {
        name: "Minecraft",
        dot: "/sound_presets/minecraft/dot.mp3",
        dash: "/sound_presets/minecraft/dash.mp3",
    },
    {
        name: "Car (not cat)",
        dot: "/sound_presets/car/dot.mp3", 
        dash: "/sound_presets/car/dash.mp3",
    },
];
