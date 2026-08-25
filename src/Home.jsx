import { useState } from 'react'

function Home({ startGame }) {
    const [red, setRed] = useState(Math.floor(Math.random()*255))
    const [green, setGreen] = useState(Math.floor(Math.random()*255))
    const [blue, setBlue] = useState(Math.floor(Math.random()*255))

    return (
        <>
            
            <section id="color_box">

                <section>
                    <h1>ColoraSean</h1>
                    <p>Are you good at replicating colours using RGB? This game will test your skills!</p>
                    <p>
                    You will be given 5 seconds to memorize the background color. Then it will be your job to replicate to the best of your
                    abilities the color using the correct mix of <span style={{color: "rgb(255, 0, 0)"}}>red</span>, <span style={{color: "rgb(0, 255, 0)"}}>green</span>, and <span style={{color: "rgb(0, 0, 255)"}}>blue</span>. Good luck!
                    </p>
                </section>
                

                <div id="select_mode">
                    <button className="start_button" style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}} onClick={startGame}>START GAME</button>
                </div>
            


                <div className="sliders_container">
                    <div className="slider_container">
                        <h3 style={{color: "rgb(255, 0, 0)"}}>R</h3>
                        <input type="range" min="0" max="255" value={red} className="slider" id="redAmount" onChange={(e) => setRed(Number(e.target.value))}/>
                    </div>
                    <div className="slider_container">
                        <h3 style={{color: "rgb(0, 255, 0)"}}>G</h3>
                        <input type="range" min="0" max="255" value={green} className="slider" id="redAmount" onChange={(e) => setGreen(Number(e.target.value))}/>
                    </div>
                    <div className="slider_container">
                        <h3 style={{color: "rgb(0, 0, 255)"}}>B</h3>
                        <input type="range" min="0" max="255" value={blue} className="slider" id="redAmount" onChange={(e) => setBlue(Number(e.target.value))}/>
                    </div>
                </div> 

            </section>
        </>
    )
}

export default Home