// All elements needed from the document.
var scoreList = document.querySelector(".scorelist");
var clearButton= document.querySelector(".clear");

// Sets up the scoreboard.
if(localStorage.getItem("scoreBoard") != null)
{
    let Highscores = JSON.parse(localStorage.getItem("scoreBoard"));
    // For each play, create a li, place in the text, and put it in the scorelist.
    for(let i=0; i < Highscores.length; i++){
        let listItem = document.createElement("li");
        listItem.textContent = Highscores[i].init + ": " + Highscores[i].initScore;
        scoreList.appendChild(listItem);

    }
} else{ // If there is no scoreboard in local storage, hide the scorelist.
    scoreList.style.opacity = "0";
}

// Clears the scoreboard in local storage and scorelist on-screen.
clearButton.addEventListener("click",function(event){
    event.preventDefault();
    localStorage.removeItem("scoreBoard");
    scoreList.innerHTML = "";
    scoreList.style.opacity = "0";
});