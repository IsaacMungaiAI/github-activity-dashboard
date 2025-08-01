import { Card, CardContent } from "@/components/ui/card";
import { Star, GitBranch, Users, Folder } from "lucide-react";


type Props = {
  type: "repos" | "commits" | "followers" | "stars";
  count: number;
};

const ICONS = {
    repos: <Folder className="text-blue-500" />,
    commits: <GitBranch className="text-green-500" />,
    followers: <Users className="text-purple-500" />,
    stars: <Star className="text-yellow-500" />,
};

const TITLES = {
    repos: "Repositories",
    commits: "Commits",
    followers: "Followers",
    stars: "Stars",
};


export default function StatsCard({ type, count }: Props) {
    return (
        <Card>
            <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{TITLES[type]}</span>
                    {ICONS[type]}
                </div>
                <p className="text-2xl font-bold">{count.toLocaleString()}</p>
            </CardContent>
        </Card>
    );
}
