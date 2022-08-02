import React, { useEffect, useState } from 'react'
import './App.css'
import {gameSubject, initGame} from './Game'
import Board from './Board'



function App() {

  const [board, setBoard] = useState([])
  const [gameOver, setGameOver] = useState()
  const [result, setResult] = useState()
  useEffect(()=>{
    initGame()
    const subscribe= gameSubject.subscribe( (game) => {
      setBoard(game.board)
      setGameOver(game.gameOver)
      setResult(game.result)
    })
      return () => subscribe.unsubscribe()
  },[])

  return (
  <div className='container'>
    {gameOver && (
      <><h2 className='gameOver'>GAME OVER</h2>
        <button className='button-GameOver'>
          <span  className='gameOver'>NEW GAME</span>
        </button>
      </>
    )}
    <div className='board-container'>
      <Board board={board}/>
    </div>
    { result && <p className='gameOver'>{result}</p>}
  </div>
  )
}

export default App
