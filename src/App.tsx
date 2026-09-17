import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { FinalResults } from './components/results/FinalResults';
import { RoundResults } from './components/results/RoundResults';
import { CreateRoomPage } from './pages/CreateRoomPage';
import { GamePage } from './pages/GamePage';
import { HomePage } from './pages/HomePage';
import { JoinRoomPage } from './pages/JoinRoomPage';
import { LobbyPage } from './pages/LobbyPage';
import { QuickMatchPage } from './pages/QuickMatchPage';
const AnimatedRoutes = () => { const location = useLocation(); return <div key={location.pathname} className="page-enter"><Routes location={location}><Route path="/" element={<HomePage />} /><Route path="/create" element={<CreateRoomPage />} /><Route path="/join" element={<JoinRoomPage />} /><Route path="/quick-match" element={<QuickMatchPage />} /><Route path="/lobby" element={<LobbyPage />} /><Route path="/game" element={<GamePage key={location.key} />} /><Route path="/round-results" element={<RoundResults />} /><Route path="/final-results" element={<FinalResults />} /></Routes></div>; };
function App() { return <BrowserRouter><AnimatedRoutes /></BrowserRouter>; }
export default App;

