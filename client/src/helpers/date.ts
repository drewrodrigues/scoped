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
