const GROUP_LENGTH = 2;

export function maskUserNumber(number: string) {
  const count = number.length / GROUP_LENGTH;
  for (let index = 1; index < count; index++) {
    const insertPosition = index * GROUP_LENGTH + index - 1;
    number = number.slice(0, insertPosition) + "-" + number.slice(insertPosition);
  }

  return number;
}

export function unmaskUserNumber(number: string) {
  const result = number.replaceAll("-", "").replaceAll("_", "");

  if (result.length) {
    return result;
  }

  return undefined;
}
