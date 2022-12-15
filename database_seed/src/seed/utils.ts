export function makeIterator<T>(iter: Iterable<T>): Generator<T, never, T> {
  const generator = (function* () {
    while (true) {
      for (const element of iter) {
        yield element;
      }
    }
  })();

  return generator;
}
export function makeRandomIterator<T>(iter: Iterable<T>): Generator<T, never, T> {
  const generator = (function* () {
    while (true) {
      for (const element of iter) {
        yield element;
      }
    }
  })();

  return generator;
}
export function makeShuffleIterator<T>(arr: Array<T>): Generator<T, never, T> {
  const array = arr.map((val) => val).sort(() => Math.random() - 0.5);
  const generator = (function* () {
    while (true) {
      for (const element of array) {
        yield element;
      }
      array.sort(() => Math.random() - 0.5);
    }
  })();

  return generator;
}

export function makeNumbers(counts: number): number[] {
  const numbers = [];
  for (let i = 1; i <= counts; i++) {
    numbers.push(i);
  }
  return numbers;
}

export class GeneratorWrapper<T> {
  constructor(private readonly generator: Generator<T, never, T>) {}

  get value(): T {
    return this.generator.next().value;
  }
}
