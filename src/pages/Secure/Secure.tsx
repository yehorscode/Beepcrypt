import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import SecureChoice from "@/components/secure-choice";
import { Lock, RectangleEllipsis, Key } from "lucide-react";

export default function Secure() {
    return (
        <div className="mt-10">
            <div className="flex gap-5 mb-3">
                <Lock size={75} />
                <Key size={75} />
                <RectangleEllipsis size={75} />
            </div>
            <Tooltip>
                <h1 className="text-3xl font-mono text-left">
                    Ever wanted to send{" "}
                    <TooltipTrigger>
                        <del className="opacity-60">secure</del>-ish*
                    </TooltipTrigger>{" "}
                    morse?
                </h1>
                <TooltipContent>
                    This is not really secure, but you have some kind of
                    security compared to normal morse
                </TooltipContent>
            </Tooltip>
            <h4 className="opacity-60 text-left">
                Idk why you would, but you kinda can
            </h4>
            <div className="mt-5 text-left">
                <p>
                    How does it work? Basically: <br />
                </p>
                <ol className="list-decimal ml-5">
                    <li>
                        You give a seed (code) to a custom randomisation algorithm
                        with mullberry32
                    </li>
                    <li>
                        The morse code alphabet is randomised with that randomisation
                    </li>
                    <li>
                        You get a text output that is next converted to morse and
                        displayed to you
                    </li>
                </ol>
                <p className="mt-2">Other way around is basically the same, just reverse the steps (or tbh i dont really know myself)</p>
                <span className="opacity-60">Uses profanity filter, 20 attempts per minute</span>
            </div>
            <SecureChoice />
        </div>
    );
}
