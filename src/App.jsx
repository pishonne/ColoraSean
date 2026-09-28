import { useState } from 'react'

import Home from './Home'
import Game from './Game'
import Leaderboard from './Leaderboard';


function App() {
  const [view, setView] = useState("home");

  return (
    <>
        {view === "home" && <Home startGame={() => setView("game")} seeLeaderboard={() => setView("leaderboard")}/>}
        {view === "game" && <Game setView={setView}/>}
        {view === "leaderboard" && <Leaderboard backToMenu={() => setView("home")}/>}
    </>
  )
}

export default App
