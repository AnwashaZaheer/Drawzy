import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Pencil } from 'lucide-react';

export const CreateRoomPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen dotted-paper flex flex-col items-center justify-center p-4">
      <div className="paper-card p-10 max-w-md w-full text-center rotate-[-1deg]">
        <div className="w-20 h-20 bg-crayon-pink border-2 border-ink rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0_0_var(--color-ink)] rotate-6 animate-bounce-soft">
          <Pencil className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2 rotate-[-1deg]">Create Game</h1>
        <p className="text-ink/60 font-semibold mb-3">room-making is almost here 😅</p>
        <p className="text-ink/40 font-medium text-sm mb-8">we're sharpening the pencils, check back soon!</p>
        <Button onClick={() => navigate('/')} fullWidth>
          Back to Home
        </Button>
      </div>
    </div>
  );
};