import { Card, CardContent } from "@/components/ui/card";
import { Star, GitBranch } from "lucide-react";

const MOCK_REPOS = [
    {
        name: "nextjs-dashboard",
        description: "A clean dashboard template using Next.js",
        stars: 120,
        forks: 30,
    },
    {
        name: "react-hooks-lib",
        description: "Reusable React hooks library",
        stars: 87,
        forks: 15,
    },
];

export default function RepoList() {
    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <h2 className="font-semibold text-lg">Top Repositories</h2>
                {MOCK_REPOS.map((repo) => (
                    <div key={repo.name} className="space-y-1">
                        <h3 className="text-md font-medium">{repo.name}</h3>
                        <p className="text-sm text-muted-foreground">{repo.description}</p>
                        <div className="flex gap-4 text-sm mt-1">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                {repo.stars}
                            </div>
                            <div className="flex items-center gap-1">
                                <GitBranch className="w-4 h-4" />
                                {repo.forks}
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
