const red = document.querySelector(".red");
const orange = document.querySelector(".orange");
const green  = document.querySelector(".green");

window.addEventListener('mouseover', startProcess);

var intervaleId;

function startProcess(){
    intervaleId = setInterval(redLightProcess, 2000);
}

function redLightProcess(){
    red.style.backgroundColor = 'red';
}