import { ChartNoAxesColumnIncreasingIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import profanityList from "../assets/filters/profanity.json";

function checkProfanity(username: string): boolean {
  return profanityList.some((entry: any) => {
    const regex = new RegExp(entry.match, "i");
    return regex.test(username);
  });
}

export default function LeaderboardComponent() {
  const [username, setUsername] = useState("");
  const [profanityCount, setProfanityCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    const count = Number(localStorage.getItem("profanityCount") || 0);
    setProfanityCount(count);
    databases.listDocuments("6856fff5003cfd6249ae", "68570000000adfd3a38e")
      .then(res => setLeaderboard(res.documents))
      .catch(() => setLeaderboard([]));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!username.trim()) {
      setError("Enter a username.");
      return;
    }
    if (checkProfanity(username)) {
      setError("Username contains forbidden words.");
      return;
    }
    setLoading(true);
    try {
      const ip = await fetch("https://api.ipify.org?format=json").then(r => r.json()).then(j => j.ip);
      // Hash the IP before sending (browser safe, no import)
      const hashedIp = await window.crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(ip)
      ).then(buf => Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, "0")).join(""));
      const dbId = "6856fff5003cfd6249ae";
      const colId = "68570000000adfd3a38e";
      const docs = await databases.listDocuments(dbId, colId, [
        Query.equal("ip", hashedIp)
      ]);
      if (docs.documents.length > 0) {
        await databases.updateDocument(dbId, colId, docs.documents[0].$id, {
          username,
          profanityCount
        });
      } else {
        await databases.createDocument(dbId, colId, "unique()", {
          username,
          profanityCount,
          ip: hashedIp
        });
      }
      const res = await databases.listDocuments(dbId, colId);
      setLeaderboard(res.documents);
    } catch (err) {
      setError("Error saving to leaderboard.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartNoAxesColumnIncreasingIcon /> Leaderboard
        </CardTitle>
        <CardDescription>
          Your score: <Badge>{profanityCount}</Badge>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 pb-6">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter username..."
          disabled={loading}
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-autocomplete="none"
        />
        {error && <span className="text-red-500 text-sm not-dark:text-red-500">{error}</span>}
        <Button type="submit" disabled={loading} className="dark:bg-white">Submit score</Button>
        <span className="text-sm text-red-500 border-3 border-dashed p-2 rounded-2xl border-red-800 not-dark:border-red-500">WARNING: Your ip is hashed (unreadable) and sent to the server</span>
      </form>
      <div className="px-6 pb-6">
        <h2 className="font-semibold mb-2">Top scores</h2>
        <ul className="space-y-1">
          {leaderboard.length === 0 && <li>No results.</li>}
          {leaderboard.map((entry, idx) => (
            <li key={entry.$id} className="flex justify-between">
              <span>{idx + 1}. {entry.username}</span>
              <Badge>{entry.profanityCount}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}