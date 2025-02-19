import Database from "better-sqlite3";

const db = new Database('store.db', { fileMustExist: true, readonly: false });

export default db;