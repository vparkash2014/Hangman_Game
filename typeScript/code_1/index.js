"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var word_1 = require("./../word");
var displayHangman_1 = require("./../displayHangman");
var getWord = function (wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)];
};
var checkGuessType = function (guess) {
    if (guess.search(/^[a-zA-Z]$/g) === -1) {
        console.log(guess + " is an invalid input. Try again. \n");
    }
    return (guess.search(/^[a-zA-Z]$/g) === -1) ? false : true;
};
var checkGuessedList = function (guess, guessedLetter) {
    if (guessedLetter.includes(guess)) {
        console.log("You have already guessed the letter " + guess + ". Try again. \n");
    }
    return guessedLetter.includes(guess);
};
var updateWordPrintString = function (wordPrint, guess, word) {
    var wordPrintArr = wordPrint.split('');
    for (var i = 0; i < word.length; i++) {
        wordPrintArr[i] = (word[i] === guess) ? guess : wordPrintArr[i];
    }
    return wordPrintArr.join('');
};
var isGuessRight = function (word, guess) {
    if (!word.includes(guess)) {
        console.log("You have guessed incorrectly.");
    }
    return word.includes(guess);
};
var printOnConsole = function (newGame, wordPrint, numberOfGuessesLeft, guessedLetter, displayHangman) {
    if (newGame === void 0) { newGame = true; }
    if (newGame) {
        console.log("Lets play Hangman \n \n Word: " + wordPrint + " \n");
        console.log(displayHangman[0] + "\n");
        return;
    }
    console.log(" You have " + numberOfGuessesLeft + " guesses left. \n Word: " + wordPrint + ". \n Recent Guesses: " + guessedLetter.join());
    console.log(displayHangman[6 - numberOfGuessesLeft] + "\n");
};
var hangmanGame = function (word) {
    var wordPrint = "_".repeat(word.length);
    var guessedLetter = [];
    var numberOfGuessesLeft = 6;
    printOnConsole(true, wordPrint, numberOfGuessesLeft, guessedLetter, displayHangman_1.displayHangman);
    var prompt = require('prompt-sync')({ sigint: true });
    while (numberOfGuessesLeft > 0) {
        var guess = prompt(' Guess a letter: ').toLowerCase();
        if (!checkGuessType(guess))
            continue;
        if (checkGuessedList(guess, guessedLetter))
            continue;
        guessedLetter.push(guess);
        if (!isGuessRight(word, guess)) {
            numberOfGuessesLeft--;
            printOnConsole(false, wordPrint, numberOfGuessesLeft, guessedLetter, displayHangman_1.displayHangman);
            continue;
        }
        wordPrint = updateWordPrintString(wordPrint, guess, word);
        console.log(" You have guessed correctly!");
        printOnConsole(false, wordPrint, numberOfGuessesLeft, guessedLetter, displayHangman_1.displayHangman);
        if (wordPrint === word) {
            console.log(" You have won!! The word was " + word);
            break;
        }
    }
    (numberOfGuessesLeft === 0) ? console.log(" You have lost. Play again?") : console.log("");
};
var word = getWord(word_1.wordList);
hangmanGame(word);
