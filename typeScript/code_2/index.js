"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var word_1 = require("./../word");
var displayHangman_1 = require("./../displayHangman");
var hangmanClass_1 = require("./hangmanClass");
new hangmanClass_1.Hangman(word_1.wordList, displayHangman_1.displayHangman).start();
