export function yesterdaysDate() {
  return nDaysFromNow(-1);
}

export function todaysDate() {
  return new Date();
}

export function nDaysFromNow(n: number) {
  const date = new Date();
  const yesterday = date.setDate(date.getDate() + n);
  return new Date(yesterday);
}
