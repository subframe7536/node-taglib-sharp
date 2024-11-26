import * as fs from "fs";
import type {IStream} from "../stream";

/**
 * Wrapper around the Node.js internal file descriptors to mock behavior like .NET Streams
 */
export class LocalStream implements IStream {
    private readonly _canWrite: boolean;
    private readonly _fd: number;
    private _length: number;
    private _position: number;

    // #region Constructors

    private constructor(fd: number, canWrite: boolean) {
        this._canWrite = canWrite;
        this._fd = fd;
        this._position = 0;
        this._length = fs.fstatSync(fd).size;
    }

    public static createAsRead(path: string): LocalStream {
        const fd = fs.openSync(path, "r");
        return new LocalStream(fd, false);
    }

    public static createAsReadWrite(path: string): LocalStream {
        const fd = fs.openSync(path, "r+");
        return new LocalStream(fd, true);
    }

    public static getFileSize(path: string): number {
        return fs.statSync(path).size
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get canWrite(): boolean { return this._canWrite; }

    /** @inheritDoc */
    public get length(): number { return this._length; }

    /** @inheritDoc */
    public get position(): number { return this._position; }
    /** @inheritDoc */
    public set position(position: number) {
        Guards.safeUint(position, "position");
        this._position = position;
    }

    // #endregion

    // #region Public Methods

    /** @inheritDoc */
    public close(): void {
        fs.closeSync(this._fd);
    }

    /** @inheritDoc */
    public read(buffer: Uint8Array, bufferOffset: number, length: number): number {
        const bytes = fs.readSync(this._fd, buffer, bufferOffset, length, this._position);
        this._position += bytes;
        return bytes;
    }

    /** @inheritDoc */
    public seek(offset: number, origin: SeekOrigin): void {
        Guards.safeInt(offset, "offset");
        switch (origin) {
            case SeekOrigin.Begin:
                this.position = offset;
                break;
            case SeekOrigin.Current:
                this.position = this.position + offset;
                break;
            case SeekOrigin.End:
                this.position = this.length + offset;
                break;
        }
    }

    /** @inheritDoc */
    public setLength(length: number): void {
        Guards.safeUint(length, "length");
        if (!this._canWrite) {
            throw new Error("Invalid operation: this stream is a read-only stream");
        }

        if (length === this._length) {
            return;
        }

        fs.ftruncateSync(this._fd, length);
        this._length = length;
        if (this._position > this._length) {
            this._position = this._length;
        }
    }

    /** @inheritDoc */
    public write(buffer: Uint8Array | ByteVector, bufferOffset: number, length: number): number {
        // Make sure we standardize on a Uint8Array
        if (buffer instanceof ByteVector) {
            buffer = buffer.toByteArray();
        }

        if (!this._canWrite) {
            throw new Error("Invalid operation: this stream is a read-only stream");
        }
        const origLength = this._length;

        const bytes = fs.writeSync(this._fd, buffer, bufferOffset, length, this._position);
        this._position += bytes;

        // If we wrote past the old end of the file, then the file has increased in size
        if (this._position > origLength) {
            this._length = this._position;
        }
        return bytes;
    }

    // #endregion
}
