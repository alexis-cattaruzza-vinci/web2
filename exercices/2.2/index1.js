let counter = 0;

let message = document.querySelector('.message');
let counterPrint = document.querySelector('.counter');

window.addEventListener('click', () =>{
    ++counter;
    counterPrint.textContent = counter;
    if(counter === 5) message.textContent = 'Bravo, bel échauffement !';
    else if(counter === 10) message.textContent = "Vous êtes passé maître en l'art du clic !"

});