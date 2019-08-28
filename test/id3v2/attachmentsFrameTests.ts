import * as Chai from "chai";
import * as ChaiAsPromised from "chai-as-promised";
import * as TypeMoq from "typemoq";
import {slow, suite, test, timeout} from "mocha-typescript";

import AttachmentFrame from "../../src/id3v2/frames/attachmentFrame";
import {IPicture, PictureType} from "../../src/picture";
import TestConstants from "../testConstants";
import {FrameClassType} from "../../src/id3v2/frames/frame";
import FrameTypes from "../../src/id3v2/frameTypes";
import Id3v2TagSettings from "../../src/id3v2/id3v2TagSettings";
import {ByteVector} from "../../src/byteVector";
import {Id3v2FrameHeader} from "../../src/id3v2/frames/frameHeader";
import {IFileAbstraction} from "../../src/fileAbstraction";

// Setup chai
Chai.use(ChaiAsPromised);
const assert = Chai.assert;

// Test constants
const description = "foo";
const filename = "foo.bar";
const mimeType = "foo/bar";
const picType = PictureType.ColoredFish;

const rawHeaderBytes = [
    0x41, 0x50, 0x49, 0x43, // APIC
    0x09, 0x00, 0x00, 0x00, // 9 bytes of data
    0x00, 0x00
];
const rawHeader = ByteVector.concatenate(
    new Uint8Array(rawHeaderBytes),
    TestConstants.testByteVector
);

@suite(timeout(3000), slow(1000)) class AttachmentFrameFromFileTests {
    @test
    public falsyAbstraction() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.APIC, 3);

        // Act/Assert
        assert.throws(() => { AttachmentFrame.fromFile(undefined, 0, 10, header); });
        assert.throws(() => { AttachmentFrame.fromFile(null, 0, 10, header); });
    }

    @test
    public illegalOffset() {
        // Arrange
        const mockAbstraction = TypeMoq.Mock.ofType<IFileAbstraction>();
        const header = new Id3v2FrameHeader(FrameTypes.APIC, 3);

        // Act/Assert
        assert.throws(() => { AttachmentFrame.fromFile(mockAbstraction.object, -1, 10, header); });
        assert.throws(() => { AttachmentFrame.fromFile(mockAbstraction.object, 1.5, 10, header); });
        assert.throws(() => {
            AttachmentFrame.fromFile(mockAbstraction.object, Number.MAX_SAFE_INTEGER + 1, 10, header);
        });
    }

    @test
    public illegalSize() {
        // Arrange
        const mockAbstraction = TypeMoq.Mock.ofType<IFileAbstraction>();
        const header = new Id3v2FrameHeader(FrameTypes.APIC, 3);

        // Act/Assert
        assert.throws(() => { AttachmentFrame.fromFile(mockAbstraction.object, 0, -10, header); });
        assert.throws(() => { AttachmentFrame.fromFile(mockAbstraction.object, 0, 1.5, header); });
        assert.throws(() => {
            AttachmentFrame.fromFile(mockAbstraction.object, 0, Number.MAX_SAFE_INTEGER + 1, header);
        });
    }

    @test
    public falsyHeader() {
        // Arrange
        const mockAbstraction = TypeMoq.Mock.ofType<IFileAbstraction>();

        // Act/Assert
        assert.throws(() => { AttachmentFrame.fromFile(mockAbstraction.object, 0, 10, undefined); });
        assert.throws(() => { AttachmentFrame.fromFile(mockAbstraction.object, 0, 10, null); });
    }

    // @test
    // public validParams_readFullFile() {
    //     // Arrange
    //     const mockAbstraction = TypeMoq.Mock.ofType<IFileAbstraction>();
    //     mockAbstraction.setup((fa) => fa.readStream)
    //         .returns(() => new TestStream(testConstants.testByteVector, false));
    //     const header = new Id3v2FrameHeader(FrameTypes.APIC, 3);
    //
    //     // Act
    //     const result = AttachmentFrame.fromFile(mockAbstraction.object, 0, -1, header);
    //
    //     // Assert
    //     assert.ok(result);
    //     assert.isTrue(ByteVector.equal(result.frameId, FrameTypes.APIC));
    //
    //     assert.strictEqual(result.data, )
    // }
}

