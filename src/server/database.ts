import { game } from '../client/indexGames';

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('/sommerlan-database.db');
let list: game[] = [];

export default class Database {
    constructor() {
        db.serialize(() => {
            db.all('SELECT rowid, name, url FROM games', (error, rows) => {
                if (error) {
                    console.log('Something went wrong: ', error);
                } else {
                    list = rows;
                }
            });
        });
        db.close();
    }

    refreshList(): void {
        db = new sqlite3.Database('/sommerlan-database.db');
        db.serialize(() => {
            db.all('SELECT rowid, name, url FROM games', (error, rows) => {
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
