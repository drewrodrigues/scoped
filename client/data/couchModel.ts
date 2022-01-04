import db from "./db";

export interface UnsavedModel {
  _id: string;
  type: string;
}

export interface SavedModel {
  _id: string;
  _rev: string;
  type: string;
}

export type UnsavedType<T> = T & UnsavedModel & Object;
type UnsavedConstructor<T> = T & Omit<UnsavedModel, "type" | "_id">;

export type SavedType<T> = T & SavedModel & Object;
type SavedConstructor<T> = T & Omit<SavedModel, "type">;

export interface IScope {
  title: string;
}

export interface IGoal {
  title: string;
  scopeId: string;
  coverPhotoUrl?: string;
  dueDate?: string;
  photoContainerId?: string;
  photoId?: string;
}

// TODO: implement
// export interface IGoalRequiredArgs {
//   title: string
// }

export abstract class CouchModel<T> {
  public static readonly typeName: string;

  public readonly _id: string;
  public readonly _rev?: string;

  private _isDirty: boolean;
  private _attributes: T;

  // TODO: @drew -- make this to where we don't have to pass the type
  // and simplify types overall. Can they be autogenerated for us?
  public static async all<S>() {
    console.info(`ℹ️ Getting all ${this.typeName}`);
    const response = await db.allDocs({
      startkey: `${this.typeName}`,
      endkey: `${this.typeName}\ufff0`,
      include_docs: true,
    });
    const docs = response.rows.map((row) => row.doc);
    console.log({ response, docs });
    return docs as unknown as SavedType<S>[];
  }

  constructor(attributes: UnsavedConstructor<T> | SavedType<T>) {
    if (!this._type)
      throw new Error("typeName must be defined in class definition");

    if (this.isSavedAttributes(attributes)) {
      console.log(`ℹ️ Init saved ${this._type} record`);
      this._id = attributes._id;
      this._isDirty = false;
    } else {
      console.log(`ℹ️ Init new ${this._type} record`);
      this._id = `${this._type}-${Date.now().toString()}`;
      this._isDirty = true;
    }

    this._attributes = { type: this._type, ...attributes };
  }

  public async save(parentRecord?: SavedType<any>) {
    // TODO: query and pull in latest revisions
    // to make sure there's no conflicts
    const newOrOld = this._rev ? "old" : "new";

    if (parentRecord) {
      console.info("ℹ️ Will create record with parent record id", {
        parentRecord,
      });
    }

    try {
      console.info(`ℹ️ Creating ${newOrOld} ${this._type} record`, {
        attributes: this.attributes,
      });
      const createResponse = await db.put({
        ...this.attributes,
        _id: this._id,
      });
      const createdRecord = {
        _rev: createResponse.rev,
        _id: createResponse.id,
        ...this.attributes,
      };
      console.info(`✅ ${this._type} created`, {
        createResponse,
        createdRecord,
      });
      this._isDirty = false;
      return createdRecord as SavedType<T>;
    } catch (error) {
      console.error({ error }, "🚨 Save failed");
      throw error;
    }
  }

  public async destroy() {
    await db.remove(this.attributes as SavedType<T>);
  }

  public setAttributes(attributes: T) {
    for (const key in attributes) {
      this._isDirty = true;
      this._attributes = attributes;
      // @ts-ignore -- meta
    }
  }

  public get attributes(): T {
    return this._attributes;
  }

  public get isDirty(): boolean {
    return this._isDirty;
  }

  private isSavedAttributes<T>(
    attributes: UnsavedConstructor<T> | SavedType<T>
  ): attributes is SavedType<T> {
    return !!(attributes as SavedType<T>)._rev;
  }

  private get _type(): string {
    // @ts-ignore
    return this.constructor.typeName;
  }

  public savableAttributes() {
    let keys = Object.keys(this);
    keys = keys.filter((key) => !key.startsWith("__"));
    const attributes = {};
    for (const key of keys) {
      // @ts-ignore
      attributes[key] = this[key];
    }
    // @ts-ignore
    return attributes;
  }
}

export class Goal extends CouchModel<IGoal> {
  public static readonly typeName = "Goal";
}

export class Scope extends CouchModel<IScope> {
  public static readonly typeName = "Scope";
}
