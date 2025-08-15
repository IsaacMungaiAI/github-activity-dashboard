// components/skeletons/StatsCardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardSkeleton() {
  return (
    <div className="p-4 rounded-lg shadow bg-white space-y-2 animate-pulse">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-8 w-2/3" />
    </div>
  );
}
