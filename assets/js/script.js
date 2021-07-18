const currentJoke = document.querySelector('#current-joke');
const jokeModal = document.querySelector('#joke-modal');
const saveJokeBtn = document.querySelector("#save-joke-button")
const savedJokes = document.querySelector("#saved-jokes")
let jokeArr = JSON.parse(localStorage.getItem('jokeArr'))
if (jokeArr == null) {
    jokeArr = []
    localStorage.setItem("jokeArr", JSON.stringify(jokeArr));
}
//var jokeArr = [];
var jokeData = {};

function loadDadJoke() {
    currentJoke.innerText = '';
    openModal();
    let tempJoke = '';

    fetch("https://icanhazdadjoke.com/", {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(jokeData)
            jokeData.id = data.id
            jokeData.joke = data.joke
            console.log(jokeData)
            currentJoke.innerText = jokeData.joke
            saveJokeBtn.disabled = false
        });
};

function loadChuckJoke() {
    currentJoke.innerText = '';
    openModal();
    let tempJoke = '';
    fetch("https://api.chucknorris.io/jokes/random", {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(jokeData)
            jokeData.id = data.id
            jokeData.joke = data.value
            currentJoke.innerText = jokeData.joke
            saveJokeBtn.disabled = false
        });
};
// function loadYoJoke() {
//     currentJoke.innerText = '';
//     openModal();
//     let tempJoke = '';

//     fetch("https://yomomma-api.herokuapp.com/",
//         { headers: { 
//             'Accept': 'application/json'
//         }})
//         console.log(data)
//         .then(response => response.json())
//         .then(data => {
//         console.log (data)
//         jokeData.id = data.id
//         jokeData.joke = data.joke
//         console.log (jokeData)
//         currentJoke.innerText = jokeData.joke
//         saveJokeBtn.disabled = false
//         });
// };
// saves joke to local storage
var saveJoke = function () {
    jokeArr.push(jokeData);
    localStorage.setItem("jokeArr", JSON.stringify(jokeArr));
    closeModal();
    loadSavedJokes()
}

var loadSavedJokes = function () {
    //openModal()

    const cards = jokeArr.map(j => (
        `<div class="card">
            <div class="card-content">
              <div class="content" >
              ${j.joke}
              </div>
            </div>
            <button  class= "button" onclick="deleteJoke('${j.id}')">🗑</button>
          </div>`
    )).join('')
    // const listItems = jokeArr.map(j => ("<li>"+ j.joke + "</li>")).join("")
    //const list = "<ul>" + listItems + "</ul>"
    // currentJoke.innerHTML = list
    //console.log(list)
    savedJokes.innerHTML = cards
}

loadSavedJokes();

function closeModal() {
    jokeData = {};
    jokeModal.classList.remove('is-active')
}

function openModal() {
    jokeModal.classList.add('is-active')
    saveJokeBtn.disabled = true
}

function deleteJoke(id) {
    jokeArr = jokeArr.filter(j => j.id != id)
    localStorage.setItem("jokeArr", JSON.stringify(jokeArr))
    loadSavedJokes()
}