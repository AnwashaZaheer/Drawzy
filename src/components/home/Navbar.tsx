import { Pencil, Moon } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-sm border-b-2 border-ink">
      <div className="flex items-center justify-between py-3 px-6 max-w-5xl mx-auto w-full">
        <a href="/" className="flex items-center gap-2 group">
          <div className="bg-crayon-pink p-2 rounded-xl border-2 border-ink shadow-[3px_3px_0_0_var(--color-ink)] group-hover:rotate-6 transition-transform">
            <Pencil className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight rotate-[-1deg]">Drawzy<span className="text-crayon-red">!</span></span>
          <span className="text-[10px] font-bold bg-crayon-green border-2 border-ink rounded-full px-2 py-0.5 rotate-6 mt-4 -ml-1">
            BETA
          </span>
        </a>
        <div className="flex items-center gap-3">
          <a href="#" className="font-semibold text-ink/80 hover:text-ink hover:underline underline-offset-4 hidden sm:block">How to Play</a>
          <a href="#" className="font-semibold text-ink/80 hover:text-ink hover:underline underline-offset-4 hidden sm:block">About</a>
          <Button variant="ghost" size="sm" className="p-2">
            <Moon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};