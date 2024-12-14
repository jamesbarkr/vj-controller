export const getNormalizedRandomNumber = (
  min: number,
  max: number,
  round = false,
) => {
  if (max <= min) {
    throw new Error("Invalid inputs to getNormalizedRandomNumber");
  }

  const randVal = Math.random() * (max - min) + min;

  return round ? Math.ceil(randVal) : randVal;
};
