import type {ByteVector} from "./byteVector";

/**
 * Indicates there the seek operation should begin.
 */
export enum SeekOrigin {
    /**
     * Seek should begin at the start of the file.
     */
    Begin,

    /**
     * Seek should begin at the current position in the file.
     */
    Current,

    /**
     * Seek should begin at the end of the file.
     */
    End
}

/**
 * Interface for a stream, it wraps around a file descriptor to make reading and writing to files
 * using node IO a lot easier.
 */
export interface IStream {
    /**
     * Whether or not the stream can be written to
     */
    readonly canWrite: boolean;

    /**
     * Number of bytes currently stored in file this stream connects to
     */
    readonly length: number;

    /**
     * Position within the stream
     */
    position: number;

    /**
     * Closes the stream
     */
    close(): void;

    /**
     * Reads a block of bytes from the current stream and writes the data to a buffer.
     * @param buffer When this method returns, contains the specified byte array with the values
     *     between `offset` and (`offset` + `length` - 1) replaced by
     *     the characters read from the current stream
     * @param offset Zero-based byte offset in `buffer` at which to begin storing data
     *     from the current stream
     * @param length The maximum number of bytes to read
     * @returns
     *     Total number of bytes written to the buffer. This can be less than the
     *     number of bytes requested if that number of bytes are not currently available or zero if
     *     the end of the stream is reached before any bytes are read
     */
    read(buffer: Uint8Array, offset: number, length: number): number;

    /**
     * Sets the position within the current stream to the specified value.
     * @param offset New position within the stream. this is relative to the `origin`
     *     parameter and can be positive or negative
     * @param origin Seek reference point {@link SeekOrigin}
     */
    seek(offset: number, origin: SeekOrigin): void;

    /**
     * Sets the length of the current current stream to the specified value.
     * @param length Number of bytes to set the length of the stream to
     */
    setLength(length: number): void;

    /**
     * Writes a block of bytes to the current stream using data read from a buffer.
     * @param buffer Buffer to write data from
     * @param bufferOffset Zero-based byte offset in `buffer` at which to begin copying
     *    bytes to the current stream
     * @param length Maximum number of bytes to write
     */
    write(buffer: Uint8Array | ByteVector, bufferOffset: number, length: number): number;
}
