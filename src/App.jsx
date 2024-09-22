import { useState } from 'react'
import MemoryGame from './components/memoryGame'
import Intro from './components/Intro'
import PlayerConsole from './components/PlayerConsole'
import "./App.css"

function App() {
  const [gender, setGender] = useState('')
  const [player, setPlayer] = useState('')
  const [isInitiated, setIsInitiated] = useState(false);
  const [level, setLevel] = useState(1); 
  const [moneyMade, setMoneyMade] = useState(0)
  const [score, setScore] = useState(0)

  return (
    <>
    {!isInitiated && <Intro isInitiated={isInitiated} setIsInitiated={setIsInitiated} gender={gender} setGender={setGender} player={player} setPlayer={setPlayer} /> }
    {isInitiated && 
    <div className="main-container">
    <MemoryGame level={level} setLevel={setLevel} moneyMade={moneyMade} setMoneyMade={setMoneyMade} score={score} setScore={setScore} />
    <PlayerConsole level={level} moneyMade={moneyMade} score={score} gender={gender} player={player} /> 
    </div>}
    
    </>
  )
}

export default App
