export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getMatchedLength(arr1: string[], arr2: string[]): number {
  const minLength = Math.min(arr1.length, arr2.length);
  let matchedCount = 0;
  while (
    matchedCount < minLength &&
    arr1[matchedCount] === arr2[matchedCount]
  ) {
    matchedCount++;
  }
  return matchedCount;
}
