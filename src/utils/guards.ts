export const MAX_LONG = BigInt("9223372036854775807")
export const MAX_ULONG = BigInt("18446744073709551615")
export const MIN_LONG = BigInt("-9223372036854775808")
export function all<TElement>(value: TElement[], guard: (val: TElement, name: string) => void, name: string): void {
  for (const element of value) {
    guard(element, `All elements in ${name}`);
  }
}
export function betweenExclusive(value: number, minValue: number, maxValue: number, name: string): void {
  if (value <= minValue || value >= maxValue) {
    throw new Error(`Argument out of range: ${name} must satisfy ${maxValue} <= ${name} <= ${minValue}`);
  }
}
export function betweenInclusive(value: number, minValue: number, maxValue: number, name: string): void {
  if (value < minValue || value > maxValue) {
    throw new Error(`Argument out of range: ${name} must satisfy ${maxValue} < ${name} < ${minValue}`);
  }
}
export function byte(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0 || value > 0xFF) {
    throw new Error(`Argument out of range: ${name} must be a safe, positive, 8-bit integer`);
  }
}
export function greaterThanInclusive(value: number, lowerBound: number, name: string): void {
  if (value < lowerBound) {
    throw new Error(`Argument out of range: ${name} must greater than ${lowerBound}`);
  }
}
export function equals(value: number, expectedValue: number, name: string): void {
  if (value !== expectedValue) {
    throw new Error(`Argument out of range: ${name} must equal ${expectedValue}`);
  }
}
export function int(value: number, name: string): void {
  if (!Number.isInteger(value) || value < -2147483648 || value > 2147483647) {
    throw new Error(`Argument out of range: ${name} must be a 32-bit integer`);
  }
}
export function lessThanInclusive(value: number, upperBound: number, name: string): void {
  if (value > upperBound) {
    throw new Error(`Argument out of range: ${name} must be less than ${upperBound}`);
  }
}
export function long(value: bigint, name: string): void {
  if (value > MAX_LONG || value < MIN_LONG) {
    throw new Error(`Argument out of range: ${name} must be a 64-bit integer`);
  }
}
export function notNullOrUndefined(value: unknown, name: string): void {
  if (value === undefined || value === null) {
    throw new Error(`Argument null: ${name} was not provided`);
  }
}
export function optionalByte(value: number | undefined, name: string): void {
  if (value === undefined) {
    return;
  }
  byte(value, name);
}

/**
* Throws if the provided value is not a safe, integer. Use this method instead of
* {@link Guards.int()} if validating an argument for use in file manipulation.
* @param value Value to validate
* @param name Name of the parameter in calling export function
*/
export function safeInt(value: number, name: string): void {
  if (!Number.isSafeInteger(value)) {
    throw new Error(`Argument out of range: ${name} must be a safe JS integer`);
  }
}

export function  /**
   * Throws if the provided value is not a safe, positive integer. Use this method instead of
   * {@link Guards.uint()} if validating an argument for use in file manipulation.
   * @param value Value to validate
   * @param name Name of the parameter in calling export function
   */
  safeUint(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`Argument out of range ${name} must be a safe, positive JS integer`);
  }
}
export function short(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value > 32767 || value < -32768) {
    throw new Error(`Argument out of range: ${name} must be a 16-bit integer`);
  }
}
export function truthy(value: object | string, name: string): void {
  if (!value) {
    throw new Error(`Argument null: ${name} was not provided`);
  }
}
export function uint(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value > 4294967295 || value < 0) {
    throw new Error(`Argument out of range: ${name} must be a positive, 32-bit integer`);
  }
}
export function ushort(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value > 65535 || value < 0) {
    throw new Error(`Argument out of range: ${name} must be a positive, 16-bit integer`);
  }
}
export function ulong(value: bigint, name: string): void {
  if (value > MAX_ULONG || value < 0) {
    throw new Error(`Argument out of range: ${name} must be a positive, 64-bit integer`);
  }
}
