"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hangman = void 0;
var Hangman = /** @class */ (function () {
    function Hangman(wordList, displayHangman) {
        this.word = this.getWord(wordList);
        this.wordPrint = "_".repeat(this.word.length);
        this.guessedLetter = [];
        this.numberOfGuessesLeft = displayHangman.length - 1;
        this.displayHangman = displayHangman;
    }
    ;
    Hangman.prototype.getWord = function (wordList) {
        return wordList[Math.floor(Math.random() * wordList.length)];
    };
    Hangman.prototype.checkGuessType = function () {
        if (this.guess.search(/^[a-zA-Z]$/g) === -1) {
            console.log(this.guess + " is an invalid input. Try again. \n");
        }
        return (this.guess.search(/^[a-zA-Z]$/g) === -1) ? false : true;
    };
    Hangman.prototype.checkGuessedList = function () {
        if (this.guessedLetter.includes(this.guess)) {
            console.log("You have already guessed the letter " + this.guess + ". Try again. \n");
        }
        return this.guessedLetter.includes(this.guess);
    };
    Hangman.prototype.printOnConsole = function (newGame) {
        if (newGame === void 0) { newGame = true; }
        if (newGame) {
            console.log("Lets play Hangman \n \n Word: " + this.wordPrint + " \n");
            console.log("The total number of guesses you have is " + this.numberOfGuessesLeft + " \n");
            console.log(this.displayHangman[0] + "\n");
            return;
        }
        console.log(" You have " + this.numberOfGuessesLeft + " guesses left. \n Word: " + this.wordPrint + ". \n Recent Guesses: " + this.guessedLetter.join());
        console.log(this.displayHangman[this.displayHangman.length - this.numberOfGuessesLeft - 1] + "\n");
    };
    Hangman.prototype.isGuessRight = function () {
        if (!this.word.includes(this.guess)) {
            console.log("You have guessed incorrectly.");
            this.numberOfGuessesLeft--;
            this.printOnConsole(false);
        }
        return this.word.includes(this.guess);
    };
    Hangman.prototype.updateWordPrintString = function () {
        var wordPrintArr = this.wordPrint.split('');
        for (var i = 0; i < this.word.length; i++) {
            wordPrintArr[i] = (this.word[i] === this.guess) ? this.guess : wordPrintArr[i];
        }
        return wordPrintArr.join('');
    };
    Hangman.prototype.start = function () {
        var prompt = require('prompt-sync')({ sigint: true });
        this.printOnConsole(true);
        while (this.numberOfGuessesLeft > 0) {
            this.guess = prompt(' Guess a letter: ').toLowerCase();
            if (!this.checkGuessType())
                continue;
            if (this.checkGuessedList())
                continue;
            this.guessedLetter.push(this.guess);
            if (!this.isGuessRight())
                continue;
            this.wordPrint = this.updateWordPrintString();
            console.log(" You have guessed correctly!");
            this.printOnConsole(false);
            if (this.wordPrint === this.word) {
                console.log(" You have won!! The word was " + this.word);
                break;
            }
        }
        (this.numberOfGuessesLeft === 0) ? console.log(" You have lost. Play again?") : console.log("");
    };
    return Hangman;
}());
exports.Hangman = Hangman;
