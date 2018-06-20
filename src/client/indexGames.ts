import * as fetch from 'isomorphic-fetch';

export interface game {
    name: string;
    url: string;
}

const list = document.getElementById('game-list');
let gameList: game[] = [];

function addGame(game: game) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const name = document.createTextNode(game.name);
    a.setAttribute('href', game.url);
    a.appendChild(name);
    li.appendChild(a);
    return li;
}

function getGames() {
    fetch('/gamelist')
        .then(response => response.json())
        .then(json => {
            json.map(game => {
                const entry = addGame(game);
                list.appendChild(entry);
            });
        })
        .catch(error => console.log('error', error))
        .catch(error => console.log('error', error));
}

getGames();
