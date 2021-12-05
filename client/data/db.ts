import Pouch from "pouchdb";
import PouchDbFind from "pouchdb-find";
import { Scope } from "./scope";

Pouch.plugin(PouchDbFind);
const db = new Pouch("scoped");
db.createIndex({ index: { fields: ["type"] } });

// add tasks to scope migration
(async () => {
  const scopesResponse = await db.find({
    selector: { type: "scope", tasks: { $exists: false } },
  });
  let scopes: Scope[] = scopesResponse.docs as unknown as Scope[];
  console.log("scopes without tasks added", scopes);

  scopes = scopes.map((scope) => ({ ...scope, tasks: [] }));
  console.log("scopes with tasks added", scopes);

  if (scopes.length) {
    await db.bulkDocs(scopes, { new_edits: true });
  }
})();

export default db;
