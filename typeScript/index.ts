import { wordList }  from "./word";

const getWord = (wordList: string[]) => {
    // randomaly picks a word for the round
    const word = wordList[Math.floor(Math.random() * wordList.length)];

    return word
}

// const hangmanlogConditions = (word: string, guess: string) => {
//     return word.includes(guess)
// }

const hangmanGame = (word: string): string => {
    let wordPrint: string = "_".repeat(word.length);
    let guessedLetter: Array<string> = [];
    let numberOfGuessesLeft: number = 6;

    console.log(`Lets play Hangman \n ${wordPrint} \n`);

    const prompt = require('prompt-sync')({sigint: true});

    while (numberOfGuessesLeft > 0) {
        const guess: string = prompt('Guess a letter: ').toLowerCase();
        
        //check if guess is a letter
        if (!guess.search(/^[a-zA-Z]$/g)) {

            // check guess is a letter - regex match
            if (!guessedLetter.includes(guess)) {
                // if the letter has not been guessed
                if (!word.includes(guess)) {
                    // if the guess is not correct
    
                    numberOfGuessesLeft-- 
    
                    console.log(`You have guessed incorrectly. \n You have ${numberOfGuessesLeft} guess left. \n`)
                } else {
                    for (let i = 0; i < word.length; i++) {
                        // const wordPrintArr = wordPrint.split('')
                        // wordPrintArr[i] = (word[i] === guess) ? guess : wordPrint[i];
                        // wordPrint = wordPrintArr.join()
                    }
                    guessedLetter.push(guess)
                    console.log(`You have guessed correctly! \n ${wordPrint}`)
                }
            } else {
                console.log(`You have already guessed the letter ${guess}. Try again. \n`)
            }
        } else { 
            console.log(`${guess} is an invalid input. Try again. \n`)
        }


    }

    return 'Calum'
}

const word: string = getWord(wordList);
console.log('the word is', word);

hangmanGame(word)
