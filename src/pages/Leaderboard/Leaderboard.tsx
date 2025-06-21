import LeaderboardComponent from "@/components/leaderboard";
import {
    ChartNoAxesColumnIncreasingIcon,
    User2Icon,
    Trophy,
} from "lucide-react";

export default function Leaderboard() {
    return (
        <div className="mt-10">
            <div className="flex gap-5 mb-3">
                <ChartNoAxesColumnIncreasingIcon size={75} />
                <User2Icon size={75} />
                <Trophy size={75} />
            </div>
            <h1 className="text-3xl font-mono text-left">
                Profanity leaderboard
            </h1>
            <h4 className="text-left">Have you been naughty? TYPE MORE BAD WORDS!!! ^*%^%^%$$@!%#$!@ Yes, we have an appwrite server</h4>
            <h4 className="opacity-60 text-left">
                Show how bad you are to the whole world!
            </h4>
            <LeaderboardComponent />
        </div>
    );
}
