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
