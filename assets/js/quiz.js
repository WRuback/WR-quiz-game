var quiz = document.querySelector(".quiz");
var correct = document.querySelector("#answer1");
var endcard = document.querySelector(".endcard");

var gameInProg = true;
correct.textContent = "Correct Anwser!";

endcard.style.display =  "none";

function endgame(){
    gameInProg = false;
    quiz.style.display = "none";
    endcard.style.display =  "";
}

correct.addEventListener("click",endgame);