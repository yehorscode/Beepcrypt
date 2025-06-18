import TranslateWindow from "@/components/translate-window";

export default function Translate() {
    return (
        <div>
            <div className="">
                <h1 className="text-3xl font-mono mt-10 text-left">Text to morse translator</h1>
                <br />
                <TranslateWindow />
            </div>
        </div>
    );
}