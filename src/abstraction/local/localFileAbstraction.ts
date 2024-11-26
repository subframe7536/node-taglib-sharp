import type {IFileAbstraction} from "../fileAbstraction"
import type {IStream} from "../stream"
import {LocalStream} from "./localStream"
import {File} from "../../file"

/**
 * This class implements {@link IFileAbstraction} to provide support for accessing the local/
 * standard file.
 * This class is used as the standard file abstraction throughout the library.
 */
export class LocalFileAbstraction implements IFileAbstraction {
    /**
     * Contains the name used to open the file
     */
    private readonly _name: string;

    /**
     * Constructs and initializes a new instance from a specified path in the local file system
     * @param path Path of the file to use in the new instance
     * @throws Error Thrown if `path` is falsy
     */
    public constructor(path: string) {
        Guards.truthy(path, "path");
        this._name = path;
    }

    /** @inheritDoc */
    public get name(): string {
        return this._name;
    }

    /** @inheritDoc */
    public get size(): number {
        return LocalStream.getFileSize(this._name)
    }

    /** @inheritDoc */
    public get readStream(): IStream {
        return LocalStream.createAsRead(this._name);
    }

    /** @inheritDoc */
    public get writeStream(): IStream {
        return LocalStream.createAsReadWrite(this._name);
    }

    /** @inheritDoc */
    public closeStream(stream: IStream): void {
        Guards.truthy(stream, "stream");
        stream.close();
    }
}

/**
 * Creates a new instance of {@link File} subclass for a specified file path, MimeType, and
 * property read style.
 * @param filePath Path to the file to read/write.
 * @param mimeType Optional, MimeType to use for determining the subclass of {@link File} to
 *     return. If omitted, the MimeType will be guessed based on the file's extension.
 * @param propertiesStyle Optional, level of detail to use when reading the media information
 *     from the new instance. If omitted {@link ReadStyle.Average} is used.
 * @returns New instance of {@link File} as read from the specified path.
 */
export function createFileFromPath(
    filePath: string,
    mimeType?: string,
    propertiesStyle: ReadStyle = ReadStyle.Average
): Promise<File> {
    return File.createFromAbstraction(new LocalFileAbstraction(filePath), mimeType, propertiesStyle);
}