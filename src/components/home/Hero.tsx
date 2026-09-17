import { Sparkles, MousePointerClick } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="text-center py-10 px-4 relative max-w-2xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-dashed border-ink/40 mb-6 rotate-[-2deg]">
        <Sparkles className="w-4 h-4 text-crayon-purple" />
        <span className="text-xs font-bold tracking-widest uppercase text-ink/70">The legendary drawing party game</span>
      </div>

      <h1 className="text-6xl sm:text-7xl font-bold leading-[0.95] mb-6 tracking-tight">
        <span className="block rotate-[-2deg]">Draw it.</span>
        <span className="relative inline-block rotate-[1.5deg] my-1 px-2">
          <span className="bg-crayon-yellow px-3 py-0.5 inline-block">Guess it.</span>
          <svg className="absolute -bottom-1.5 left-1 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M2 12 Q 30 5 50 11 T 98 9" fill="transparent" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-crayon-red" />
          </svg>
        </span>
        <span className="block rotate-[1deg] -mb-2">
          <span className="text-outline">Win</span> <span className="bg-crayon-green px-2 inline-block -rotate-2">big.</span>
        </span>
      </h1>

      <p className="text-lg sm:text-xl text-ink/70 font-medium rotate-[-0.5deg] flex items-center justify-center gap-2">
        <MousePointerClick className="w-5 h-5 text-crayon-blue" />
        A fast, wobbly multiplayer drawing game where your imagination does the talking.
      </p>
    </div>
  );
};