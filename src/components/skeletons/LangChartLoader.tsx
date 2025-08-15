// components/skeletons/LanguageChartSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function LanguageChartSkeleton() {
  return (
    <div className="p-4 rounded-lg shadow bg-white animate-pulse flex flex-col items-center space-y-4">
      <Skeleton className="w-40 h-40 rounded-full" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}
