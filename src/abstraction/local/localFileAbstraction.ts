import type {IFileAbstraction} from "../../fileAbstraction"
import type {IStream} from "../../stream"
import {LocalStream} from "./localStream"
import * as Guards from "../../utils/guards"

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
