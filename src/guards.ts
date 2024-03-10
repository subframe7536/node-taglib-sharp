export class Guards {
    private static readonly MAX_LONG = BigInt("9223372036854775807");
    private static readonly MAX_ULONG = BigInt("18446744073709551615");
    private static readonly MIN_LONG = BigInt("-9223372036854775808");

    public static all<TElement>(value: TElement[], guard: (val: TElement, name: string) => void, name: string): void {
        for (const element of value) {
            guard(element, `All elements in ${name}`);
        }
    }

    public static betweenExclusive(value: number, minValue: number, maxValue: number, name: string): void {
        if (value <= minValue || value >= maxValue) {
            throw new Error(`Argument out of range: ${name} must satisfy ${maxValue} <= ${name} <= ${minValue}`);
        }
    }

    public static betweenInclusive(value: number, minValue: number, maxValue: number, name: string): void {
        if (value < minValue || value > maxValue) {
            throw new Error(`Argument out of range: ${name} must satisfy ${maxValue} < ${name} < ${minValue}`);
        }
    }

    public static byte(value: number, name: string): void {
        if (!Number.isSafeInteger(value) || value < 0 || value > 0xFF) {
            throw new Error(`Argument out of range: ${name} must be a safe, positive, 8-bit integer`);
        }
    }

    public static greaterThanInclusive(value: number, lowerBound: number, name: string): void {
        if (value < lowerBound) {
            throw new Error(`Argument out of range: ${name} must greater than ${lowerBound}`);
        }
    }

    public static equals(value: number, expectedValue: number, name: string): void {
        if (value !== expectedValue) {
            throw new Error(`Argument out of range: ${name} must equal ${expectedValue}`);
        }
    }

    public static int(value: number, name: string): void {
        if (!Number.isInteger(value) || value < -2147483648 || value > 2147483647) {
            throw new Error(`Argument out of range: ${name} must be a 32-bit integer`);
        }
    }

    public static lessThanInclusive(value: number, upperBound: number, name: string): void {
        if (value > upperBound) {
            throw new Error(`Argument out of range: ${name} must be less than ${upperBound}`);
        }
    }

    public static long(value: bigint, name: string): void {
        if (value > Guards.MAX_LONG || value < Guards.MIN_LONG) {
            throw new Error(`Argument out of range: ${name} must be a 64-bit integer`);
        }
    }

    public static notNullOrUndefined(value: unknown, name: string): void {
        if (value === undefined || value === null) {
            throw new Error(`Argument null: ${name} was not provided`);
        }
    }

    public static optionalByte(value: number | undefined, name: string): void {
        if (value === undefined) {
            return;
        }
        Guards.byte(value, name);
    }

    /**
     * Throws if the provided value is not a safe, integer. Use this method instead of
     * {@link Guards.int()} if validating an argument for use in file manipulation.
     * @param value Value to validate
     * @param name Name of the parameter in calling function
     */
    public static safeInt(value: number, name: string): void {
        if (!Number.isSafeInteger(value)) {
            throw new Error(`Argument out of range: ${name} must be a safe JS integer`);
        }
    }

    /**
     * Throws if the provided value is not a safe, positive integer. Use this method instead of
     * {@link Guards.uint()} if validating an argument for use in file manipulation.
     * @param value Value to validate
     * @param name Name of the parameter in calling function
     */
    public static safeUint(value: number, name: string): void {
        if (!Number.isSafeInteger(value) || value < 0) {
            throw new Error(`Argument out of range ${name} must be a safe, positive JS integer`);
        }
    }

    public static short(value: number, name: string): void {
        if (!Number.isSafeInteger(value) || value > 32767 || value < -32768) {
            throw new Error(`Argument out of range: ${name} must be a 16-bit integer`);
        }
    }

    public static truthy(value: object|string, name: string): void {
        if (!value) {
            throw new Error(`Argument null: ${name} was not provided`);
        }
    }

    public static uint(value: number, name: string): void {
        if (!Number.isSafeInteger(value) || value > 4294967295 || value < 0) {
            throw new Error(`Argument out of range: ${name} must be a positive, 32-bit integer`);
        }
    }

    public static ushort(value: number, name: string): void {
        if (!Number.isSafeInteger(value) || value > 65535 || value < 0) {
            throw new Error(`Argument out of range: ${name} must be a positive, 16-bit integer`);
        }
    }

    public static ulong(value: bigint, name: string): void {
        if (value > this.MAX_ULONG || value < 0) {
            throw new Error(`Argument out of range: ${name} must be a positive, 64-bit integer`);
        }
    }
}
