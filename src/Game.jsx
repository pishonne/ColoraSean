import { useState, useEffect } from 'react';
import "./Game.css";
import { supabase } from './supabaseClient';

function Game({ setView }) {

    // Color variables
    const [redGuess, setRedGuess] = useState(Math.floor(Math.random()*255));
    const [greenGuess, setGreenGuess] = useState(Math.floor(Math.random()*255));
    const [blueGuess, setBlueGuess] = useState(Math.floor(Math.random()*255));

    const [redQuestion, setRedQuestion] = useState(Math.floor(Math.random()*255));
    const [greenQuestion, setGreenQuestion] = useState(Math.floor(Math.random()*255));
    const [blueQuestion, setBlueQuestion] = useState(Math.floor(Math.random()*255));
    
    const [redGuessResult, setRedGuessResult] = useState(0);
    const [greenGuessResult, setGreenGuessResult] = useState(0);
    const [blueGuessResult, setBlueGuessResult] = useState(0);

    const [redQuestionResult, setRedQuestionResult] = useState(0);
    const [greenQuestionResult, setGreenQuestionResult] = useState(0);
    const [blueQuestionResult, setBlueQuestionResult] = useState(0);

    const [textColor, setTextColor] = useState("white");

    // Game variables
    const [phase, setPhase] = useState("intro");
    const [timeLeft, setTimeLeft] = useState(5);
    const [round, setRound] = useState(1);

    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(0);

    const [buttonText, setButtonText] = useState("Next Round");

    // database variables
    const leaderboardLen = 15;
    const [topScores, setTopScores] = useState([]);
    const [playerName, setPlayerName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [submittedText, setSubmittedText] = useState("");

    
    //------------------------------------------------------------------------------------------------------------------------------
    // Supabase methods

    // When the component is rendered, the leaderboard data is fetched, so we can compare with the player's score after the game
    const fetchLeaderboard = async () => {
        const {data, error} = await supabase
        .from("leaderboard")
        .select("id, player_name, score")
        .order("score")
        .limit(15);

        if(!error) {
            setTopScores(data);
        }
    };   

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    // function to check if current score qualifies for Top 10
    const isTop10 = topScores.length < leaderboardLen || currentScore > (topScores[topScores.length - 1]?.score || 0);

    // method to submit a score to the leaderboard if it qualifies for the top 15 
    const handleSubmitScore = async (e) => {
        e.preventDefault();
        if (!playerName.trim()) return;

        const {error} = await supabase
        .from("leaderboard")
        .insert([{player_name: playerName, score: total}]);

        if(!error) {
            setSubmitted(true);
            setSubmittedText("Your score is now on the leaderboard!");
        } else {
            setSubmittedText("Error submitting the score");
        }
    };

    //------------------------------------------------------------------------------------------------------------------------------
    // Game methods

    // when in the "intro" phase, start a three second timer, so the player can view the message
    useEffect(() => {
        if (phase !== "intro") return;
        const id = setTimeout(() => setPhase("memorize"), 3000);
        return () => clearTimeout(id);
    }, [phase]);

    // when in the "memorize" phase, a 5 seconds timer is started, during which the player needs to memorize the displayed color
    useEffect(() => {
        if (phase != "memorize") return;     
        if (timeLeft === 0) {
            setPhase("guess");
            return;
        }
        const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(id);
    }, [phase, timeLeft]);

    // when the guess is submitted, the score is calculated and the phase is changed to "result"
    const getResult = () => {
        const newScore = Math.abs(redGuess - redQuestion) + Math.abs(greenGuess - greenQuestion) + Math.abs(blueGuess - blueQuestion);
        setScore(newScore);
        setTotal(tot => tot + newScore);
        setPhase("result");
    };

    // when in the "result" phase, both the initial color and the guessed one are displayed, showing the user the score
    useEffect(() => {
        if (phase !== "result") return;
        const id1 = setTimeout(() => {
            setRedGuessResult(redGuess);
            setGreenGuessResult(greenGuess);
            setBlueGuessResult(blueGuess);
        }, 500);
        const id2 = setTimeout(() => {
            setRedQuestionResult(redQuestion);
            setGreenQuestionResult(greenQuestion);
            setBlueQuestionResult(blueQuestion);
        }, 1500);
        return () => { clearTimeout(id1); clearTimeout(id2) };
    }, [phase]);

    // when the color values change, the text color is changed to be visible with the background
    useEffect(() => {
        if (phase === "intro" || phase === "memorize") {
            if(redQuestion + greenQuestion + blueQuestion < 400) 
                setTextColor("white");
            else
                setTextColor("black");
        }

        if (phase === "guess") {
            if(redGuess + greenGuess + blueGuess < 400) 
                setTextColor("white");
            else
                setTextColor("black");
        }
    }, [redGuess, greenGuess, blueGuess, redQuestion, greenQuestion, blueQuestion]);

    // when a new round starts, all the necessary values are reset. If round = 6, then we can display the final results
    useEffect(() => {
        if(round > 5) {
            setPhase("final_result");
        } else {         
            if(round == 5) setButtonText("Final Result");
            setRedGuess(Math.floor(Math.random()*255));
            setGreenGuess(Math.floor(Math.random()*255));
            setBlueGuess(Math.floor(Math.random()*255));
            setRedQuestion(Math.floor(Math.random()*255));
            setGreenQuestion(Math.floor(Math.random()*255));
            setBlueQuestion(Math.floor(Math.random()*255));
            setRedGuessResult(0);
            setGreenGuessResult(0);
            setBlueGuessResult(0);
            setRedQuestionResult(0);
            setGreenQuestionResult(0);
            setBlueQuestionResult(0);
            setTimeLeft(5);
            setPhase("intro");
        }
    }, [round]);

    // method that calculated the final rank based on the total score
    const getTotal = () => {
        if(total < 200) return "SSS 🏆";
        else if(total < 300) return "SS 👑";
        else if(total < 400) return "S 🚀";
        else if(total < 500) return "A 🥳";
        else if(total < 600) return "B 😁";
        else if(total < 700) return "C 🙂";
        else if(total < 800) return "D 😐";
        else if(total < 900) return "E 🫪";
        return "F ☹️";
    };


    if (phase === "intro") {
        return (
            <section id="color_box" style={{ backgroundColor: `rgb(${redQuestion}, ${greenQuestion}, ${blueQuestion})` }}>
                <h1 style={{color: textColor}}>Round {round}</h1>
                <h1 style={{color: textColor}}>Memorize the following color</h1>
            </section>
        )
    }

    if (phase === "memorize") {
        return (
            <section id="color_box" style={{ backgroundColor: `rgb(${redQuestion}, ${greenQuestion}, ${blueQuestion})` }}>
                <h1 style={{color: textColor}}>{timeLeft}</h1>
            </section>
        )
    }

    if (phase === "result") {
        return (
            <>
                <div className="result_screen">
                    <section className="result_box" style={{ backgroundColor: `rgb(${redGuessResult}, ${greenGuessResult}, ${blueGuessResult})` }}>
                        <h2 style={{color: textColor}}>Your guess</h2>
                    </section>
                    
                    <section className="result_box" style={{ backgroundColor: `rgb(${redQuestionResult}, ${greenQuestionResult}, ${blueQuestionResult})` }}>
                        <h2 style={{color: textColor}}>Your score: {score}</h2>
                        <button className="submit_button" onClick={() => setRound(round + 1)}>{buttonText}</button>
                    </section>
                </div>    
            </>
            )
    }

    if (phase === "final_result") {
        return (
            <>
                <section id="color_box">
                    <h1>✏️ Final score: {total}</h1>
                    <h1>Rank: {getTotal()}</h1>

                    <br/>

                    {isTop10 && !submitted && (
                        <form onSubmit={handleSubmitScore}>
                        <p> Top {leaderboardLen} Score! 🎉 Enter your name:</p>
                        <input
                            className="player_submit_input_field"
                            type="text"
                            maxLength={15}
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Your Name"
                            required
                        />
                        <button style={{marginLeft: 5}} className="submit_button" type="submit">Submit Score</button>
                        </form>
                    )}

                    <br/>

                    {submittedText !== "" && (
                        <p>{submittedText}</p>
                    )}

                    {submitted && (
                        <button className="select_button" onClick={() => setView("leaderboard")}>VIEW LEADERBOARD</button>
                    )}

                    <button className='select_button' onClick={() => setView("home")}>BACK TO MENU</button>
                </section>
            </>
        )
    }


    return (
        <>
            <section id="color_box" style={{backgroundColor: `rgb(${redGuess}, ${greenGuess}, ${blueGuess})`}}>
                <div className="sliders_container">
                    <div className="slider_container">
                        <input type="range" min="0" max="255" value={redGuess} className="slider" id="redAmount" onChange={(e) => setRedGuess(Number(e.target.value))}/>
                    </div>
                    <div className="slider_container">
                        <input type="range" min="0" max="255" value={greenGuess} className="slider" id="greenAmount" onChange={(e) => setGreenGuess(Number(e.target.value))}/>
                    </div>
                    <div className="slider_container">
                        <input type="range" min="0" max="255" value={blueGuess} className="slider" id="blueAmount" onChange={(e) => setBlueGuess(Number(e.target.value))}/>
                    </div>
                </div> 

                <button className="submit_button" onClick={() => getResult()}>GUESS</button>
            </section>
        </>
    )
}

export default Game;