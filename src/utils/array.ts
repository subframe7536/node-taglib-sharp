export function remove<T>(array: T[], callbackFn: (e: T, i: number) => boolean): void {
  let i = array.length;
  while (i--) {
    if (callbackFn(array[i], i)) {
      array.splice(i, 1);
    }
  }
}

export function isFalsyOrEmpty(array: unknown[]): boolean {
  return !array || array.length === 0;
}

export function safePush<T extends object>(array: T[], element: T): void {
  if (element) {
    array.push(element);
  }
}

export function safePushRange<T extends object>(array: T[], elements: T[]): void {
  if (elements) {
    for (const element of elements) {
      safePush(array, element);
    }
  }
}

