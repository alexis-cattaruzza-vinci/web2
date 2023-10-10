let wish = document.querySelector("#wish");

let messageWish = document.querySelector("#message")

let form = document.querySelector('form');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    form.style.display = 'none';
    messageWish.innerText = `Your wish is : ${wish.value}`;
});