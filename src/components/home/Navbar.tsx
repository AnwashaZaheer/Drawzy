import { Pencil, Moon } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-xl">
          <Pencil className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-extrabold tracking-tight text-gray-900">Drawzy</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 hidden sm:block">How to Play</a>
        <a href="#" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 hidden sm:block">About</a>
        <Button variant="ghost" size="sm" className="p-2">
          <Moon className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
};
