import type {IStream} from "./stream";
/**
 * This interface provides abstracted access to a file. It permits access to non-standard file
 * systems and data retrieval methods.
 */
export interface IFileAbstraction {
    /**
     * Name or identifier used by the implementation
     * @remarks
     *     This value would typically represent a path or URL to be used when identifying
     *     the file system, but it could be any valid as appropriate for the implementation.
     */
    name: string;

    /**
     * Total size of file
     */
    size: number;

    /**
     * Readable, seekable stream for the file referenced by the current instance.
     * @remarks
     *     This property is typically used when constructing an instance of {@link File}.
     *     Upon completion of the constructor {@link closeStream} will be called to close the stream.
     *     If the stream is to be reused after this point, {@link closeStream} should be implemented
     *     in a way to keep it open.
     */
    readStream: IStream;

    /**
     * Writable, seekable stream for the file referenced by the current instance.
     * @remarks
     *     This property is typically used when saving a file with {@link File.save}. Upon
     *     completion of the method, {@link closeStream} will be called to close the stream. If the
     *     stream is to be reused after this point, {@link closeStream} should be implemented in a way
     *     to keep it open
     */
    writeStream: IStream;

    /**
     * Closes a stream created by the current instance.
     * @param stream Stream created by the current instance.
     */
    closeStream(stream: IStream): void;
}
