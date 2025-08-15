// components/skeletons/RepoListSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function RepoListSkeleton() {
  return (
    <div className="p-4 rounded-lg shadow bg-white space-y-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}