@suite(timeout(3000), slow(1000)) class AttachmentFrameOffsetRawDataTests {
    @test
    public falsyData() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.APIC, 3);

        // Act/Assert
        assert.throws(() => { AttachmentFrame.fromOffsetRawData(undefined, 0, header); });
        assert.throws(() => { AttachmentFrame.fromOffsetRawData(null, 0, header); });
    }

    @test
    public invalidOffset() {
        // Arrange
        const header = new Id3v2FrameHeader(FrameTypes.APIC, 3);

        // Act/Assert
        assert.throws(() => { AttachmentFrame.fromOffsetRawData(TestConstants.testByteVector, -1, header); });
        assert.throws(() => { AttachmentFrame.fromOffsetRawData(TestConstants.testByteVector, 1.5, header); });
        assert.throws(() => {
            AttachmentFrame.fromOffsetRawData(TestConstants.testByteVector, Number.MAX_SAFE_INTEGER + 1, header);
        });
    }

    @test
    public falsyHeader() {
        // Act/Assert
        assert.throws(() => { AttachmentFrame.fromOffsetRawData(TestConstants.testByteVector, 0, undefined); });
        assert.throws(() => { AttachmentFrame.fromOffsetRawData(TestConstants.testByteVector, 0, null); });
    }
}

@suite(timeout(3000), slow(1000)) class AttachmentFrameFromPictureTests {
    @test
    public falsyPicture() {
        // Act/Assert
        assert.throws(() => { AttachmentFrame.fromPicture(undefined); });
        assert.throws(() => { AttachmentFrame.fromPicture(null); });
    }

    @test
    public validPicture() {
        // Arrange
        const pictureMoq = TypeMoq.Mock.ofType<IPicture>();
        pictureMoq.setup((p) => p.type).returns(() => picType);
        pictureMoq.setup((p) => p.mimeType).returns(() => mimeType);
        pictureMoq.setup((p) => p.filename).returns(() => filename);
        pictureMoq.setup((p) => p.description).returns(() => description);
        pictureMoq.setup((p) => p.data).returns(() => TestConstants.testByteVector);

        // Act
        const output = AttachmentFrame.fromPicture(pictureMoq.object);

        // Assert
        assert.ok(output);
        assert.isTrue(ByteVector.equal(output.frameId, FrameTypes.APIC));

        assert.strictEqual(output.data, TestConstants.testByteVector);
        assert.strictEqual(output.description, description);
        assert.strictEqual(output.filename, filename);
        assert.strictEqual(output.frameClassType, FrameClassType.AttachmentFrame);
        assert.isTrue(output.isLoaded);
        assert.strictEqual(output.mimeType, mimeType);
        assert.strictEqual(output.textEncoding, Id3v2TagSettings.defaultEncoding);
    }
}

@suite(timeout(3000), slow(1000)) class AttachmentFrameRawDataTests {
    @test
    public falsyData() {
        // Act/Assert
        assert.throws(() => { AttachmentFrame.fromRawData(undefined, 3); });
        assert.throws(() => { AttachmentFrame.fromRawData(null, 3); });
    }

    @test
    public invalidVersion() {
        // Act/Assert
        assert.throws(() => { AttachmentFrame.fromRawData(TestConstants.testByteVector, -1); });
        assert.throws(() => { AttachmentFrame.fromRawData(TestConstants.testByteVector, 1.5); });
        assert.throws(() => { AttachmentFrame.fromRawData(TestConstants.testByteVector, 1024); });
    }

    @test
    public validParams() {
        // Act
        const frame = AttachmentFrame.fromRawData(rawHeader, 3);

        // Assert
        assert.ok(frame);
        assert.isTrue(ByteVector.equal(frame.frameId, FrameTypes.APIC));

        assert.isTrue(ByteVector.equal(frame.data, TestConstants.testByteVector));
    }
}
