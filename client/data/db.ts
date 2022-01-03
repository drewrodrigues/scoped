import PouchDB from "pouchdb";
import find from "pouchdb-find";
import debug from "pouchdb-debug";
import { IScope } from "./couchModel";

PouchDB.plugin(find).plugin(debug);
PouchDB.debug.enable("*");

const db = new PouchDB("scoped_development2");

// add tasks to scope migration
// TODO: @drew pull out into migration
(async () => {
  const scopesResponse = await db.find({
    selector: { type: "scope", tasks: { $exists: false } },
  });
  let scopes: IScope[] = scopesResponse.docs as unknown as IScope[];

  scopes = scopes.map((scope) => ({ ...scope, tasks: [] }));

  if (scopes.length) {
    console.log("💿 Migration: add tasks to scopes", scopes);
    await db.bulkDocs(scopes, { new_edits: true });
  }
})();

// add goals to scopes
// TODO: @drew pull out into migration
(async () => {
  const scopesResponse = await db.find({
    selector: { type: "scope", goals: { $exists: false } },
  });
  let scopes: IScope[] = scopesResponse.docs as unknown as IScope[];

  scopes = scopes.map((scope) => ({ ...scope, goals: [] }));

  if (scopes.length) {
    console.log("💿 Migration: add goals to scopes", scopes);
    await db.bulkDocs(scopes, { new_edits: true });
  }
})();

export default db;
