const jokeText = document.querySelector('#joke-text');
const jokeModal = document.querySelector('#joke-modal');
var jokeArr = [];
var jokeData = {};

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
// saves joke to local storage
var saveJoke = function () {
    jokeArr.push(jokeData);
    localStorage.setItem("jokeArr", JSON.stringify(jokeArr));
}
function closeModal() {
    jokeModal.classList.remove('is-active')   
}
function openModal() {
    jokeModal.classList.add('is-active')   
}