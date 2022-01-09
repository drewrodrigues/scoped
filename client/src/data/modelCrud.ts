import db from "./db";
import moment from "moment";
import {
  IGoal,
  IGoalTrackable,
  IScope,
  ITracking,
  ModelStringType,
  ModelType,
} from "./modelTypes";

export interface UnsavedModel {
  _id: string;
  type: string;
}

export interface SavedModel {
  _id: string;
  _rev: string;
  type: string;
  createdOn: Date;
}

export type UnsavedType<T> = T & UnsavedModel & Object;
type UnsavedConstructor<T> = T & Omit<UnsavedModel, "type" | "_id">;
export type SavedType<T> = T & SavedModel & Object;

export function isSavedAttributes<T>(
  attributes: UnsavedConstructor<T> | SavedType<T>
): attributes is SavedType<T> {
  return !!(attributes as SavedType<T>)._rev;
}

// createOrSaveModel<IGoal>(...someAttributes);
export async function createOrSaveModel<Type extends ModelType>(
  type: ModelStringType,
  attributes: UnsavedConstructor<Type> | SavedType<Type>,
  parentRecord?: SavedType<Type>
): Promise<SavedType<Type>> {
  const newOrOld = isSavedAttributes(attributes) ? "old" : "new";

  if (parentRecord) {
    console.info("ℹ️ Will create record with parent record id", {
      parentRecord,
    });
  }

  try {
    console.info(`ℹ️ Creating ${newOrOld} ${type} record`, {
      attributes: attributes,
    });
    const createResponse = await db.put({
      ...attributes,
    });
    const createdRecord = {
      attributes,
      _rev: createResponse.rev,
      _id: createResponse.id,
    };
    console.info(`✅ ${type} created`, {
      createResponse,
      createdRecord,
    });
    return createdRecord as unknown as SavedType<Type>;
  } catch (error) {
    console.error({ error }, "🚨 Save failed");
    throw error;
  }
}

// getChildren<ITracking>("Tracking", "goalId", "5");
export async function getChildren<ChildType extends ModelType>(
  modelTypeString: ModelStringType,
  key: keyof ChildType,
  id: string
): Promise<SavedType<ChildType>[]> {
  const response = await db.find({
    selector: {
      type: modelTypeString,
      [key]: id,
    },
  });
  return response.docs as SavedType<ChildType>[];
}

export async function getAll<Type extends ModelType>(
  type: ModelStringType
): Promise<SavedType<Type>[]> {
  console.info(`ℹ️ Getting all ${type}`);
  const response = await db.allDocs({
    startkey: type,
    endkey: `${type}\ufff0`,
    include_docs: true,
  });
  const docs = response.rows.map((row) => row.doc);
  console.log({ response, docs });
  return docs as unknown as SavedType<Type>[];
}

// TODO: re-implement

export async function destroy({
  _id,
  _rev,
}: {
  _id: string;
  _rev: string;
}): Promise<void> {
  console.log("🗑 Deleting a record with: ", { _id, _rev });
  await db.remove({
    _id,
    _rev,
  });
}
