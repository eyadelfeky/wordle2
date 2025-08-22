'use client'

import { useEffect, useState } from "react";
const no_allowed_guesses = 7;
export default function Home() {
  const [dictionary, setDictionary] = useState([]);
  const [solution,setSolution] = useState('HELLO');
  useEffect(() => {
     const GetWord = async()=>{
    const response = await fetch('https://raw.githubusercontent.com/darkermango/5-Letter-words/refs/heads/main/words.json');
    const data =await response.json();
    const words = data.words;
    const randomWord = words[Math.floor(Math.random()*words.length)].toUpperCase();
    setSolution(randomWord);
    setDictionary(words);
  }
    GetWord();
  },[])
  const [guesses , updateGuesses ] = useState(Array(no_allowed_guesses).fill(null));
  const [currentLine,setCurrentLine] = useState(0);
  const [currentGuess , setCurrentGuess ] = useState('');
  const [states , setStates ] = useState([])

   const handleKey = (e) =>{
    const alphabet = /[a-z]/g
    const key = ''+e.key;
      if(alphabet.test(key) && key.length == 1){
        setCurrentGuess(previous => 
          previous.length< 5 ?previous + key.toUpperCase():previous);
      }else if(key === 'Backspace'){
        setCurrentGuess(previous => previous.slice(0,-1))
      }else if(key === 'Enter' && currentGuess.length > 4){
        if(dictionary.includes(currentGuess.toLowerCase())){
          setCurrentLine(prev => prev + 1);
          setCurrentGuess('');
          submit();
        }else{
          alert('NOT FOUND');
        }  
      }
    }
    const submit = () =>{
      let newStatus = [];
let leftGuess = '';
let leftSol = '';
for(let i=0;i<5;i++){
    if(solution[i] == currentGuess[i]){
        newStatus.push('green');
        leftGuess += '#';
        leftSol += '#';
    }else{
        newStatus.push('gray');
        leftGuess += currentGuess[i];
        leftSol += solution[i];
    }
}
for(let i=0;i<5;i++){
    for(let j=0;j<5;j++){
       if(leftGuess[j] == leftSol[i] && leftGuess[j] !== '#'){
                leftGuess = leftGuess.replace(leftGuess[j],'#')
                leftSol = leftSol.replace(leftSol[i],'#');
                newStatus[j] = 'yellow';
                console.log(leftGuess,leftSol);
            }
    }
}
        setStates(prev => [...prev,newStatus]);
    }
  useEffect(() =>{
    const newGuesses = guesses.map((guess,i) => {
      if(i === currentLine){
        return currentGuess
      }else{
        return guess;
      }
    })
    updateGuesses(newGuesses);
  },[currentGuess,currentLine])
  useEffect(() => {
    
    document.addEventListener('keydown',handleKey);
    return() =>{
      document.removeEventListener('keydown',handleKey);
    }
  },[currentGuess])
  const Row = ({guess,order}) => {
    const tiles = [];
    for(let i=0;i<5;i++){
      const status = states[order]?.[i] || '';
    tiles.push(
      <div key={i} className={`tile ${status}`}>
        {guess[i] || ''}
      </div>
    )
    }
  return (
    <div className="flex justify-center gap-2 m-2">
      {tiles}
    </div>
  )
}

  return (
    <>
      <div className="w-50 h-50 bg-white border-teal-400 border-8 fixed text-3xl flex  font-medium items-center justify-center  text-center rounded-full top-40 left-30">
        Remaining trials {no_allowed_guesses-currentLine}</div>
      <div className="w-[30%] max-w-120 mx-auto">
      <p className="text-white text-6xl m-5 text-center">Wordle</p>
      <div className="container">
          {guesses.map((guess,i) => {
            return <Row key={i} order={i} guess={guess??''} />
          })}
          {(solution == currentGuess)&&<div className="message">YOU WON</div>}
          {(solution !== currentGuess && currentLine ==no_allowed_guesses)&&
         <><div className="message">YOU LOST</div>
          <Row guess={solution}></Row>
          </>}
      </div>
      </div>
    </>
    
  );
  
}
