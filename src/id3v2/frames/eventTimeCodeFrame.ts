import {ByteVector} from "../../byteVector";
import {Frame, FrameClassType} from "./frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "./frameHeader";
import {FrameIdentifiers} from "../frameIdentifiers";
import * as Guards from "../../utils/guards";
import {EventType, TimestampFormat} from "../utilTypes";

/**
 * Class that represents an event for usage in a {@link EventTimeCodeFrame}.
 */
export class EventTimeCode {
    private _time: number;
    private _eventType: EventType;

    /**
     * Constructs and initializes a new instance.
     * @param eventType Type of event the instance represents
     * @param time Timestamp when the event occurs
     */
    public constructor(eventType: EventType, time: number) {
        Guards.int(time, "time");
        this._eventType = eventType;
        this._time = time;
    }

    /**
     * Constructs and initializes a blank new instance of type {@link EventType.Padding} at time 0.
     */
    public static fromEmpty(): EventTimeCode {
        return new EventTimeCode(EventType.Padding, 0);
    }

    /**
     * Gets the timestamp when the event occurs. The format of the value is determined by the
     * frame that contains the timecode event.
     */
    public get time(): number { return this._time; }
    /**
     * Sets the timestamp when the event occurs. The format of the value is determined by the
     * frame that contains the timecode event.
     * @param value Timestamp when the event occurs.
     */
    public set time(value: number) {
        Guards.int(value, "value");
        this._time = value;
    }

    /**
     * Gets the type of the event the current instance represents.
     */
    public get eventType(): EventType { return this._eventType; }
    /**
     * Sets the type of the event the current instance represents.
     * @param value Type of the event
     */
    public set eventType(value: EventType) { this._eventType = value; }

    /**
     * Creates a copy of this instance
     */
    public clone(): EventTimeCode {
        return new EventTimeCode(this.eventType, this.time);
    }

    /**
     * Generates the byte representation of the event time code.
     */
    public render(): ByteVector {
        // @TODO: Do we need to store 0 time as one byte 0? It's in the docs like that
        return ByteVector.concatenate(
            this.eventType,
            ByteVector.fromInt(this.time)
        );
    }
}

/**
 * Represents an ID3v2 event time code frame, which is used to store a timestamps for events within
 * a track.
 */
export class EventTimeCodeFrame extends Frame {
    private _events: EventTimeCode[] = [];
    private _timestampFormat: TimestampFormat = TimestampFormat.Unknown;

    // #region Constructors

    private constructor(header: Id3v2FrameHeader) {
        super(header);
    }

    /**
     * Constructs and initializes a new instance without contents
     */
    public static fromEmpty(): EventTimeCodeFrame {
        const frame = new EventTimeCodeFrame(new Id3v2FrameHeader(FrameIdentifiers.ETCO));
        frame.flags = Id3v2FrameFlags.FileAlterPreservation;
        return frame;
    }

    /**
     * Constructs and initializes a timestamp format set
     * @param timestampFormat Timestamp format for the event codes stored in this frame
     */
    public static fromTimestampFormat(timestampFormat: TimestampFormat): EventTimeCodeFrame {
        const frame = new EventTimeCodeFrame(new Id3v2FrameHeader(FrameIdentifiers.ETCO));
        frame.flags = Id3v2FrameFlags.FileAlterPreservation;
        frame.timestampFormat = timestampFormat;
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified ID3v2
     * version. This method allows for offset reading from the data byte vector.
     * @param data Raw representation of the new frame
     * @param offset What offset in `data` the frame actually begins. Must be positive,
     *     safe integer
     * @param header Header of the frame found at `data` in the data
     * @param version ID3v2 version the frame was originally encoded with
     */
    public static fromOffsetRawData(
        data: ByteVector,
        offset: number,
        header: Id3v2FrameHeader,
        version: number
    ): EventTimeCodeFrame {
        Guards.truthy(data, "data");
        Guards.uint(offset, "offset");
        Guards.truthy(header, "header");
        Guards.byte(version, "version");

        const frame = new EventTimeCodeFrame(header);
        frame.setData(data, offset, false, version);
        return frame;
    }

    /**
     * Constructs and initializes a new instance by reading its raw data in a specified
     * ID3v2 version.
     * @param data Raw representation of the new frame
     * @param version ID3v2 version the raw frame is encoded with, must be a positive 8-bit integer
     */
    public static fromRawData(data: ByteVector, version: number): EventTimeCodeFrame {
        Guards.truthy(data, "data");
        Guards.byte(version, "version");

        const frame = new EventTimeCodeFrame(Id3v2FrameHeader.fromData(data, version));
        frame.setData(data, 0, true, version);
        return frame;
    }

    // #endregion

    // #region Properties

    /** @inheritDoc */
    public get frameClassType(): FrameClassType { return FrameClassType.EventTimeCodeFrame; }

    /**
     * Gets the event this frame contains. Each {@link EventTimeCode} represents a single event at a
     * certain point in time.
     */
    public get events(): EventTimeCode[] { return this._events || []; }
    /**
     * Sets the event this frame contains
     */
    public set events(value: EventTimeCode[]) { this._events = value; }

    /**
     * Gets the format of timestamps in this frame instance
     */
    public get timestampFormat(): TimestampFormat { return this._timestampFormat; }
    /**
     * Sets the format of timestamps in this frame instance
     */
    public set timestampFormat(value: TimestampFormat) { this._timestampFormat = value; }

    // #endregion

    // #region Methods

    /** @inheritDoc */
    public clone(): Frame {
        const frame = new EventTimeCodeFrame(this.header);
        frame.timestampFormat = this.timestampFormat;
        frame.events = this.events.map((i) => i.clone());
        return frame;
    }

    /** @inheritDoc */
    protected parseFields(data: ByteVector): void {
        this._events = [];
        this._timestampFormat = data.get(0);

        for (let i = 1; i < data.length; i += 5) {
            const eventType = data.get(i);

            const timestampData = ByteVector.concatenate(
                data.get(i + 1),
                data.get(i + 2),
                data.get(i + 3),
                data.get(i + 4)
            );
            const timestamp = timestampData.toInt();

            this._events.push(new EventTimeCode(eventType, timestamp));
        }
    }

    /** @inheritDoc */
    protected renderFields(): ByteVector {
        // Docs state event codes must be sorted chronologically
        const events = this.events.sort((a, b) => a.time - b.time)
            .map((e) => e.render());

        return ByteVector.concatenate(
            this.timestampFormat,
            ... events
        );
    }

    // #endregion
}
