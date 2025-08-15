import { Card, CardContent } from "@/components/ui/card";
import { Star, GitBranch } from "lucide-react";
//import { useState } from "react";

type Repo = {
    name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
};

type RepoListProps = {
    repos: Repo[];
};



export default function RepoList({ repos }: RepoListProps) {

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <h2 className="font-semibold text-lg">Top Repositories</h2>
                {repos
                    .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars
                    .slice(0, 5) // Top 5
                    .map((repo) => (
                        <div key={repo.name} className="space-y-1">
                            <h3 className="text-md font-medium">{repo.name}</h3>
                            <p className="text-sm text-muted-foreground">{repo.description}</p>
                            <div className="flex gap-4 text-sm mt-1">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4" />
                                    {repo.stargazers_count}
                                </div>
                                <div className="flex items-center gap-1">
                                    <GitBranch className="w-4 h-4" />
                                    {repo.forks_count}
                                </div>
                            </div>
                        </div>
                    ))}
            </CardContent>
        </Card>
    );
}
