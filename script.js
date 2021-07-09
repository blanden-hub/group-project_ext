const jokeText = document.querySelector('#joke-text');
const jokeModal = document.querySelector('#joke-modal');


function loadDadJoke() {
    jokeText.innerText = '';
    openModal();
    let tempJoke = '';

    fetch("https://icanhazdadjoke.com/",
        { headers: { 
            'Accept': 'application/json'
        }})
        .then(response => response.json())
        .then(data => {
            jokeText.innerText = data.joke
        });
}

function loadChuckJoke() {
    jokeText.innerText = '';
    openModal();
    let tempJoke ='';
    fetch("https://api.chucknorris.io/jokes/random",
        { headers: { 
            'Accept': 'application/json'
        }})
        .then(response => response.json())
        .then(data => {
            jokeText.innerText = data.value
        });
}

function closeModal() {
    jokeModal.classList.remove('is-active')   
}
function openModal() {
    jokeModal.classList.add('is-active')   
}