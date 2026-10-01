import { useState } from 'react'
import "./Home.css";

function Home({ startGame, seeLeaderboard }) {
    const [red, setRed] = useState(Math.floor(Math.random()*122)+123);
    const [green, setGreen] = useState(Math.floor(Math.random()*122)+123);
    const [blue, setBlue] = useState(Math.floor(Math.random()*122)+123);

    return (
        <>
            
            <section id="color_box">

                <section>
                    <h1 style={{color: `rgb(${red}, ${green}, ${blue}`}}>ColoraSean</h1>
                    <p>Are you good at replicating colours using RGB? This game will test your skills!</p>
                    <p>
                    You will be given 5 seconds to memorize the background color. Then it will be your job to recreate it to the best of your
                    abilities, using the correct mix of <span style={{color: `rgb(${red}, 0, 0`}}>red</span>, <span style={{color: `rgb(0, ${green}, 0`}}>green</span>, and <span style={{color: `rgb(0, 0, ${blue}`}}>blue</span>. Good luck!
                    </p>

                    <br/>

                    <p>🏆 Want to view the top 15 scores of this week? Check them out down here!</p>

                    <br/>
                    
                    <button className="select_button" onClick={seeLeaderboard}>WEEKLY LEADERBOARD</button>
                </section>
                

                <div id="select_mode">
                    <button className="select_button" style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}} onClick={startGame}>START GAME</button>
                </div>
            


                <div className="sliders_container">
                    <div className="slider_container">
                        <input type="range" min="0" max="255" value={red} className="slider" id="redAmount" onChange={(e) => setRed(Number(e.target.value))}/>
                    </div>
                    <div className="slider_container">
                        <input type="range" min="0" max="255" value={green} className="slider" id="greenAmount" onChange={(e) => setGreen(Number(e.target.value))}/>
                    </div>
                    <div className="slider_container">
                        <input type="range" min="0" max="255" value={blue} className="slider" id="blueAmount" onChange={(e) => setBlue(Number(e.target.value))}/>
                    </div>
                </div> 


                <footer>
                    <a href="https://github.com/pishonne/ColoraSean">Source Code</a>
                    <span>-</span>
                    <a href="https://pishonne.github.io/">Other projects</a>
                    <span>-</span>
                    <a href="https://buymeacoffee.com/lishonne">Buy me a coffee</a>
                </footer>

            </section>
        </>
    )
}

export default Home;