import java.util.*;

public class Hangman {
    private String word;
    private String wordPrint;
    private ArrayList<String> guessedLetter= new ArrayList<>(Arrays.asList());
    private int numberOfGuessesLeft;
    private String guess;
    private String[] displayHangman;

    public Hangman() {
        this.word = new WordList().randomWord();
        this.wordPrint = "_".repeat(word.length());
        this.numberOfGuessesLeft = new DisplayHangman().displayHangman.length - 1;
        this.displayHangman = new DisplayHangman().displayHangman;
    }

    private Boolean checkGuessType() {
        if (!guess.matches("^[a-zA-Z]$")) System.out.println(guess + " is an invalid input. Try again. \n");
        return guess.matches("^[a-zA-Z]$");
    }

    private Boolean checkGuessedList() {
        if (guessedLetter.contains(guess)) System.out.println("You have already guessed the letter "
                + guess + ". Try again. \n");
        return guessedLetter.contains(guess);
    }

    private void printOnConsole(Boolean newGame ) {
        if (newGame) {
            System.out.println("Lets play Hangman \n \n" + wordPrint + "\n");
            System.out.println("The total number of guesses you have is " + numberOfGuessesLeft + "\n");
            System.out.println(displayHangman[0] + "\n");
        } else {
            System.out.println(" You have " + numberOfGuessesLeft + " guesses left. \n Word: "
                    + wordPrint + "\n Recent Guesses: " + guessedLetter);
            System.out.println(displayHangman[displayHangman.length - numberOfGuessesLeft - 1] + "\n");
        }

    }

    private Boolean isGuessRight() {
        if (!word.contains(guess)) {
            System.out.println("You have guessed incorrectly.");
            numberOfGuessesLeft--;
            this.printOnConsole(false);
        }

        return word.contains(guess);
    }

    private String updateWordPrintString() {
        for(int i = 0; i < word.length(); i++ ) {
            Character letter = word.charAt(i);
            if (letter.toString().equalsIgnoreCase(guess)) {
                StringBuilder sb = new StringBuilder(wordPrint);
                sb.setCharAt(i, guess.charAt(0));
                wordPrint = sb.toString();
            };
        };

        return wordPrint;
    }

    public void start() {
        Scanner sc = new Scanner(System.in);

        this.printOnConsole(true);

        while (this.numberOfGuessesLeft > 0) {
            System.out.print("Guess a letter: ");
            guess = sc.nextLine();

            if (!checkGuessType()) continue;
            if (checkGuessedList()) continue;

            guessedLetter.add(guess);

            if (!isGuessRight()) continue;
            wordPrint = updateWordPrintString();
            System.out.println("You have guess correctly!");
            this.printOnConsole(false);

            if (wordPrint.matches(word)) {
                System.out.println("You have won!! the word was " + word);
                break;
            }
        }

        if (numberOfGuessesLeft == 0) {
            System.out.println("You have lost. Play again?");
        }
    }

    public static void main(String[] args) {
        new Hangman().start();

    }
}
