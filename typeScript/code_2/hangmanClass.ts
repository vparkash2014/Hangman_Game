export class Hangman {
    word: string;
    wordPrint: string;
    guessedLetter: Array<string>;
    numberOfGuessesLeft: number;
    guess: string
    displayHangman: Array<string>;
  
    constructor(wordList: Array<string>, displayHangman: Array<string>) {
        this.word = this.getWord(wordList);
        this.wordPrint = "_".repeat(this.word.length);
        this.guessedLetter = [];
        this.numberOfGuessesLeft = displayHangman.length - 1;
        this.displayHangman = displayHangman;
    };

    getWord(wordList: string[]): string {
        return wordList[Math.floor(Math.random() * wordList.length)]
    }

    checkGuessType(): boolean{
        if (this.guess.search(/^[a-zA-Z]$/g) === -1) {
            console.log(`${this.guess} is an invalid input. Try again. \n`)
        }
    
        return (this.guess.search(/^[a-zA-Z]$/g) === -1) ? false : true ; 
    }

    checkGuessedList(): boolean {
        if (this.guessedLetter.includes(this.guess)) {
            console.log(`You have already guessed the letter ${this.guess}. Try again. \n`)
        }
    
        return this.guessedLetter.includes(this.guess) ; 
    }

    printOnConsole(newGame: boolean = true) {
        if (newGame) {
            console.log(`Lets play Hangman \n \n Word: ${this.wordPrint} \n`);
            console.log(`The total number of guesses you have is ${this.numberOfGuessesLeft} \n`)
            console.log(`${this.displayHangman[0]}\n`)

            return
        }
    
        console.log(` You have ${this.numberOfGuessesLeft} guesses left. \n Word: ${this.wordPrint}. \n Recent Guesses: ${this.guessedLetter.join()}`)
        console.log(`${this.displayHangman[this.displayHangman.length - this.numberOfGuessesLeft - 1]}\n`)
    }

    isGuessRight(): boolean {
        if (!this.word.includes(this.guess)) {
            console.log(`You have guessed incorrectly.`)
            this.numberOfGuessesLeft--
            this.printOnConsole(false)
            
        }

        return this.word.includes(this.guess)
    }

    updateWordPrintString(): string {
        const wordPrintArr = this.wordPrint.split('')
        for (let i = 0; i < this.word.length; i++) {
            wordPrintArr[i] = (this.word[i] === this.guess) ? this.guess : wordPrintArr[i];
        }
    
        return wordPrintArr.join('');
    }

    start() {
        const prompt = require('prompt-sync')({sigint: true});

        this.printOnConsole(true)

        while (this.numberOfGuessesLeft > 0) {
            this.guess = prompt(' Guess a letter: ').toLowerCase();

            if (!this.checkGuessType()) continue

            if (this.checkGuessedList()) continue

            this.guessedLetter.push(this.guess)

            if (!this.isGuessRight()) continue

            this.wordPrint = this.updateWordPrintString()
            console.log(` You have guessed correctly!`)
            this.printOnConsole(false)

            if (this.wordPrint === this.word) {
                console.log(` You have won!! The word was ${this.word}`)
                break
            }
        }

        (this.numberOfGuessesLeft === 0) ? console.log(" You have lost. Play again?") : console.log("");
    }
}
