import { cn } from '@/lib/utils';

interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className }: AnimatedGradientProps) {
  return (
    <div className={cn('absolute inset-0 -z-10 overflow-hidden', className)}>
      {/* Dark background base */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Main gradient orbs - more vibrant */}
      <div className="animate-blob from-primary/60 absolute -top-1/2 -left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-r to-purple-500/50 blur-3xl" />
      <div className="animation-delay-2000 animate-blob to-primary/50 absolute -right-1/4 -bottom-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-blue-500/60 blur-3xl" />
      <div className="animation-delay-4000 animate-blob absolute top-1/3 left-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-purple-400/40 to-pink-400/40 blur-3xl" />

      {/* Subtle overlay - less opacity for more visible gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/30 via-slate-950/20 to-slate-950/30" />
    </div>
  );
}
