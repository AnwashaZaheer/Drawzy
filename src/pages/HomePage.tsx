import { useState } from 'react';
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
