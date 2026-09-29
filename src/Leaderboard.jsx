import { useState, useEffect } from 'react';
import { supabase } from "./supabaseClient";
import "./Leaderboard.css";

function Leaderboard({ backToMenu }) {

    const [topScores, setTopScores] = useState([]);
    const [leaderboardText, setLeaderboardText] = useState("");

    const fetchLeaderboard = async () => {
        const {data, error} = await supabase
        .from('leaderboard')
        .select('player_name, score')
        .order('score')
        .limit(10);

        if(!error) {
            setTopScores(data);
            setLeaderboardText("There are no scores yet! Play a game and upload the first score of the week!");
        } else {
            setLeaderboardText("Error loading leaderboard. Try refreshing the page.");
        }
    }

    useEffect(() => {
        fetchLeaderboard();
    }, []);


    return (
        <>

            <div id="leaderboard_container">
                <div id="rank_container">
                    <h3 className="leaderboard_attribute">RANK</h3>
                    <ul>
                        {Array.from({ length: topScores.length }, (_, index) => (
                            <li className="leaderboard_rank" key={index}>{index + 1}ᵒ</li>
                        ))}
                    </ul>   
                </div>
                <div id="player_name_container">
                    <h3 className="leaderboard_attribute">PLAYER</h3>
                    
                    <ul>
                        {topScores.map((entry, index) => (
                        <li className="leaderboard_rank" key={index}>
                            <strong>{entry.player_name}</strong>
                        </li>  
                        ))}
                    </ul> 
                </div>
                <div id="score_container">
                    <h3 className="leaderboard_attribute">SCORE</h3>
                    <ul>
                        {topScores.map((entry, index) => (
                        <li className="leaderboard_rank" key={index}>
                            <strong>{entry.score} pts</strong>
                        </li>
                        ))}
                    </ul> 
                </div>
            </div>

            {topScores.length == 0 && <p className="leaderboard_information">{leaderboardText}</p>}

            <button className="select_button" onClick={backToMenu}>BACK TO MENU</button>
        </>
    );
}

export default Leaderboard;