const message = document.querySelector('#message');

addDateTime(message);

function addDateTime () {
    const date = getDateTime();
    const messageAndDate = `${date} : ${message.textContent}`;

    console.log(messageAndDate);

    alert(messageAndDate);
}


function getDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
}