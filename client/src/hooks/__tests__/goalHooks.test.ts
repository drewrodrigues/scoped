import { IGoalTrackable, ITracking, SavedType } from "../../data/couchModel";
import { nDaysFromNow, todaysDate } from "../../helpers/date";
import {
  actualGoalProgression,
  computedGoalDates,
  shouldBeGoalProgression,
} from "../goalHooks";

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

describe("shouldBeGoalStats", () => {
  describe("when on first day of 10 day goal", () => {
    it("returns 10 `percentShouldBeComplete`", () => {
      const { percentShouldBeComplete } = shouldBeGoalProgression(tenDayGoal);
      expect(percentShouldBeComplete).toEqual(10);
    });

    it("returns 10% of goalTracking quantity for `quantityShouldBeComplete`", () => {
      const { quantityShouldBeComplete } = shouldBeGoalProgression(tenDayGoal);
      expect(quantityShouldBeComplete).toEqual(10);
    });
  });
});

describe("computedGoalDates", () => {
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

describe("actualGoalProgression", () => {
  describe("when 0 hours tracked out of 100", () => {
    it("returns 0 `percentComplete`", () => {
      const { percentComplete } = actualGoalProgression(
        {
          trackingGoalQuantity: 100,
        } as SavedType<IGoalTrackable>,
        [] as SavedType<ITracking>[]
      );
      expect(percentComplete).toEqual(0);
    });

    it("returns 0 `quantityComplete`", () => {
      const { percentComplete } = actualGoalProgression(
        {
          trackingGoalQuantity: 100,
        } as SavedType<IGoalTrackable>,
        []
      );
      expect(percentComplete).toEqual(0);
    });
  });

  describe("when 50 hours tracked out of 100", () => {
    it("returns 50 `percentComplete`", () => {
      const { percentComplete } = actualGoalProgression(
        {
          trackingGoalQuantity: 100,
        } as SavedType<IGoalTrackable>,
        [{ value: 20 }, { value: 20 }, { value: 10 }] as SavedType<ITracking>[]
      );
      expect(percentComplete).toEqual(50);
    });

    it("returns 50 `quantityComplete`", () => {
      const { percentComplete } = actualGoalProgression(
        {
          trackingGoalQuantity: 100,
        } as SavedType<IGoalTrackable>,
        [{ value: 20 }, { value: 20 }, { value: 10 }] as SavedType<ITracking>[]
      );
      expect(percentComplete).toEqual(50);
    });
  });

  describe("when 20 hours tracked out of 50", () => {
    it("returns 40 `percentComplete`", () => {
      const { percentComplete } = actualGoalProgression(
        {
          trackingGoalQuantity: 50,
        } as SavedType<IGoalTrackable>,
        [{ value: 5 }, { value: 2 }, { value: 13 }] as SavedType<ITracking>[]
      );
      expect(percentComplete).toEqual(40);
    });

    it("returns 20 `quantityComplete`", () => {
      const { quantityComplete } = actualGoalProgression(
        {
          trackingGoalQuantity: 50,
        } as SavedType<IGoalTrackable>,
        [{ value: 5 }, { value: 2 }, { value: 13 }] as SavedType<ITracking>[]
      );
      expect(quantityComplete).toEqual(20);
    });
  });
});
