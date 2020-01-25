import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import {slow, suite, test, timeout} from "mocha-typescript";

import FrameConstructorTests from "./frameConstructorTests";
import FrameTypes from "../../src/id3v2/frameTypes";
import TestConstants from "../testConstants";
import {ByteVector, StringType} from "../../src/byteVector";
import {Frame, FrameClassType} from "../../src/id3v2/frames/frame";
import {Id3v2FrameFlags, Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {UserUrlLinkFrame} from "../../src/id3v2/frames/urlLinkFrame";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

const getTestFrameData = (): ByteVector => {
    const header = new Id3v2FrameHeader(FrameTypes.WXXX, 4);
    header.frameSize = 7;

    return ByteVector.concatenate(
        header.render(4),
        ByteVector.fromString("foo", StringType.Latin1, undefined, true),
        ByteVector.getTextDelimiter(StringType.Latin1),
        ByteVector.fromString("bar", StringType.Latin1, undefined, true)
    );
};

const getTestUserUrlLinkFrame = (): UserUrlLinkFrame => {
    const frameData = getTestFrameData();
    return UserUrlLinkFrame.fromRawData(frameData, 4);
};

@suite(timeout(3000), slow(1000))
class UserUrlLinkFrameConstructorTests extends FrameConstructorTests {
    public get fromOffsetRawData(): (d: ByteVector, o: number, h: Id3v2FrameHeader) => Frame {
        return UserUrlLinkFrame.fromOffsetRawData;
    }

    public get fromRawData(): (d: ByteVector, v: number) => Frame {
        return UserUrlLinkFrame.fromRawData;
    }

    @test
    public fromOffsetRawData_userFrame() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.WXXX, 4);
        header.frameSize = TestConstants.syncedUint;

        // Offset bytes
        // Header
        // Data (2x strings w/divider)
        const data = ByteVector.concatenate(
            0x00, 0x00,
            header.render(4),
            ByteVector.fromString("foo", StringType.Latin1, undefined, true),
            ByteVector.getTextDelimiter(StringType.Latin1),
            ByteVector.fromString("bar", StringType.Latin1, undefined, true)
        );

        // Act
        const output = UserUrlLinkFrame.fromOffsetRawData(data, 2, header);

        // Assert
        assert.ok(output);
        assert.equal(output.frameClassType, FrameClassType.UserUrlLinkFrame);

        assert.equal(output.encryptionId, -1);
        assert.equal(output.flags, Id3v2FrameFlags.None);
        assert.isTrue(ByteVector.equal(output.frameId, FrameTypes.WXXX));
        assert.equal(output.groupId, -1);
        assert.equal(output.size, TestConstants.syncedUint);

        assert.strictEqual(output.description, "foo");
        assert.deepEqual(output.text, ["bar"]);
        assert.equal(output.textEncoding, StringType.Latin1);
    }

    @test
    public fromRawData_userFrame() {
        // Arrange
        const data = ByteVector.concatenate(
            FrameTypes.WXXX,                                                    // - Frame ID
            TestConstants.syncedUintBytes,                                      // - Frame size
            0x00, 0x00,                                                         // - Frame flags
            ByteVector.fromString("foo", StringType.Latin1, undefined, true),   // - String 1
            ByteVector.getTextDelimiter(StringType.Latin1),                     // - String separator
            ByteVector.fromString("bar", StringType.Latin1, undefined, true)    // - String 2
        );

        // Act
        const output = UserUrlLinkFrame.fromRawData(data, 4);

        // Assert
        assert.ok(output);
        assert.equal(output.frameClassType, FrameClassType.UserUrlLinkFrame);

        assert.equal(output.encryptionId, -1);
        assert.equal(output.flags, Id3v2FrameFlags.None);
        assert.isTrue(ByteVector.equal(output.frameId, FrameTypes.WXXX));
        assert.equal(output.groupId, -1);
        assert.equal(output.size, TestConstants.syncedUint);

        assert.strictEqual(output.description, "foo");
        assert.deepEqual(output.text, ["bar"]);
        assert.equal(output.textEncoding, StringType.Latin1);
    }
}

@suite(timeout(3000), slow(1000))
class UserUrlLinkFramePropertyTests {
    @test
    public getDescription_emptyText_returnsUndefined() {
        // Arrange
        const data = ByteVector.concatenate(
            FrameTypes.WXXX,            // - Frame ID
            0x00, 0x00, 0x00, 0x00,     // - Frame size
            0x00, 0x00,                 // - Frame flags
        );
        const frame = UserUrlLinkFrame.fromRawData(data, 4);

        // Act
        const result = frame.description;

        // Assert
        assert.isUndefined(result);
    }

    @test
    public setDescription_existingDescription_undefined() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        frame.description = undefined;

