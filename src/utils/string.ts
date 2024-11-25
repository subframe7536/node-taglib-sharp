import { notNullOrUndefined } from './guards';

export function caseInsensitive(a: string, b: string): boolean {
  notNullOrUndefined(a, "a");
  notNullOrUndefined(b, "b");
  return a.toUpperCase() === b.toUpperCase();
}

export function caseSensitive(a: string, b: string): boolean {
  return a === b;
}

const BCP47_REGEX = /^[a-z]{2,3}(-[a-z]{2,8})*$/i;
const ISO369_2_REGEX = /^[a-z]{2,3}([-\/][a-z]{2,3})?$/i;

export function findLastByteFromRight(haystack: string, needle: number): number {
  let length = haystack.length;
  while (length > 0 && haystack.charCodeAt(length - 1) === needle) {
    length--;
  }
  return length;
}

export function isBcp47(value: string): boolean {
  return BCP47_REGEX.test(value);
}

export function isIso3692(value: string): boolean {
  return ISO369_2_REGEX.test(value);
}

export function trimStart(toTrim: string, chars: string): string {
  while (toTrim.length > 0 && chars.indexOf(toTrim[0]) > -1) {
    toTrim = toTrim.substring(0);
  }
  return toTrim;
}

