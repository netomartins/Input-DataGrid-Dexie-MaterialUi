// db.ts
import Dexie, { Table } from 'dexie';

export interface Friend {
    id?: number;
    description: string;
}

export class MySubClassedDexie extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    friends!: Table<Friend>;

    constructor() {
        super('myDatabase');
        this.version(2).stores({
            friends: '++id' // Primary key and indexed props
        });
    }
}

export const db = new MySubClassedDexie();