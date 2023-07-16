const GROUP_LENGTH = 2;

export function formatUserNumber(number: string) {
  const count = number.length / GROUP_LENGTH;
  for (let index = 1; index < count; index++) {
    const insertPosition = (index * GROUP_LENGTH) + index - 1;
    number = number.slice(0, insertPosition) + "-" + number.slice(insertPosition);
  }

  return number;
}
