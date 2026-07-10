/**
 * Utilizes the Fisher-Yates algorithm to shuffle an array of options
 */
export const shuffle = (arr: string[]): string[] => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

/**
 * Returns a random string from an array of options
 */
export const randomItem = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
