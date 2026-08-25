import { useState } from 'react'

import Home from './Home'
import Game from './Game'


function App() {
  const [view, setView] = useState("home")

  return (
    <>
        {view === "home" && <Home startGame={() => setView("game")}/>}
        {view === "game" && <Game setView={setView}/>}
    </>
  )
}

export default App
