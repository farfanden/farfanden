import { useRef, useEffect, useState} from 'react';
import './App.css';
import SnakeGame from './core/game'
import { NewGame } from './components/NewGame';
import { LoseGame } from './components/LoseGame';
import { WinGame } from './components/WinGame';


function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [game, setGame] = useState<SnakeGame | null>(null);
  const [isPlay, setIsPlay] = useState<'start' | 'lose' | 'end' | 'win'>('end')

  const handleCallback = (status: 'start' | 'lose' | 'end' | 'win') => {
    console.log(status);
    setIsPlay(status);
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        setGame(new SnakeGame(canvas, handleCallback))
      } else {
        console.error('getContext() returned null. Canvas context is not available.');
      }
    }

    return () => {
      if (game) {
        game.stopGame('lose');
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="gameCanvas"
        width="540"
        height="540"
      ></canvas>
      {isPlay === 'end' && <NewGame game={game} onChange={setIsPlay}/>}
      {isPlay === 'lose' && <LoseGame game={game} onChange={setIsPlay}/>}
      {isPlay === 'win' && <WinGame game={game} onChange={setIsPlay}/>}
    </>
  );
}

export default App;
