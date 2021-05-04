import { wordList }  from "./../word";
import { displayHangman }  from "./../displayHangman";
import { Hangman } from "./hangmanClass";

new Hangman(wordList, displayHangman).start()