import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <div>home</div>
            <div>
                <button><Link to="/play">Play Game</Link></button>    
                <button><Link to="/howToPlay">How to Play</Link></button>    
                <button><Link to="/settings">Settings</Link></button>    
            </div>
        </div>
    );
}