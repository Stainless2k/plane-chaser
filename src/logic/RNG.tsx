export function getRandomNumber(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function takeRandom<T>(array: T[]): [T, T[]] {
  const index = getRandomNumber(0, array.length - 1);
  const take = array[index] as T;

  if (index === 0) return [take, array.slice(1)];
  if (index === array.length - 1) return [take, array.slice(0, -1)];

  const restDeck = array.slice(0, index).concat(array.slice(index + 1));

  return [take, restDeck];
}
