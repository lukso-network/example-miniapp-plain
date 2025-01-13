import { useCallback, useEffect, useState } from 'react'
import words from '../utils/ListOfWords'
import WinLoseMessage from '../components/WinLoseMessage'
import Hangman from '../components/Hangman'
import Word from '../components/Word'
import Keyboard from '../components/Keyboard'
import { useGrid } from '../context/GridProvider'

function HangManGame() {

    const {provider, client, accounts, contextAccounts, walletConnected } = useGrid();
    function display(
    ){
    console.log(        
        provider,
        client,
        accounts,
        contextAccounts,
        walletConnected,
    )}
    let newWord: string = words[Math.floor(Math.random() * words.length)]

    const [ word, setWord ] = useState<string>(newWord)

    const [ usedLetters, setUsedLetters ] = useState<string[]>([])

    let wrongGuesses:string[] = usedLetters.filter(letter => !word.includes(letter))

    const loser:boolean = wrongGuesses.length >= 6 
    const winner:boolean = word.split('').every(letter => usedLetters.includes(letter))

    const addUsedLetter = useCallback((letter: string) => {
        if (usedLetters.includes(letter) || loser || winner) return

        setUsedLetters(usedLetters => [ ...usedLetters, letter ])
 }, [ usedLetters ])

    //event listeners for key presses
    useEffect(() => {
     const handleKeyPress = (ev: KeyboardEvent) => {
         const selectedKey = ev.key

         if(!selectedKey.match(/^[a-z,A-Z]$/)) return

         ev.preventDefault()
         addUsedLetter(selectedKey.toLowerCase())
     }
    document.addEventListener("keypress", handleKeyPress)
    return () => { document.removeEventListener('keypress', handleKeyPress) }
 }, [])

 function newGame(){
     setWord(newWord)
     setUsedLetters([])
 }

 return (
     <div
         className='bg-white text-2xl flex flex-col items-center justify-center min-h-screen h-full w-screen'
     >         
            {/* win/lose message display */}
            {winner && (
                <WinLoseMessage accounts={accounts} winMessage={true} newGame={newGame} />
            )}
            {loser && (
                <WinLoseMessage accounts={accounts} winMessage={false} newGame={newGame} />
            )}

            {/* component with hangman drawing */}  
            <Hangman numGuesses={wrongGuesses.length} />

            {/* word to be guessed */}   
            <Word 
                word={word} 
                usedLetters={usedLetters} 
                showWord={loser}
            />
            
            {/* keyboard with keys that can be selected through clicking or pressing respective key on keyboard */}
            <Keyboard 
                usedLetters={usedLetters} 
                addUsedLetter={addUsedLetter} 
                disabled={winner || loser}
            />
            <button onClick={display}> display</button>
     </div>
 )
}

export default HangManGame
