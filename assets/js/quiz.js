var quiz = document.querySelector(".quiz");
var endcard = document.querySelector(".endcard");
var answers = document.querySelector(".answers");
var answerDisplay = document.querySelector(".correctOrNot");
var questionOrder = [1, 2, 3, 4];
var gameInProg = true;

//All questions are structured as arrays. [0] is the guestion, [1] is the answer, and [2] thru [4] are other answers.""
var questionOne = ["How many houses and hotels are in a standard monoploy game?",
    "32 houses, 12 hotels.",
    "16 houses, 16 hotels.",
    "36 houses, 8 hotels.",
    "Unlimited. You can have as many as you want"];


function BuildQuestion(question) {
    for (let i = questionOrder.length - 1; i > 0; i--) {
        let tar = Math.floor(Math.random() * (i + 1));
        console.log(tar);
        let store = questionOrder[tar];
        questionOrder[tar] = questionOrder[i];
        questionOrder[i] = store;
    }

    //Displays answers on button sections.
    quiz.children[0].textContent = question[0];
    for (let i = 0; i < 4; i++) {
        answers.children[i].textContent = question[questionOrder[i]];
    }
}

function checkAnswer(index) {
    console.log(questionOrder);
    console.log(questionOrder[index]);
    if (questionOrder[index] === 1) {
        answerDisplay.textContent = "Correct!";
    }
    else {
        answerDisplay.textContent = "Wrong Answer!";
    }
    answerDisplay.style.display = "";
    for (let i = 0; i < answers.children.length; i++) {
        answers.children[i].disabled = true;
    }
    var timeInterval = setTimeout(function () {
        answerDisplay.style.display = "none";
        for (let i = 0; i < answers.children.length; i++) {
            answers.children[i].disabled = false;
        }
        endgame();
    }, 2000);
}

function endgame(){
    gameInProg = false;
    quiz.style.display = "none";
    endcard.style.display = "";
}
answerDisplay.style.display = "none";
endcard.style.display = "none";
for (let i = 0; i < answers.children.length; i++) {
    answers.children[i].addEventListener("click", function(){checkAnswer(i)});
}
BuildQuestion(questionOne);