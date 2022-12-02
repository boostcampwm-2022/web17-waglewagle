function deepFreeze<T extends object>(data: T): T {
  Object.freeze(data);

  Object.values(data).forEach((value) => {
    if (value === 'object') {
      Object.freeze(value);
      deepFreeze(value);
    }
  });

  return data;
}

export { deepFreeze };
const a: Iterable<number> = [1, 2, 3];
