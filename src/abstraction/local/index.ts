import {Picture, PictureLazy} from '../../picture';
import {File, ReadStyle} from "../../file"
import {LocalFileAbstraction} from "./localFileAbstraction"

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
): File {
  return File.createFromAbstraction(new LocalFileAbstraction(filePath), mimeType, propertiesStyle);
}


/**
 * Constructs and initializes a new instance from a file located at the provided path. The type
 * and description of the picture are determined by the extension of the file. The file is
 * loaded completely.
 * @param filePath Path to the file to use for the file
 */
export function createPicturefromPath(filePath: string): Picture {
  return Picture.fromFileAbstraction(new LocalFileAbstraction(filePath))
}


/**
 * Constructs a new instance that will be lazily loaded from the filePath provided.
 * @param filePath Path to the file to read
 */
export function createLazyPicturefromPath(filePath: string): PictureLazy {
  return PictureLazy.fromFile(new LocalFileAbstraction(filePath), 0);
}