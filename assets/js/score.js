var scoreList = document.querySelector(".scorelist");
var clearButton= document.querySelector(".clear");
if(localStorage.getItem("scoreBoard") != null)
{
    let Highscores = JSON.parse(localStorage.getItem("scoreBoard"));
    console.log(Highscores);
    for(let i=0; i < Highscores.length; i++){
        let listItem = document.createElement("li");
        console.log(listItem);
        listItem.textContent = Highscores[i].init + ": " + Highscores[i].initScore;
        scoreList.appendChild(listItem);

    }
}


clearButton.addEventListener("click",function(event){
    event.preventDefault();
    localStorage.removeItem("scoreBoard");
    console.log(scoreList.children);
    for(let i=0; i < scoreList.children.length; i++){
        scoreList.children[i].style.display = "none";

    }
})