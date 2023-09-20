import SnakeGame from '../core/game';
import endImg from './end.png'
import  './NewGame.css'

export const LoseGame = ({game, onChange}: {game: SnakeGame | null, onChange: any}) => {
    const handleClick = () => {
        console.log(game)
        if(game) {
            game.init()
            onChange('start')
        }
    };

    return (
        <div className='root_NewGane'>
            <img src={endImg}/>
            <h1 style={{cursor: 'pointer'}} onClick={handleClick}>One more try for the OLD GUY</h1>
        </div>
    )
}