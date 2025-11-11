import { cn } from '@/lib/utils';

interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className }: AnimatedGradientProps) {
  return (
    <div className={cn('absolute inset-0 -z-10 overflow-hidden', className)}>
      {/* Main gradient orbs */}
      <div className="animate-blob from-primary/30 absolute -top-1/2 -left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-r to-purple-400/30 blur-3xl" />
      <div className="animation-delay-2000 animate-blob to-primary/30 absolute -right-1/4 -bottom-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-400/30 blur-3xl" />
      <div className="animation-delay-4000 animate-blob absolute top-1/3 left-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-purple-300/20 to-pink-300/20 blur-3xl" />

      {/* Overlay for subtle noise texture */}
      <div className="from-background/80 via-background/60 to-background/80 absolute inset-0 bg-gradient-to-br" />
    </div>
  );
}
