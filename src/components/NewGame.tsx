import { useState } from 'react';
import SnakeGame from '../core/game';
import startImg from './start.png'
import  './NewGame.css'

export const NewGame = ({game, onChange}: {game: SnakeGame | null, onChange: any}) => {
    const handleClick = () => {
        console.log(game)
        if(game) {
            game.init()
            onChange('start')
        }
    };

    if(game?.id) return null;

    return (
        <div className='root_NewGane'>
            <p>Control is possible only using arrow keys.</p>
            <p>Works only on a computer.</p>
            <p>To play, click on the text below the farfanden.</p>
            <img src={startImg}/>
            <h1 style={{cursor: 'pointer'}} onClick={handleClick}>NEW GAME</h1>
        </div>
    )
}