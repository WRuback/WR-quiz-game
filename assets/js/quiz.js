// All elements needed from the document.
var quiz = document.querySelector(".quiz");
var endcard = document.querySelector(".endcard");
var answers = document.querySelector(".answers");
var answerDisplay = document.querySelector(".correctOrNot");
var timeDisplay = document.querySelector(".timeDisplay");
var scoreDisplay = document.querySelector(".scoreDisplay");
var initials = document.querySelector("#initials");
var submit = document.querySelector(".submitInit");

// All questions are structured as arrays. [0] is the question, [1] is the correct answer, and [2] thru [4] are other answers.
var quizQuestions = [
    ["How many houses and hotels are in a standard monoploy game?",
        "32 houses, 12 hotels.",
        "16 houses, 16 hotels.",
        "36 houses, 8 hotels.",
        "Unlimited. You can have as many as you want"],
    ["What does upgrading a settlement to a city cost in Catan?",
        "2 wheat, 3 stone.",
        "1 brick, 1 wood, 1 wheat, 1 sheep.",
        "1 sheep, 1 wheat, 1 stone.",
        "3 brick, 2 sheep."],
    ["How many cards does your starting hand have in Yu-gi-oh?",
        "5 cards.",
        "4 cards.",
        "6 cards.",
        "5 cards for the first player, 6 for the second."],
    ["What chess piece can only move foward?",
        "Pawn.",
        "King.",
        "Knight.",
        "Rook."],
    ["How many cards are in a standard deck of playing cards?",
        "54 cards.",
        "52 cards.",
        "48 cards.",
        "53 cards."],
    ["Which board game was made into a film with multiple endings?",
        "Clue.",
        "Battleship.",
        "Jumanji.",
        "Ouija."],
];
// Stores the order the answers will appear in.
var questionOrder = [1, 2, 3, 4];
// Is the game in progress.
var gameInProg = false;
// Tracks what the next question up will be.
var nextQuestion = 0;
// Tracks, in seconds, how much time for the quiz is left.
var timeCount = 60;
// These variables will hold timer intervals in the future. This is done so all functions can start or stop them.
var timerInterval = "";
var displayResult = "";

// Starts the question loop, and the timer countdown.
function startgame() {
    gameInProg = true;
    questionLoop();
    timerInterval = setInterval(function () {
        timeCount--;
        timeDisplay.textContent = "timer: " + timeCount;
        if (timeCount <= 0) {
            clearInterval(timerInterval);
            timeCount = 0;
            endgame();
        }
    }, 1000);
}

// If the next question exists, it runs the question builder, changes the next question pointer.
// If the next question doesn't exist, it stops the timer, and ends the game.
function questionLoop() {
    if (nextQuestion != quizQuestions.length) {
        BuildQuestion(quizQuestions[nextQuestion]);
        nextQuestion++;
    }
    else {
        clearInterval(timerInterval);
        endgame();
    }
}

// Randomizes the answer order, the sets the question and answer object to display the new question.
function BuildQuestion(question) {
    // Randomizes the question order with the Fisher-Yates Shuffle.
    for (let i = questionOrder.length - 1; i > 0; i--) {
        let tar = Math.floor(Math.random() * (i + 1));
        console.log(tar);
        let store = questionOrder[tar];
        questionOrder[tar] = questionOrder[i];
        questionOrder[i] = store;
    }

    // Displays answers on button sections, putting answer in based on the question order array.
    quiz.children[0].textContent = question[0];
    for (let i = 0; i < 4; i++) {
        answers.children[i].textContent = question[questionOrder[i]];
    }
}

// Ends the game by turning the quiz section display off, displaying the endcard section, and displaying the score.
function endgame() {
    gameInProg = false;
    quiz.style.display = "none";
    scoreDisplay.textContent = "Score: " + timeCount;
    endcard.style.display = "";
}

// Checks if the answer is correct. If it is, continue, if not, subtract 10 from the timer.
function checkAnswer(index) {
    // The correct answer is always stored in question order as 1...
    // So, if this button's index number is the index of the 1 in question order...
    // The answer is correct! If not, it is wrong.
    if (questionOrder[index] === 1) {
        answerDisplay.textContent = "Correct!";
    }
    else {
        answerDisplay.textContent = "Wrong Answer!";
        timeCount -= 10;
        timeDisplay.textContent = "timer: " + timeCount;
        // If timer goes below 0, end the game.
        if (timeCount <= 0 && timerInterval != "") {
            clearInterval(timerInterval);
            timeCount = 0;
            timeDisplay.textContent = "timer: " + timeCount;
            endgame();
        }
    }

    // Set the right/wrong display to  display
    answerDisplay.style.opacity = "1";
    // Run the next question.
    questionLoop();
    // If the other instance is still displaying, end it.
    if (displayResult != "") {
        clearTimeout(displayResult);
    }
    // Set the right/wrong display to disappear after 1 second.
    displayResult = setTimeout(function () {
        answerDisplay.style.opacity = "0";
    }, 1000);
}

// Records the player's initials and score to local storage, and goes to the score page.
function recordScore(event) {
    // Stops the button refreshing the page.
    event.preventDefault();

    // Check if the input is blank. If so, use "NAN" as the filler.
    if (initials.value.replace(/\s/g, '') === "") {
        initials.value = "NAN";
    }
    // The object storing the player information.
    let player = {
        // Convert the input to have no blanks, all uppercasse, and only the first 3 letters.
        init: initials.value.replace(/\s/g, '').toUpperCase().slice(0, 3),
        initScore: timeCount
    }
    // Add the player object to the scoreboard, and store it.
    if (localStorage.getItem("scoreBoard") != null) {
        let scoreBoard = JSON.parse(localStorage.getItem("scoreBoard"));
        scoreBoard.push(player);
        // Sorts the scoreboard to be in order of the scores, highest to lowest.
        scoreBoard.sort(function (a, b) { return b.initScore - a.initScore });
        localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
    }
    else {
        localStorage.setItem("scoreBoard", JSON.stringify([player]));
    }
    window.location = "../html/scores.html";
}

// Sets the right/wrong display and the endcard to be hidden at the start.
answerDisplay.style.opacity = "0";
endcard.style.display = "none";
// Sets checkAnswer with the proper index onto each button.
for (let i = 0; i < answers.children.length; i++) {
    answers.children[i].addEventListener("click", function () { checkAnswer(i) });
}
// Sets the submit button to record the score.
submit.addEventListener("click", recordScore);
// Starts the game.
startgame();