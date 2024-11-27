import {Picture, PictureLazy} from "../../picture"
import {File, ReadStyle} from "../../file"
import {MemoryFileAbstraction} from "./memoryFileAbstraction"

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


/**
 * Constructs and initializes a new instance from a buffer. The type
 * and description of the picture are determined by the extension of the file. The file is
 * loaded completely.
 * @param fileName File name to the file to use for the file
 * @param buffer File buffer
 */
export function createPicturefromBuffer(fileName: string, buffer: Uint8Array): Picture {
  return Picture.fromFileAbstraction(new MemoryFileAbstraction(fileName, buffer))
}


/**
 * Constructs a new instance that will be lazily loaded from the filePath provided.
 * @param fileName Path to the file to read
 * @param buffer Buffer to read
 */
export function createLazyPicturefromBuffer(fileName: string, buffer: Uint8Array): PictureLazy {
  return PictureLazy.fromFile(new MemoryFileAbstraction(fileName, buffer), 0);
}
