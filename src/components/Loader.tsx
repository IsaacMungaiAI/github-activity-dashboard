// components/ui/Loader.tsx
import { Loader2 } from "lucide-react";

interface LoaderProps {
  text?: string;
  fullScreen?: boolean;
}

export function Loader({ text = "Loading...", fullScreen = false }: LoaderProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50"
    : "flex flex-col items-center justify-center";

  return (
    <div className={containerClasses}>
      <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  );
}
