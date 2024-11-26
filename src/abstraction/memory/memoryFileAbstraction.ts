import {ByteVector} from "../byteVector"
import type {IFileAbstraction} from "../fileAbstraction"
import type {IStream} from "../stream"
import {MemoryStream} from "./memoryStream"
import {File} from "../../file"

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

/**
 * Creates a new instance of {@link File} subclass for a buffer, MimeType, and
 * property read style.
 * @param fileName Name to the buffer to read/write.
 * @param buffer Buffer that to read/write
 * @param mimeType Optional, MimeType to use for determining the subclass of {@link File} to
 *     return. If omitted, the MimeType will be guessed based on the file's extension.
 * @param propertiesStyle Optional, level of detail to use when reading the media information
 *     from the new instance. If omitted {@link ReadStyle.Average} is used.
 * @returns New instance of {@link File} as read from the specified path.
 */
export function createFileFromBuffer(
    fileName: string,
    buffer: Uint8Array,
    mimeType?: string,
    propertiesStyle: ReadStyle = ReadStyle.Average
): File {
    return File.createFromAbstraction(new MemoryFileAbstraction(fileName, buffer), mimeType, propertiesStyle)
}
