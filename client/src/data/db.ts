import PouchDB from "pouchdb";
import find from "pouchdb-find";
import debug from "pouchdb-debug";

PouchDB.plugin(find).plugin(debug);
PouchDB.debug.enable("*");

const db = new PouchDB("scoped_development2");

export default db;
