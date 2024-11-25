import type { ByteVector } from '../byteVector';
import * as Guards from './guards';

export const BIG_ZERO = BigInt(0);
export const BIG_ONE = BigInt(1);
export const BIG_TWO = BigInt(2);
export const BIG_ONE_THOUSAND = BigInt(1000);
export const TICKS_PER_MILLISECOND_BIG = BigInt(10000);
export const TICKS_PER_MILLISECOND_NUM = 10000;
export const MAX_UINT = 4294967295;

export function bigPow(x: bigint, y: number): bigint {
  Guards.uint(y, "y");
  // @TODO: Consider upgrading target to es2016 to get the ** syntax
  let result = BigInt(1);
  for (let i = 0; i < y; i++) {
    result *= x;
  }

  return result;
}

export function hasFlag(haystack: number, needle: number, strict: boolean = false): boolean {
  return strict
    ? (haystack & needle) === needle
    : (haystack & needle) !== 0;
}

/**
 * Performs the same operation as ldexp does in C/C++
 * @param x Number to be multiplied by 2^y
 * @param y Power to raise 2 to
 * @returns Number x * 2^y
 */
export function ldexp(x: number, y: number): number {
  return x * Math.pow(2, y);
}

/**
 * Converts .NET DateTime ticks (100 nanosecond units) into milliseconds
 * @param ticks 100 nanosecond ticks to convert
 */
export function ticksToMilli(ticks: bigint | number): number {
  // Ticks are 100 nanosecond units
  return typeof ticks === "number"
    ? ticks / TICKS_PER_MILLISECOND_NUM
    : Number(ticks / TICKS_PER_MILLISECOND_BIG);
}

/**
 * Provides way to do unsigned bitwise AND without all the mess of parenthesis.
 * @param x Left operand
 * @param y Right operand
 * @returns Number (x & y) >>> 0
 */
export function uintAnd(x: number, y: number): number {
  return (x & y) >>> 0;
}

/**
 * Provides way to do unsigned bitwise OR without all the mess of parenthesis.
 * @param numbers Operands to bitwise or together
 * @returns Number (x | y | ...) >>> 0
 */
export function uintOr(...numbers: number[]): number {
  return numbers.reduce((acc, cur) => (acc | cur) >>> 0, 0);
}

/**
 * Provides way to do unsigned bitwise XOR without all the mess of parenthesis.
 * @param x Left operand
 * @param y Right operant
 * @returns Number (x ^ y) >>> 0
 */
export function uintXor(x: number, y: number): number {
  return (x ^ y) >>> 0;
}

/**
 * Provides way to do unsigned bitshift left without all the mess of parenthesis.
 * @param x Number
 * @param y Bits to shift to the left
 * @returns Number (x << y) >>> 0;
 */
export function uintLShift(x: number, y: number): number {
  return (x << y) >>> 0;
}

/**
 * Provides unified way to do unsigned right bitshift.
 * @param x Number
 * @param y Bits to shift to the right
 */
export function uintRShift(x: number, y: number): number {
  return x >>> y;
}

/**
 * Converts IEEE 80-bit floating point numbers (SANE "extended" type) to double precision
 * floating point number.
 * @source http://www33146ue.sakura.ne.jp/staff/iz/formats/ieee.c
 */
export function convertFromIeeeExtended(bytes: ByteVector): number {
  let f: number;

  let exponent = uintLShift(uintAnd(bytes.get(0), 0x7F), 8);
  exponent = uintOr(exponent, bytes.get(1));

  let hiMantissa = uintLShift(bytes.get(2), 24);
  hiMantissa = uintOr(hiMantissa, uintLShift(bytes.get(3), 16));
  hiMantissa = uintOr(hiMantissa, uintLShift(bytes.get(4), 8));
  hiMantissa = uintOr(hiMantissa, bytes.get(5));
  let loMantissa = uintLShift(bytes.get(6), 24);
  loMantissa = uintOr(loMantissa, uintLShift(bytes.get(7), 16));
  loMantissa = uintOr(loMantissa, uintLShift(bytes.get(8), 8));
  loMantissa = uintOr(loMantissa, bytes.get(9));

  if (exponent === 0 && hiMantissa === 0 && loMantissa === 0) {
    return 0;
  }

  if (exponent === 0x7FFF) {
    f = Number.POSITIVE_INFINITY;
  } else {
    exponent -= 16383;
    f = ldexp(hiMantissa, exponent -= 31);
    f += ldexp(loMantissa, exponent - 32);
  }

  if ((bytes.get(0) & 0x80) !== 0) {
    return -f;
  } else {
    return f;
  }
}
