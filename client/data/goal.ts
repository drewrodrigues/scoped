import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import db from "./db";
import { Scope } from "./scope";

const GOAL_KEY = "GOAL";

export interface Goal {
  _id: string;
  title: string;
  photoContainerId?: string;
  photoId?: string;
  _rev?: string;
}

export async function createGoal(scope: Scope, title: string) {
  try {
    const goal: Goal = {
      _id: `${scope._id}__${GOAL_KEY}-${Date.now().toString()}`,
      title,
    };
    console.info("⏳ Creating goal", { goal });

    const createResponse = await db.put(goal);
    const createdGoal = {
      ...goal,
      _rev: createResponse.rev,
      _id: createResponse.id,
    };
    console.info("✅ Goal created", { createResponse, createdGoal });

    // const updatedScope = addGoalToScope(createdGoal, scope);

    // return updatedScope;
  } catch (error) {
    console.error({ error }, "🚨 Create goal failed");
    throw error;
  }
}

export function useGoalsInSelectedScope() {
  const { scopeRecords, selectedScopeId } = useSelector(
    (state: RootState) => state.scope
  );
  // return scopeRecords[selectedScopeId]?.goals;
}

export async function getGoals(selectedScope: Scope) {
  // try {
  //   console.info("getGoals()");
  //   db.rel.find("goal", {});
  //   const { goals } = await db.rel.findHasMany(
  //     "goal",
  //     "scope",
  //     selectedScope.id
  //   );
  //   console.info("getGoals():", goals);
  //   return goals as Goal[];
  // } catch (e) {
  //   console.error("getGoals() Failed: ", e);
  //   throw e;
  // }
}
