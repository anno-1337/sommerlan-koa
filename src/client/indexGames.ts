import * as fetch from 'isomorphic-fetch';
import { compilation } from 'webpack';

export interface game {
    rowid: number;
    name: string;
    coop: boolean;
    url: string;
}

const tbody = document.getElementById('table-body');
const rowid = document.getElementById('rowid');
const name = document.getElementById('name');
const coop = document.getElementById('coop');
const url = document.getElementById('url');
rowid.addEventListener('click', onClick);
name.addEventListener('click', onClick);
coop.addEventListener('click', onClick);
url.addEventListener('click', onClick);

let gameList: game[] = [];

function addGame(game: game) {
    const tr = document.createElement('tr');
    tr.setAttribute('data-row', 'row');
    const tdId = document.createElement('td');
    tdId.appendChild(document.createTextNode(game.rowid.toString()));
    tdId.setAttribute('data-row', 'rowid');
    tr.appendChild(tdId);
    const tdName = document.createElement('td');
    tdName.appendChild(document.createTextNode(game.name));
    tdName.setAttribute('data-row', 'name');
    tr.appendChild(tdName);
    const tdCoop = document.createElement('td');
    tdCoop.appendChild(document.createTextNode('Ja!'));
    tdCoop.setAttribute('data-row', 'coop');
    tr.appendChild(tdCoop);
    const tdUrl = document.createElement('td');
    const a = document.createElement('a');
    a.appendChild(document.createTextNode(game.url));
    a.setAttribute('href', game.url);
    tdUrl.appendChild(a);
    tdUrl.setAttribute('data-row', 'url');
    tr.appendChild(tdUrl);
    return tr;
}

function getGames() {
    fetch('/gamelist')
        .then(response => response.json())
        .then(json => {
            json.map(game => {
                const entry = addGame(game);
                tbody.appendChild(entry);
            });
        })
        .catch(error => console.log('error', error))
        .catch(error => console.log('error', error));
}

getGames();

let reverse: boolean = false;

function onClick(event) {
    const origRows = document.querySelectorAll('[data-row=row]');
    const liveRows = document.getElementsByTagName('tr');
    const parentNode = liveRows[1].parentNode;
    switch (event.target.id) {
        case 'rowid':
            for (let i = 0; i < origRows.length - 1; i++) {
                // console.log('rows[i]', origRows[i]);
                // console.log('rows[i+1]', origRows[i + 1]);
                parentNode.insertBefore(origRows[i + 1], origRows[i]);
            }
            break;
        case 'name':
            const rowArray = Array.from(liveRows);
            let nameArray = Array.from(document.querySelectorAll('[data-row=name]'));
            nameArray.sort((a, b) => a.innerHTML.localeCompare(b.innerHTML));
            if (reverse) {
                nameArray.reverse();
                nameArray.sort((a, b) => b.innerHTML.localeCompare(a.innerHTML));
            }
            reverse = !reverse;
            for (let i = 1; i < liveRows.length - 1; i++) {
                console.log('nameArray[i].parentNode', nameArray[i].parentNode);
                console.log('liveRows[i]', liveRows[i]);
                parentNode.insertBefore(nameArray[i].parentNode, liveRows[i]);
            }

            break;
        case 'coop':
            break;
        case 'url':
            break;
    }
}
