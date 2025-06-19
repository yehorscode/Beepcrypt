import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import SecureChoice from "@/components/secure-choice"

export default function Secure() {
    return (
        <div className="mt-10">
            <Tooltip>
            <h1 className="text-3xl font-mono  text-left">
                Ever wanted to send <TooltipTrigger><del className="opacity-60">secure</del>-ish*</TooltipTrigger> morse?
            </h1>
            <TooltipContent>This is not really secure, but you have some kind of security compared to normal morse</TooltipContent>
            </Tooltip>
            <h4 className="opacity-60 text-left">Idk why you would, but you kinda can</h4>

            <SecureChoice />
        </div>
    )
}
