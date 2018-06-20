import { game } from '../client/indexGames';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./games.db');
let list: game[] = [];

export default class Database {
    constructor() {
        db.serialize(() => {
            db.all('SELECT * FROM games', (error, rows) => {
                if (error) {
                    console.log('Something went wrong: ', error);
                } else {
                    list = rows;
                }
            });
        });
        db.close();
    }

    getList(): game[] {
        return list;
    }
}
