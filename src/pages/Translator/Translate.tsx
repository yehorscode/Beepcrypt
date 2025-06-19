import TranslateWindow from "@/components/translate-window";

export default function Translate() {
    return (
        <div>
            <div className="">
                <h1 className="text-3xl font-mono mt-10 text-left">Text to morse translator</h1>
                <h4 className="text-left opacity-60">Supports english only, uses profanity filter</h4>
                <br />
                <TranslateWindow />
            </div>
        </div>
    );
}