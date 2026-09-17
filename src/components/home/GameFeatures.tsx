import { Pencil, MessageCircle, Trophy } from 'lucide-react';

const features = [
  { icon: Pencil, title: 'Draw in real-time', tint: 'text-crayon-pink', bg: 'bg-crayon-pink/15', rotate: '-rotate-2' },
  { icon: MessageCircle, title: 'Guess like it\'s a race', tint: 'text-crayon-blue', bg: 'bg-crayon-blue/15', rotate: 'rotate-1' },
  { icon: Trophy, title: 'Score & show off', tint: 'text-crayon-orange', bg: 'bg-crayon-orange/15', rotate: 'rotate-[-1.5deg]' },
];

export const GameFeatures = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-14 pb-6">
      {features.map(({ icon: Icon, title, tint, bg, rotate }) => (
        <div key={title} className={`${bg} ${rotate} border-2 border-ink rounded-2xl px-4 py-2.5 flex items-center gap-2.5 hover:scale-105 hover:rotate-0 transition-transform cursor-default`}>
          <span className={`${tint}`}>
            <Icon className="w-5 h-5" />
          </span>
          <span className="font-bold text-sm">{title}</span>
        </div>
      ))}
    </div>
  );
};