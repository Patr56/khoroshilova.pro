export const getRandom = (min: number, max: number): number => Math.random() * (max - min) + min;

export const getRandomInt = (min: number, max: number): number => Math.floor(getRandom(min, max));