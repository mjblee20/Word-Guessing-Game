
$(document).ready(function() {
    // Here are all the information needed for the game
    var game = {
        state: false,
        dictionary: ["apple", "orange", "banana", "volunteer", "impossible", "boring", "distress", "some", "utopia", "awesome", "coding", "blah"],
        win: 0,
        loss: 0,
        guessesLeft: 9
    }

    // Shortcut methods for less typing, though not sure why it's not working
    function getID(id) {
        return document.getElementById(id);
    }

    // If game hasn't started yet then first button pressed will start the game 
    if (game.state === false) {
        document.onkeypress = gameStart;
    }

    // Randomly chooses a word from dictionary and set it as the unknown word to be guessed. If the word is 4 letters, the game screen should display _ _ _ _.
    function getWord() {
        // Pick a random word in the dictionary library
        var randomWord = game.dictionary[Math.floor(Math.random() * game.dictionary.length)];
        // Array of letters of chosen word
        game.word = [];
        // Array of _ characters with the chosen word's length
        game.guessWord = [];
        // constructing a new array with each letter of the chosen word as elementsp]
        for (let i = 0; i < randomWord.length; i++) {
            game.word[i] = randomWord.charAt(i);
            game.guessWord[i] = "_";
        }
        // Update the <h1 id="word"></h1> with _ _ _ _ _
        getID("word").innerHTML = game.guessWord.join(" ");
    }

    function gameStart() {
        game.state = true;
        getWord();
        // User presses a key to guess the word. Checks if user entered in a correct character. If correct, respective _ will be replaced by the correct letter.
        document.onkeypress = function guess(event) {
            // saves the key pressed as a variable
            var char = event.key;
            console.log(event.key);
            // checks if key is a letter
            if (event.keyCode >= 97 && event.keyCode <= 122) {
                game.guessesLeft--;
                getID("guessedLetters").innerHTML += " " + event.key; 
                getID("guessesLeft").innerHTML = "Remaining Guesses: " + game.guessesLeft;
                getID("guessesLeft")
                for (let i = 0; i < game.word.length; i++) {
                    // check if letter is in chosen word (if yes = win, if no guess#-- and guess again... until guess# =0 then loss)
                    if (char === game.word[i]) {
                        game.guessWord[i] = game.word[i];
                        getID("word").innerHTML = game.guessWord.join(" ");
                    }
                }
                // losing condition
                if (game.word.toString() !== game.guessWord.toString() && game.guessesLeft === 0){
                    game.loss++;
                    game.state = false;
                    getID("loss").innerHTML = "Losses: " + game.loss;
                    reset();
                } 
                // winning condition
                else if (game.word.toString() === game.guessWord.toString() && game.guessesLeft >= 0) {
                    game.win++;
                    game.state = false;
                    getID("win").innerHTML = "Wins: " + game.win;
                    reset();
                }
            } else {
                alert("You have entered a non-alphabet character. You should only enter alphabets!");
            }

            $(".class").text(event.key);

        }
    }

    // Reset the state of the game. 
    function reset() {
        game.guessesLeft = 9;
        getID("guessedLetters").innerHTML = "You have guessed: ";
        getID("guessesLeft").innerHTML = "Remaining Guesses: " + game.guessesLeft;
        gameStart();
    }
});
