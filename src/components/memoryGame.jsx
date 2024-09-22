import { useState, useEffect } from "react";
import {v4 as uuid } from 'uuid'
import './memoryGame.css'
import loadingImg from "../assets/images/loadingsvg.svg"
import pokemonLevelUp from "../assets/audio/Pokemon-level-up.mp3"
import pokemonRelive from "../assets/audio/pokemon-relive.mp3"
import pokemonFinal from "../assets/audio/pokemon-final-victory.mp3"
import battleBackground from "../assets/images/battle-modal.jpg"


export default function MemoryGame({level, setLevel, moneyMade, setMoneyMade, score, setScore}) {
    const levelAudio = new Audio(pokemonLevelUp)
    const reliveAudio = new Audio(pokemonRelive)
    const finalAudio = new Audio(pokemonFinal)
   
    const [numOfCards, setNumOfCards] = useState(4);
    const [totalCards, setTotalCards] = useState(0);
    const [allPokemons, setAllPokemons] = useState([])
    const [pokemons, setPokemons] = useState([])
    const [showLossModal, setShowLossModal] = useState(false)
    useEffect(()=> {
        fetch('https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[1 TO 200]', {
            headers: {
                'X-Api-Key':'3b25b550-9795-4461-86bc-1f466d6cc8f5'

            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
        console.log(data)
        setAllPokemons(data.data)})
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, [])


     
    function genRandomPokemons(num = 10) {
        console.log("level + " + level)
        let randomPokemons = [];
        let i= 0;
        while(randomPokemons.length < num) {
            console.log("loop rinning")
            let random = Math.floor(Math.random() * allPokemons.length -1);
            let randomPokemon = {
                name: allPokemons[random].name,
                img: allPokemons[random].images.small,
                text: allPokemons[random].flavorText,
                rarity: allPokemons[random].rarity,
                prices: allPokemons[random].cardmarket.prices.avg1,
                id: uuid(),
                chosen: false
            } 

            const isRepeated = randomPokemons.some(pokemon => pokemon.name === randomPokemon.name);
            if (!isRepeated) {
                randomPokemons.push(randomPokemon);
            }
               
                }
        setPokemons(randomPokemons)
        return randomPokemons
    } 

        useEffect(() => {
            if(allPokemons.length > 0) {
            genRandomPokemons(numOfCards)}
        }, [allPokemons]);

   
        function mixPokemons(pokemons) {
            const mixedPokemons = pokemons
            for (let i= mixedPokemons.length -1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [mixedPokemons[i], mixedPokemons[j]] = [mixedPokemons[j], mixedPokemons[i]]
            }
            return mixedPokemons
        }

        const handleClick = (pokemon) => {
            if (pokemon.chosen) { 
                setShowLossModal(true)} 
            else {setScore(score + 1)
                setTotalCards(totalCards+1)
            const newPokemon = {...pokemon, chosen: true }
            setMoneyMade(moneyMade + pokemon.prices)
         
            setPokemons(prevPokemons => {
                        const updPokemons = prevPokemons.filter (p => p.id !== pokemon.id)
                        const mixedPokemons = mixPokemons(updPokemons);
                        console.log(mixedPokemons)
                        return [...mixedPokemons, newPokemon]})
        }}      

        const resetGame = (newNumOfCards) => {
            setScore(0);
            setNumOfCards(newNumOfCards);
            const randomPokemons = genRandomPokemons(newNumOfCards);
            setPokemons(randomPokemons);
        
        }


        const handleLoss = () => {
            setShowLossModal(false)
            setTotalCards(0)
            reliveAudio.play();
            setLevel(0)
            setMoneyMade(0)
            resetGame(4);
        }

        const handleWin = () => {
            levelAudio.play()
            setLevel(level+1)
            let newNum = numOfCards + 4
            resetGame(newNum);
        }

        const handleFinalWin = () => {
            finalAudio.play()
        }


        if(level===10) {
            handleFinalWin()
        }

        if(score === numOfCards) {
            handleWin()
        }

        
        
        const maxWidth = numOfCards>8 ? 80/numOfCards*2 + "%" : numOfCards>15 ? 90/numOfCards*3 + "%" : "auto";
   
    return (
        <div className="game-content" >
            {!pokemons.length && <img src={loadingImg}/>}
            {pokemons.length && (
            <div className="pokemon-container" /*style={{gridTemplateColumns: "auto(" + Math.floor(numOfCards/2)  + ", 1fr)"}}*/ >
            {pokemons.map((pokemon) =>
            <img className="pokemon-card" key={uuid()} src={pokemon.img} style={{maxWidth:`${maxWidth}` }} onClick={() => handleClick(pokemon)} />
            )}
            </div>)}
            {showLossModal && (
                <div className="loss-modal">
                    <div>
                    <h1>You've Lost...</h1>
                    <p>Level: {level}</p>
                    <p>Total cards collected: {totalCards}</p>
                    <p>Money made: {Math.round(moneyMade)}</p>
                    <button onClick={handleLoss}>Try Again</button>
                    </div>
                </div>
            )}
            
            
        </div>
    )
}