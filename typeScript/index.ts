import { wordList }  from "./word";
import { displayHangman }  from "./displayHangman";

const getWord = (wordList: string[]):string => {
    return wordList[Math.floor(Math.random() * wordList.length)]
}

const checkGuessType = (guess: string): boolean => {
    if (guess.search(/^[a-zA-Z]$/g) === -1) {
        console.log(`${guess} is an invalid input. Try again. \n`)
    }

    return (guess.search(/^[a-zA-Z]$/g) === -1) ? false : true ; 
}

const checkGuessedList = (guess: string, guessedLetter: Array<string> ): boolean => {
    if (guessedLetter.includes(guess)) {
        console.log(`You have already guessed the letter ${guess}. Try again. \n`)
    }

    return guessedLetter.includes(guess) ; 
}

const updateWordPrintString = (wordPrint: string, guess: string, word: string): string => {
    const wordPrintArr = wordPrint.split('')
    for (let i = 0; i < word.length; i++) {
        wordPrintArr[i] = (word[i] === guess) ? guess : wordPrintArr[i];
    }

    return wordPrintArr.join('');
}

const isGuessRight = (word: string, guess: string): boolean => {
    if (!word.includes(guess)) {
        console.log(`You have guessed incorrectly.`)
    }

    return word.includes(guess)
}

const printOnConsole = (newGame: boolean = true, wordPrint: string, numberOfGuessesLeft: number, guessedLetter: Array<string>, displayHangman: Array<string>) => {
    if (newGame) {
        console.log(`Lets play Hangman \n \n Word: ${wordPrint} \n`);
        console.log(`${displayHangman[0]}\n`)
        return
    }

    console.log(` You have ${numberOfGuessesLeft} guesses left. \n Word: ${wordPrint}. \n Recent Guesses: ${guessedLetter.join()}`)
    console.log(`${displayHangman[6 - numberOfGuessesLeft]}\n`)
}

const hangmanGame = (word: string) => {
    let wordPrint: string = "_".repeat(word.length);
    let guessedLetter: Array<string> = [];
    let numberOfGuessesLeft: number = 6;

    printOnConsole(true, wordPrint, numberOfGuessesLeft, guessedLetter, displayHangman)

    const prompt = require('prompt-sync')({sigint: true});

    while (numberOfGuessesLeft > 0) {
        const guess: string = prompt(' Guess a letter: ').toLowerCase();
        
        if (!checkGuessType(guess)) continue
    
        if (checkGuessedList(guess, guessedLetter)) continue

        guessedLetter.push(guess)

        if (!isGuessRight(word, guess)) {
            numberOfGuessesLeft--
            printOnConsole(false, wordPrint, numberOfGuessesLeft, guessedLetter, displayHangman)
            continue
        }

        wordPrint = updateWordPrintString(wordPrint, guess, word)
        console.log(` You have guessed correctly!`)
        printOnConsole(false, wordPrint, numberOfGuessesLeft, guessedLetter, displayHangman)

        if (wordPrint === word) {
            console.log(` You have won!! The word was ${word}`)
            break
        }
    }

    (numberOfGuessesLeft === 0) ? console.log(" You have lost. Play again?") : console.log("");
}

const word: string = getWord(wordList);
hangmanGame(word)
