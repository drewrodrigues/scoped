import { IGoalTrackable, ITracking, SavedType } from "../../data/couchModel";
import { nDaysFromNow, todaysDate } from "../../helpers/date";
import { computedGoalDates, shouldBeGoalStats } from "../goalHooks";

const sameDayGoal = {
  startDate: todaysDate().toUTCString(),
  dueDate: todaysDate().toUTCString(), // because today counts as 1 day
  trackingMethod: "hours",
  trackingGoalQuantity: 100,
} as SavedType<IGoalTrackable>;

const oneWeekGoal = {
  startDate: todaysDate().toUTCString(),
  // one week goal is actually 8 days
  dueDate: nDaysFromNow(7).toUTCString(),
  trackingMethod: "hours",
  trackingGoalQuantity: 100,
} as SavedType<IGoalTrackable>;

const tenDayGoal = {
  startDate: todaysDate().toUTCString(),
  dueDate: nDaysFromNow(9).toUTCString(), // because today counts as 1 day
  trackingMethod: "hours",
  trackingGoalQuantity: 100,
} as SavedType<IGoalTrackable>;

const emptyTracking: SavedType<ITracking>[] = [];

describe.only("shouldBeGoalStats", () => {
  describe("when on first day of 10 day goal", () => {
    it("returns 10 `percentShouldBeComplete`", () => {
      const { percentShouldBeComplete } = shouldBeGoalStats(tenDayGoal);
      expect(percentShouldBeComplete).toEqual(10);
    });

    it("returns 10% of goalTracking quantity for `quantityShouldBeComplete`", () => {
      const { quantityShouldBeComplete } = shouldBeGoalStats(tenDayGoal);
      expect(quantityShouldBeComplete).toEqual(10);
    });
  });
});

describe.only("computedGoalDates", () => {
  it("returns 0 `totalDaysForGoal` when same day goal", () => {
    const { totalDaysForGoal } = computedGoalDates(sameDayGoal);
    expect(totalDaysForGoal).toEqual(1);
  });

  it("returns 10 `totalDaysForGoal` when 10 day goal", () => {
    const { totalDaysForGoal } = computedGoalDates(tenDayGoal);
    expect(totalDaysForGoal).toEqual(10);
  });

  it("returns 0 `daysLeftUntilDue` when today is due date", () => {
    const { daysLeftUntilDue } = computedGoalDates(sameDayGoal);
    expect(daysLeftUntilDue).toEqual(0);
  });

  it("returns 6 `daysLeftUntilDue` when due date is 7 days from now", () => {
    const { daysLeftUntilDue } = computedGoalDates(oneWeekGoal);
    expect(daysLeftUntilDue).toEqual(6);
  });

  it("returns 1 `wholeDaysLeft` on last day of goal", () => {
    const { wholeDaysLeft } = computedGoalDates(sameDayGoal);
    expect(wholeDaysLeft).toEqual(1);
  });

  it("returns 7 `wholeDaysLeft` on first day of 7 day goal", () => {
    const { wholeDaysLeft } = computedGoalDates(oneWeekGoal);
    expect(wholeDaysLeft).toEqual(7);
  });

  it("returns 1 `daysIntoGoal` when on first day", () => {
    const { daysIntoGoal } = computedGoalDates(oneWeekGoal);
    expect(daysIntoGoal).toEqual(1);
  });
});

describe("useGoalStats", () => {
  describe("when current date on start date", () => {
    describe("and start & due date set to same date", () => {
      it.todo("returns 1 totalDaysForGoal");
      it.todo("returns 0 daysLeft");
    });

    describe("and due date 1 day after start date", () => {
      it.todo("returns 1 totalDaysForGoal");
      it.todo("returns 1 day left");
      it.todo("returns 50% percentShouldBeComplete");
    });

    describe("and due date 1 month (31d) after start date", () => {
      it.todo("returns 32 totalDaysForGoal");
      it.todo("returns 31 daysLeft");
    });
  });

  describe("when current date on due date", () => {
    it.todo("returns 1 totalDaysForGoal");
    it.todo("returns 0 daysLeft");
    it.todo("returns 100% percentShouldBeComplete");
  });

  describe("when current date 1 day after due date", () => {
    it.todo("returns 1 totalDaysForGoal");
    it.todo("returns -1 daysLeft");
    it.todo("returns 100% percentShouldBeComplete");
  });
});