        // Assert
        assert.isUndefined(frame.description);
        assert.deepEqual(frame.text, ["bar"]);
    }

    @test
    public setDescription_existingDescription_null() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        frame.description = null;

        // Assert
        assert.isUndefined(frame.description);
        assert.deepEqual(frame.text, ["bar"]);
    }

    @test
    public setDescription_existingDescription_value() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        frame.description = "fux";

        // Assert
        assert.strictEqual(frame.description, "fux");
        assert.deepEqual(frame.text, ["bar"]);
    }

    @test
    public setDescription_noDescription_value() {
        // Arrange
        const data = ByteVector.concatenate(
            FrameTypes.WXXX,            // - Frame ID
            0x00, 0x00, 0x00, 0x00,     // - Frame size
            0x00, 0x00,                 // - Frame flags
        );
        const frame = UserUrlLinkFrame.fromRawData(data, 4);

        // Act
        frame.description = "fux";

        // Assert
        assert.strictEqual(frame.description, "fux");
        assert.deepEqual(frame.text, []);
    }

    @test
    public getText_outputIsClone() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        const text = frame.text;
        text.push("baz");

        // Assert
        assert.strictEqual(frame.description, "foo");
        assert.deepEqual(frame.text, ["bar"]);
    }

    @test
    public setText_undefined() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        frame.text = undefined;

        // Assert
        assert.strictEqual(frame.description, "foo");
        assert.deepEqual(frame.text, []);
    }

    @test
    public setText_null() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        frame.text = null;

        // Assert
        assert.strictEqual(frame.description, "foo");
        assert.deepEqual(frame.text, []);
    }

    @test
    public setText_values() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();
        const values = ["fux", "qux"];

        // Act
        frame.text = values;

        // Assert
        assert.strictEqual(frame.description, "foo");
        assert.deepEqual(frame.text, values);

        // -- Ensure values are cloned
        // Act 2
        values.push("bux");

        // Assert 2
        assert.strictEqual(frame.description, "foo");
        assert.deepEqual(frame.text, ["fux", "qux"]);
    }

    @test
    public setEncoding() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        frame.textEncoding = StringType.UTF8;

        // Assert
        assert.equal(frame.textEncoding, StringType.UTF8);
    }
}

@suite(timeout(3000), slow(1000))
class UserUrlLinkMethodTests {
    @test
    public findUserUrlLinkFrame_falsyFrames_throws(): void {
        // Act/Assert
        assert.throws(() => { UserUrlLinkFrame.findUserUrlLinkFrame(null, "foo"); });
        assert.throws(() => { UserUrlLinkFrame.findUserUrlLinkFrame(undefined, "foo"); });
    }

    @test
    public findUserUrlLinkFrame_falsyIdentity_throws(): void {
        // Arrange
        const frames = [getTestUserUrlLinkFrame()];

        // Act/Assert
        assert.throws(() => { UserUrlLinkFrame.findUserUrlLinkFrame(frames, null); });
        assert.throws(() => { UserUrlLinkFrame.findUserUrlLinkFrame(frames, undefined); });
    }

    @test
    public findUserUrlLinkFrame_emptyFrames_returnsUndefined() {
        // Arrange
        const frames: UserUrlLinkFrame[] = [];

        // Act
        const result = UserUrlLinkFrame.findUserUrlLinkFrame(frames, "foo");

        // Assert
        assert.isUndefined(result);
    }

    @test
    public findUserUrlLinkFrame_noMatch_returnsUndefined() {
        // Arrange
        const frames = [getTestUserUrlLinkFrame(), getTestUserUrlLinkFrame()];

        // Act
        const result = UserUrlLinkFrame.findUserUrlLinkFrame(frames, "bar");

        // Assert
        assert.isUndefined(result);
    }

    @test
    public findUserUrlLinkFrame_match_returnsFirstMatch() {
        // Arrange
        const frame1 = getTestUserUrlLinkFrame();
        const frame2 = getTestUserUrlLinkFrame();
        const frames = [frame1, frame2];

        // Act
        const result = UserUrlLinkFrame.findUserUrlLinkFrame(frames, "foo");

        // Assert
        assert.equal(result, frame1);
    }

    @test
    public clone_withRawData_returnsCloneUsingRawData() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        const result = frame.clone();

        // Assert
        assert.isOk(result);
        assert.isTrue(ByteVector.equal(result.frameId, frame.frameId));
        assert.strictEqual(result.description, frame.description);
        assert.deepEqual(result.text, frame.text);
        assert.deepEqual(result.textEncoding, frame.textEncoding);
    }

    @test
    public clone_withoutRawData_returnsClone() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();
        const text = frame.text;    // Force reading raw data, and trashing it

        // Act
        const result = frame.clone();

        // Assert
        assert.isOk(result);
        assert.isTrue(ByteVector.equal(result.frameId, frame.frameId));
        assert.strictEqual(result.description, frame.description);
        assert.deepEqual(result.text, frame.text);
        assert.strictEqual(result.textEncoding, frame.textEncoding);
    }

    @test
    public render_returnsByteVector() {
        // Arrange
        const frame = getTestUserUrlLinkFrame();

        // Act
        const result = frame.render(4);

        // Assert
        assert.isOk(result);
        assert.isTrue(ByteVector.equal(result, getTestFrameData()));
    }
}