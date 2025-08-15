// components/skeletons/CommitFeedSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function CommitFeedSkeleton() {
  return (
    <div className="p-4 rounded-lg shadow bg-white space-y-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}
