import { Card, CardContent } from "@/components/ui/card";

const MOCK_COMMITS = [
    {
        message: "Add GitHub API integration",
        date: "2025-07-30",
    },
    {
        message: "Fix profile avatar fallback bug",
        date: "2025-07-28",
    },
    {
        message: "Refactor dashboard layout",
        date: "2025-07-26",
    },
];

export default function CommitFeed() {
    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <h2 className="font-semibold text-lg">Recent Commits</h2>
                {MOCK_COMMITS.map((commit, i) => (
                    <div key={i} className="space-y-1">
                        <p className="text-sm">{commit.message}</p>
                        <p className="text-xs text-muted-foreground">{commit.date}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
