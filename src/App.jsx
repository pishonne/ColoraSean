import { useState } from 'react'

import Home from './Home'
import EasyMode from './EasyMode'
import HardMode from './HardMode'


function App() {
  const [view, setView] = useState("home")

  return (
    <>
        {view === "home" && <Home startEasyMode={() => setView("easymode")} startHardMode={() => alert("Coming soon")}/>}
        {view === "easymode" && <EasyMode />}
        {view === "hardmode" && <HardMode />}
    </>
  )
}

export default App
