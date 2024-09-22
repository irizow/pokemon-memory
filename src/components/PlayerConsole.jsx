import './playerConsole.css'
import girlAvatar from '../assets/images/girl-avatar.jpg';
import boyAvatar from '../assets/images/boy-avatar.jpg';
import nbAvatar from '../assets/images/nb-avatar.jpg';
import token from '../assets/images/star.png'

const prompt = ["Boooh... that's too easy, even for a Magikarp", 
    "*Yawns*, is there a singing Clefairy nearby? Oh, it's just you",
    "Hummm, better but not impressive",
    "Well, seems like you're about to make good money selling those cards",
    "We will have to call professor Oak to see this",
    "Are you sure you're not Alakazam in the body of a Pokemon trainer?",
    "Ahahaha, you were not joking when you said you're gonna catch em all, huh?",
    "Is this real or is Hypno doing one of it's tricks?",
    "Who would have said that a little trainer like you would be about to win the Pokemon league...",
]


export default function PlayerConsole({player, gender, level, moneyMade, score}) {
    const avatar = gender==="Female" ? girlAvatar : gender==="Male" ? boyAvatar : nbAvatar
return (
    <div className="player-data">
        <div className="name-avatar">
            <img src={avatar} />
            <div>
                {player}
                <p>Level {level}</p>
                <p>Level score: <strong style={{color: "rgb(96, 249, 96)"}} >{score}</strong> </p>
            </div>
        </div>
        <div className="other-data">
        
            <p>Money made selling cards: </p> 
            <p> <img src={token} /> {Math.round((moneyMade * 100) / 100)} USD</p> 
             </div>
        <div className="messages">
            <p><strong>New Messages:</strong></p>
            <div className='message'>
                <p>{prompt[level-1]}</p>
            </div>
        </div>

    </div>
)
}