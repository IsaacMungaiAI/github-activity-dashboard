// components/skeletons/ProfileCardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileCardSkeleton() {
  return (
    <div className="p-4 rounded-lg shadow bg-white space-y-3 animate-pulse">
      <Skeleton className="w-24 h-24 rounded-full mx-auto" />
      <Skeleton className="h-4 w-3/4 mx-auto" />
      <Skeleton className="h-3 w-1/2 mx-auto" />
      <Skeleton className="h-3 w-2/3 mx-auto" />
    </div>
  );
}
