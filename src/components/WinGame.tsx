import SnakeGame from '../core/game';
import startImg from './win.png'
import  './NewGame.css'
import { WORDS } from '../core/config';

export const WinGame = ({game, onChange}: {game: SnakeGame | null, onChange: any}) => {
    const handleClick = () => {
        if(game) {
            game.init()
            onChange('start')
        }
    };

    return (
        <div className='root_NewGane'>
            <img src={startImg}/>
            <h2 className='waviy'>{WORDS.split(' ').map(item => <span style={{color: 'black', paddingRight: 5}}>{item}</span>)}</h2>
            <h1 style={{cursor: 'pointer'}} onClick={handleClick}>Click me again</h1>
        </div>
    )
}