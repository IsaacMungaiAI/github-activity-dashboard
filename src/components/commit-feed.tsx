import { Card, CardContent } from "@/components/ui/card";
import { GitCommit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GitHubEvent, GitHubPushEvent } from "@/types/github";

type Props = {
  activity: GitHubEvent[];
};

export default function CommitFeed({ activity }: Props) {
  const pushEvents = activity
    .filter((event): event is GitHubPushEvent => event.type === "PushEvent")
    .slice(0, 10);

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <GitCommit className="w-5 h-5" />
          Recent Commits
        </h2>

        <ul className="space-y-3">
          {pushEvents.map((event) =>
            event.payload.commits.map((commit, idx) => {
              const commitUrl = `https://github.com/${event.repo.name}/commit/${commit.sha}`;

              return (
                <li
                  key={`${event.id}-${idx}`}
                  className="flex items-start gap-3 border-b pb-3"
                >
                  {event.actor.avatar_url && (
                    <Image
                      src={event.actor.avatar_url}
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
                      {commit.author.name} in{" "}
                      <span className="font-semibold">{event.repo.name}</span>
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
