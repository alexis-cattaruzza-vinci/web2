const btn = document.querySelector("#button1");

btn.addEventListener('mouseover', startGame);
btn.addEventListener('click', countClick);

const timerHolder = document.querySelector("#timer"); 
const message = document.querySelector("#messageGame");

let startTime;
let timeOutId; 
let currentClick = 0; 
const maxClick = 10;
const maxTime = 5;


function startGame (){
    startTime = new Date();
    timeOutId = setTimeout(printLoss,maxTime * 1000);
     
}


function countClick(){
    currentClick++;
    if(currentClick === maxClick){
        clearTimeout(timeOutId);
        win();
    }
}

function win(){
    btn.style.display = 'none';
    const timeSpent = new Date().getTime() - startTime.getTime();
    message.innerText = `You win ! You clicked ${currentClick} times within ${timeSpent} ms`
}

function printLoss() {
    btn.style.display = 'none';
    message.innerText = `Game over, you did not click ${maxClick} times within ${maxTime}
    You click ${currentClick} times`
}