import moment from "moment";

export function yesterdaysDate(): Date {
  return nDaysFromNow(-1);
}

export function todaysDate(): Date {
  return new Date();
}

export function nDaysFromNow(n: number): Date {
  const date = new Date();
  const yesterday = date.setDate(date.getDate() + n);
  return new Date(yesterday);
}

export function formDateToday(): string {
  return moment(todaysDate()).format("YYYY-MM-DD");
}

export function formDateYesterday(): string {
  return moment(yesterdaysDate()).format("YYYY-MM-DD");
}

export function formDateTomorrow(): string {
  return moment(nDaysFromNow(1)).format("YYYY-MM-DD");
}
