import { useState, useEffect, useMemo } from "react";
import './Intro.css'
import girlBackground from "../assets/images/girl-background.jpg"
import genBackground from "../assets/images/general-background.jpg"
import boyBackground from "../assets/images/black-boy-background.jpg"
import nbBackground from "../assets/images/nb-background.jpg"
import oakAvatar from "../assets/images/prof-oak.png"
import useSound from "use-sound"
import openingtheme from "../assets/audio/opening-theme-pokemon.mp3"
import battletheme from "../assets/audio/pokemon-battle.mp3"

export default function Intro({isInitiated, setIsInitiated, player, setPlayer, gender, setGender}) {
    let openingTheme = useMemo(() => new Audio(openingtheme), [openingtheme])
    let imgUrl = '../assets/images/';
    let battleTheme = new Audio(battletheme)


    const styles = {
        unselected : {backgroundImage: `url(${genBackground})`,
                    backgroundSize: "100vw"             
            },
        selected : {backgroundImage: 'url('+ (gender === "Female" ? girlBackground : gender === "Male" ? boyBackground : nbBackground) + ')',
        backgroundSize: "100vw",
        }
       
    };


    const handleClick = (gender) => {
        openingTheme.play()
        setGender(gender)
    }

    const handlePlay = () => {
        openingTheme.pause()
        battleTheme.play()
        battleTheme.loop = true;
        setIsInitiated(true)
    }

    const Typewriter = ({ text, delay }) => {
        const [currentText, setCurrentText] = useState('');
        const [currentIndex, setCurrentIndex] = useState(0);
      
        useEffect(() => {
            if (currentIndex < text.length) {
              const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
              }, delay);
          
              return () => clearTimeout(timeout);
            }
          }, [currentIndex, delay, text]);
      
        return <span>{currentText}</span>;
      };

    function GenderSelection() {
        const text = "Welcome to the world of POKEMON! My name is OAK! ...I study POKEMON as a profession. First, what is your gender?"
        return (
            <div className="select-container">
                <img src={oakAvatar}/>
            <p><Typewriter text={text} delay={50} /></p>
            <div className="button-gender-container">
                <button onClick={()=>handleClick("Female")} >Female</button>
                <button onClick={()=>handleClick("Male")}>Male</button>
                <button onClick={()=>handleClick("Non-binary")}>Non-binary</button>
            </div>
        </div>
        )
    }


    function NameSelection() {
        const text = "Your very own POKEMON legend is about to unfold! ... What was your name?"
        const [name, setName] = useState('')
        return (
        <div className="select-container">
            <img src={oakAvatar}/>
            <p><Typewriter text={text} delay={100} /></p>
            {console.log(gender)}
            <input type="text" id="name" value={name} placeholder={gender==="Male" ? "Red" : "Misty"} onChange={(e) => setName(e.target.value)} />
            <button onClick={()=> setPlayer(name)} >Enter</button>
        </div>
        )

    }

    function Greeting() {
        const text = "Oh, yes, " + player + " how could I forget?..."
        const text2 = "Are you ready to catch some Pokémon cards? Remember, nobody wants duplicates...";
        return (
            <div className="select-container">
                <img src={oakAvatar}/>
                <p>{text}</p>
                <p><Typewriter text={text2} delay={100} /> </p>
                <button onClick={handlePlay}>Play</button>
            </div>
        )
    }

    return(
        <section className="selections-wrapper" style={player==='' ? styles.unselected : styles.selected}>

        {!isInitiated &&
        gender==='' ?  <GenderSelection /> : player==='' ? <NameSelection/> : <Greeting />
        }
       
        

        </section>
    )
}