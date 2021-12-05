import Pouch from "pouchdb";
import PouchDbFind from "pouchdb-find";

Pouch.plugin(PouchDbFind);
const db = new Pouch("scoped");
db.createIndex({ index: { fields: ["type"] } });

export default db;
