import {ByteVector} from "../../byteVector"
import type {IFileAbstraction} from "../../fileAbstraction"
import type {IStream} from "../../stream"
import {MemoryStream} from "./memoryStream"

export class MemoryFileAbstraction implements IFileAbstraction {
    private readonly _fileName: string
    private readonly _buffer: ByteVector
    /**
     * create fileAbstraction from ArrayBuffer
     * @param fileName name of the file, need extension
     * @param buffer audio file buffer
     */
    public constructor(
        fileName: string,
        buffer: Uint8Array | number[],
    ) {
        this._fileName = fileName
        this._buffer = ByteVector.fromByteArray(buffer)
    }

    /** @inheritDoc */
    public get name(): string {
        return this._fileName
    }

    /** @inheritDoc */
    public get readStream(): IStream {
        return new MemoryStream(this._buffer, false)
    }

    /** @inheritDoc */
    public get writeStream(): IStream {
        return new MemoryStream(this._buffer, true)
    }

    /** @inheritDoc */
    public get size(): number {
        return this._buffer.length
    }

    /**
     * get current instance buffer
     */
    public get currentBuffer(): Uint8Array {
        return this._buffer.toByteArray()
    }

    /** @inheritDoc */
    public closeStream(stream: IStream): void {
        stream.close()
    }

}
