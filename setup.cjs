const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const files = {
  'data/avatars.ts': `
export const avatars = ['😀', '😎', '🤓', '🥳', '🤠', '👻', '🐱', '🐶', '🦊', '🐼'];
`,
  'components/common/Button.tsx': `
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  fullWidth,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl font-bold transition-all active:scale-95',
        {
          'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg': variant === 'primary',
          'bg-indigo-100 text-indigo-700 hover:bg-indigo-200': variant === 'secondary',
          'bg-transparent text-gray-600 hover:bg-gray-100': variant === 'ghost',
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
`,
  'components/home/Navbar.tsx': `
import React from 'react';
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
`,
  'components/home/Hero.tsx': `
import React from 'react';

export const Hero = () => {
  return (
    <div className="text-center py-12 px-4 relative max-w-2xl mx-auto">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
        Draw it.<br />
        <span className="text-indigo-600 relative inline-block">
          Guess it.
          <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0 10 Q 50 20 100 10" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-yellow-400" />
          </svg>
        </span><br />
        Win it.
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 font-medium">
        A fast, fun multiplayer drawing game where your imagination does the talking.
      </p>
    </div>
  );
};
`,
  'components/home/AvatarSelector.tsx': `
import React from 'react';
import { avatars } from '../../data/avatars';
import { cn } from '../../utils/cn';

interface Props {
  selected: string;
  onSelect: (avatar: string) => void;
}

export const AvatarSelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-bold text-gray-700 mb-3">Choose your avatar</label>
      <div className="flex flex-wrap gap-3 justify-center">
        {avatars.map((avatar) => (
          <button
            key={avatar}
            onClick={() => onSelect(avatar)}
            className={cn(
              "text-3xl p-2 rounded-2xl transition-all",
              selected === avatar
                ? "bg-indigo-100 ring-4 ring-indigo-500 scale-110"
                : "bg-gray-50 hover:bg-gray-100 hover:scale-105"
            )}
          >
            {avatar}
          </button>
        ))}
      </div>
    </div>
  );
};
`,
  'components/home/PlayerSetup.tsx': `
import React from 'react';
import { AvatarSelector } from './AvatarSelector';

interface Props {
  nickname: string;
  setNickname: (name: string) => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
}

export const PlayerSetup: React.FC<Props> = ({ nickname, setNickname, avatar, setAvatar }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6 max-w-md mx-auto w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Ready to play?</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="nickname">
          Your nickname
        </label>
        <div className="relative">
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value.slice(0, 20))}
            placeholder="Enter your nickname..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-semibold text-gray-800 placeholder-gray-400"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
            {nickname.length}/20
          </span>
        </div>
      </div>

      <AvatarSelector selected={avatar} onSelect={setAvatar} />
    </div>
  );
};
`,
  'components/home/GameActions.tsx': `
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Pencil, Users } from 'lucide-react';

interface Props {
  nickname: string;
}

export const GameActions: React.FC<Props> = ({ nickname }) => {
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const handleCreate = () => {
    if (!nickname.trim()) {
      setError('Please enter a nickname first!');
      return;
    }
    setError('');
    navigate('/create');
  };

  const handleJoin = () => {
    if (!nickname.trim()) {
      setError('Please enter a nickname first!');
      return;
    }
    setError('');
    navigate('/join');
  };

  return (
    <div className="max-w-md mx-auto w-full flex flex-col gap-3">
      {error && <p className="text-red-500 font-bold text-sm text-center mb-2">{error}</p>}
      <Button size="lg" fullWidth onClick={handleCreate} className="gap-2 text-lg">
        <Pencil className="w-5 h-5" />
        Create Game
      </Button>
      <Button variant="secondary" size="lg" fullWidth onClick={handleJoin} className="gap-2 text-lg">
        <Users className="w-5 h-5" />
        Join Game
      </Button>
    </div>
  );
};
`,
  'components/home/QuickJoin.tsx': `
import React, { useState } from 'react';
import { Button } from '../common/Button';

export const QuickJoin = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Enter a code');
      return;
    }
    setError('');
    // Mock join
    alert(\`Joining room: \${code}\`);
  };

  return (
    <div className="max-w-md mx-auto w-full mt-8 text-center">
      <p className="text-sm font-bold text-gray-500 mb-3">Have a room code?</p>
      <form onSubmit={handleJoin} className="flex gap-2 justify-center max-w-xs mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 6))}
            placeholder="ABC123"
            className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none font-bold text-center uppercase tracking-widest text-gray-800"
          />
          {error && <span className="absolute -bottom-5 left-0 right-0 text-xs text-red-500 font-bold">{error}</span>}
        </div>
        <Button type="submit" size="sm" className="px-6 rounded-xl">Join</Button>
      </form>
    </div>
  );
};
`,
  'components/home/GameFeatures.tsx': `
import React from 'react';

export const GameFeatures = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-16 pb-8 text-sm font-bold text-gray-600">
      <div className="flex items-center gap-2">
        <span className="text-xl">🎨</span> Real-time drawing
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl">💬</span> Fast guessing
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl">🏆</span> Competitive scoring
      </div>
    </div>
  );
};
`,
  'components/home/Footer.tsx': `
import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-8 text-center text-sm font-semibold text-gray-400 mt-auto">
      <div className="flex justify-center gap-4 mb-2">
        <a href="#" className="hover:text-gray-600">How to Play</a>
        <a href="#" className="hover:text-gray-600">Privacy</a>
        <a href="#" className="hover:text-gray-600">Terms</a>
      </div>
      <p>Drawzy © 2026</p>
    </footer>
  );
};
`,
  'pages/HomePage.tsx': `
import React, { useState } from 'react';
import { Navbar } from '../components/home/Navbar';
import { Hero } from '../components/home/Hero';
import { PlayerSetup } from '../components/home/PlayerSetup';
import { GameActions } from '../components/home/GameActions';
import { QuickJoin } from '../components/home/QuickJoin';
import { GameFeatures } from '../components/home/GameFeatures';
import { Footer } from '../components/home/Footer';
import { avatars } from '../data/avatars';

export const HomePage = () => {
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState(avatars[0]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-indigo-200">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <Hero />
        <PlayerSetup nickname={nickname} setNickname={setNickname} avatar={avatar} setAvatar={setAvatar} />
        <GameActions nickname={nickname} />
        <QuickJoin />
        <GameFeatures />
      </main>
      <Footer />
    </div>
  );
};
`,
  'pages/CreateRoomPage.tsx': `
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Pencil } from 'lucide-react';

export const CreateRoomPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
          <Pencil className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Create Game</h1>
        <p className="text-gray-600 font-medium mb-8">Coming Next...</p>
        <Button onClick={() => navigate('/')} fullWidth>
          Back to Home
        </Button>
      </div>
    </div>
  );
};
`,
  'pages/JoinRoomPage.tsx': `
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Users } from 'lucide-react';

export const JoinRoomPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
          <Users className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Join Game</h1>
        <p className="text-gray-600 font-medium mb-8">Coming Next...</p>
        <Button onClick={() => navigate('/')} fullWidth>
          Back to Home
        </Button>
      </div>
    </div>
  );
};
`,
  'utils/cn.ts': `
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
  'App.tsx': `
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CreateRoomPage } from './pages/CreateRoomPage';
import { JoinRoomPage } from './pages/JoinRoomPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/join" element={<JoinRoomPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
`
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(srcDir, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\\n');
}
console.log('Files generated successfully.');
