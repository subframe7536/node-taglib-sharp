import Mpeg4Box from "./mpeg4Box";
import Mpeg4BoxHeader from "../mpeg4BoxHeader";
import {ByteVector} from "../../byteVector";
import {File} from "../../file";
import * as NumberUtils from "../../utils/number"
import * as Guards from "../../utils/guards";

/**
 * This class extends {@link Mpeg4Box} to provide an implementation of a ISO/IEC 14496-12 FullBox.
 */
export default abstract class FullBox extends Mpeg4Box {
    private _version: number;
    private _flags: number;

    // #region Constructors

    /**
     * Protected constructor to force construction via static functions.
     */
    protected constructor() {
        super();
    }

    /**
     * Initializes a new instance of {@link FullBox} with a provided header and handler
     * by reading the contents from a specified file.
     * @param header A {@link Mpeg4BoxHeader} object containing the header to use for the new instance.
     * @param file A {@link File} object to read the contents of the box from.
     * @param handlerType Type of the handler box object containing the handler that applies to the
     *     new instance, or undefined if no handler applies.
     */
    protected initializeFromHeaderFileAndHandler(header: Mpeg4BoxHeader, file: File, handlerType: ByteVector): void {
        Guards.truthy(header, "header");
        Guards.truthy(file, "file");

        this.initializeFromHeader(header, handlerType);
        const dataPositionBeforeIncrease = this.increaseDataPosition(4);

        file.seek(dataPositionBeforeIncrease);
        const headerData = file.readBlock(4);

        this._version = headerData.get(0);
        this._flags = headerData.subarray(1, 3).toUint();
    }

    /**
     * Initializes a new instance of {@link FullBox} with a provided header, version, and flags.
     * @param type A {@link ByteVector} object containing the four byte box type.
     * @param version A value containing the version of the new instance.
     * @param flags A value containing the flags for the new instance.
     */
    protected initializeFromTypeVersionAndFlags(type: ByteVector, version: number, flags: number): void {
        Guards.byte(version, "version");
        Guards.byte(flags, "flags");

        this.initializeFromHeader(Mpeg4BoxHeader.fromType(type));
        this.increaseDataPosition(4);

        this._version = version;
        this._flags = flags;
    }

    // #endregion

    /**
     * Gets the flags that apply to the current instance.
     */
    public get flags(): number { return this._flags; }
    /**
     * Sets the flags that apply to the current instance.
     * @protected
     */
    protected set flags(value: number) { this._flags = value; }

    /**
     * Gets the version number of the current instance.
     */
    public get version(): number { return this._version; }

    /**
     * @inheritDoc
     * @internal
     */
    public renderBoxHeaders(): ByteVector[] {
        // Generate |<ver>|<    |flags|    >|
        const flagsWithVersion = NumberUtils.uintOr(
            this.flags,
            NumberUtils.uintLShift(this.version, 24)
        );
        return [ByteVector.fromUint(flagsWithVersion)];
    }
}