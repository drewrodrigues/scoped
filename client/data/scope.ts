import { scopeUpdated } from "../store/scopeSlice";
import { store } from "../store/store";
import db from "./db";

const SCOPE_KEY = "SCOPE";

export interface Scope {
  _id: string;
  title: string;
  // TODO: @drew see if we can query these from the children types and this ID
  // tasks: any[];
  _rev?: string;
}

// TODO: @drew make parent model class to auto create IDs

export async function createScope(name: string) {
  try {
    const scope: Scope = {
      _id: `${SCOPE_KEY}-${Date.now().toString()}`,
      title: name,
    };
    console.info("⏳ Creating scope", { scope });

    const createResponse = await db.put(scope);
    const createdScope = { ...createResponse, ...scope };
    console.info("✅ Scope created", { createResponse, createdScope });
    return createdScope;
  } catch (e) {
    console.error("createScope() Failed:", e);
    throw e;
  }
}

export async function getScopes(): Promise<Scope[]> {
  try {
    console.info("⏳ Getting Scopes");
    const response = await db.allDocs({
      include_docs: true,
      attachments: true,
      startkey: SCOPE_KEY,
      endkey: `${SCOPE_KEY}\ufff0`,
    });
    console.info("⬅️ Retrieved Scopes", response);
    const scopes = response.rows.map((row) => row.doc) as unknown as Scope[];
    console.info("✅ Return scopes", scopes);
    return scopes;
  } catch (e) {
    console.error("🚨 getScopes() Failed: ", e);
    throw e;
  }
}
