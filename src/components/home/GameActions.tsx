import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Pencil, Shuffle } from 'lucide-react';

interface Props {
  nickname: string;
  avatar: string;
}

export const GameActions: React.FC<Props> = ({ nickname, avatar }) => {
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const handleCreate = () => {
    if (!nickname.trim()) {
      setError('Please enter a nickname first!');
      return;
    }
    setError('');
    navigate('/create', { state: { nickname, avatar } });
  };

  const handleQuickMatch = () => {
    if (!nickname.trim()) {
      setError('Please enter a nickname first!');
      return;
    }
    setError('');
    navigate('/quick-match', { state: { nickname, avatar } });
  };

  return (
    <div className="max-w-md mx-auto w-full flex flex-col gap-4">
      {error && (
        <p className="mx-auto bg-crayon-red text-white font-bold text-sm px-4 py-1.5 rounded-full border-2 border-ink animate-wiggle">
          oops! {error}
        </p>
      )}
      <Button size="lg" fullWidth onClick={handleCreate} className="gap-2 text-lg">
        <Pencil className="w-5 h-5" />
        Create Game
      </Button>
      <Button variant="blue" size="lg" fullWidth onClick={handleQuickMatch} className="gap-2 text-lg">
        <Shuffle className="w-5 h-5" />
        Play with Strangers
      </Button>
    </div>
  );
};