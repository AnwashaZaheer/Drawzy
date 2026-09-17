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
      <Button variant="blue" size="lg" fullWidth onClick={handleJoin} className="gap-2 text-lg">
        <Users className="w-5 h-5" />
        Join Game
      </Button>
    </div>
  );
};