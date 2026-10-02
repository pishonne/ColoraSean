import { useState, useEffect } from 'react';
import { supabase } from "./supabaseClient";
import "./Leaderboard.css";

function Leaderboard({ backToMenu }) {

    const [topScores, setTopScores] = useState([]); // array containing the fetched data
    const [leaderboardText, setLeaderboardText] = useState("Loading leaderboard...");

    // function to fetch leaderboard data from supabase
    const fetchLeaderboard = async () => {
        const {data, error} = await supabase
        .from('leaderboard')
        .select('player_name, score')
        .order('score')
        .limit(15);

        // if there weren't any issues with the fetching, then the data is put in the topScores array and leaderboardText is changed
        if(!error) {
            setTopScores(data);
            setLeaderboardText(data.length == 0 ? "There are no scores yet! Play a game and upload the first score of the week!" : "");
        
        // otherwise, an error message is displayed
        } else {
            setLeaderboardText("Error loading leaderboard. Try refreshing the page.");
        }
    };

    // when the component renders, the leaderboard data is fetched
    useEffect(() => {
        fetchLeaderboard();
    }, []);


    return (
        <>
            <section id="color_box">
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

                <p className="leaderboard_information">{leaderboardText}</p>

                <button className="select_button" onClick={backToMenu}>BACK TO MENU</button>
            </section>
        </>
    );
}

export default Leaderboard;