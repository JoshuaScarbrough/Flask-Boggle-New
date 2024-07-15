var score = 0;
var time = 60;
var timer = setInterval(updateTime, 1000);
initHighscoreDisplay();

$(".add-word").on("submit", async function handleSubmit(e){
    e.preventDefault();

    const $word = $(".word")

    let word = $word.val()
    if(!word) return;

    if(time > 0){
        const resp = await axios.get("/check-word", {params: {word: word}} )
        if(resp.data.result === "not-word"){
            document.getElementById("response").innerHTML = "not a word";
        }else if(resp.data.result === "not-on-board"){
            document.getElementById("response").innerHTML = "not on board";
        }else{
            score = score + word.length;
            document.getElementById("scoreBoard").innerHTML = "current score : " + score;
            document.getElementById("response").innerHTML = "Word";
        }
    }

});



async function updateTime(){
    time--;
    document.getElementById("timeBoard").innerHTML = "Time Left: " + time + " Seconds";
    if(time == 0){
        clearInterval(timer);
        const resp = await axios.get("/gameOver", {params: {score: score}} );
        console.log(resp);
        document.getElementById("highScore").innerHTML = "Highscore: " + resp.data.result;

        // alert("Game over");
    }
}

async function initHighscoreDisplay(){
    
        const resp = await axios.get("/gameOver", {params: {score: score}} );
        document.getElementById("highScore").innerHTML = "Highscore: " + resp.data.result;

    
}







    

