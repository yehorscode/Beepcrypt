import TranslateWindow from "@/components/translate-window";
import { RectangleEllipsis, LanguagesIcon, TextIcon } from "lucide-react";

export default function Translate() {
    return (
        <div>
            <div className="mt-10">
                <div className="flex gap-5 mb-3">
                <TextIcon size={75} />
                <LanguagesIcon size={75} />
                <RectangleEllipsis size={75} />
            </div>
                <h1 className="text-3xl font-mono text-left">Text to morse translator</h1>
                <h4 className="text-left opacity-60">Supports english only, uses profanity filter</h4>
                <br />
                <TranslateWindow />
            </div>
        </div>
    );
}