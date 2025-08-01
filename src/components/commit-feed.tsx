import { Card, CardContent } from "@/components/ui/card";
import { GitCommit } from "lucide-react";
import Image from 'next/image'
import Link from "next/link";

type Props = {
    activity: Awaited<ReturnType<typeof import('@/lib/github').getUserActivity>>;
};



export default function CommitFeed({ activity }: Props) {
    const pushEvents = activity.filter((event: { type: string; }) => event.type === "PushEvent").slice(0, 10);
    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <GitCommit className="w-5 h-5" />
                    Recent Commits
                </h2>

                <ul className="space-y-3">
                    {pushEvents.map((event: { payload: { commits: any[]; }; repo: { name: any; }; actor: { avatar_url: any; }; id: any; created_at: string | number | Date; }) =>
                        event.payload.commits.map((commit: any, idx: number) => {
                            const commitUrl = `https://github.com/${event.repo.name}/commit/${commit.sha}`;
                            const avatarUrl = event.actor?.avatar_url;
                            const repoName = event.repo?.name;
                            const authorName = commit.author?.name || "Unknown";

                            return (
                                <li
                                    key={`${event.id}-${idx}`}
                                    className="flex items-start gap-3 border-b pb-3"
                                >
                                    {avatarUrl && (
                                        <Image
                                            src={avatarUrl}
                                            alt="avatar"
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                    )}

                                    <div className="space-y-1">
                                        <Link
                                            href={commitUrl}
                                            target="_blank"
                                            className="text-sm font-medium hover:underline"
                                        >
                                            {commit.message}
                                        </Link>

                                        <p className="text-xs text-muted-foreground">
                                            {authorName} in <span className="font-semibold">{repoName}</span>
                                            {" – "}
                                            {new Date(event.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </li>
                            );
                        })
                    )}
                </ul>
            </CardContent>
        </Card>
    );
}
