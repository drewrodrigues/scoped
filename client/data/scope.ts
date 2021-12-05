import db from "./db";

export interface Scope {
  _id: string;
  title: string;
  tasks: any[];
  type: "scope";
}

export async function createScope(name: string) {
  try {
    const scope: Scope = {
      _id: name,
      title: name,
      tasks: [],
      type: "scope",
    };
    console.info("createScope()", { scope });
    await db.put(scope, {});
    return scope;
  } catch (e) {
    console.error("createScope() Failed:", e);
    throw e;
  }
}

export async function getScopes(): Promise<Scope[]> {
  try {
    console.info("getScopes()");
    const scopes = await db.find({
      selector: { type: "scope" },
    });
    console.info("getScopes():", scopes.docs);
    return scopes.docs as unknown as Scope[];
  } catch (e) {
    console.error("getScopes() Failed: ", e);
    throw e;
  }
}
