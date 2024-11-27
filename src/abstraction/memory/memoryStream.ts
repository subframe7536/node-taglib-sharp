import {ByteVector} from "../../byteVector"
import {IStream, SeekOrigin} from "../../stream"

export class MemoryStream implements IStream {
  private readonly _isWritable: boolean
  private readonly _data: ByteVector
  private _position: number

  /** @inheritDoc */
  public constructor(bytesToReturn: ByteVector, isWritable: boolean) {
    this._data = bytesToReturn
    this._position = 0
    this._isWritable = isWritable
  }

  /** @inheritDoc */
  public get canWrite(): boolean {
    return this._isWritable
  }

  /** @inheritDoc */
  public get data(): ByteVector {
    return this._data
  }

  public get length(): number {
    return this._data.length
  }

  /** @inheritDoc */
  public get position(): number {
    return this._position
  }

  /** @inheritDoc */
  public set position(value: number) {
    this._position = value
  }

  /** @inheritDoc */
  public close(): void { /* no op */ }

  /** @inheritDoc */
  public read(buffer: Uint8Array, bufferOffset: number, length: number): number {
    let bytesRead = 0
    while (bytesRead < length && this._position + bytesRead < this._data.length) {
      buffer[bufferOffset + bytesRead] = this._data.get(this._position + bytesRead)
      bytesRead++
    }

    this._position += bytesRead
    return bytesRead
  }

  /** @inheritDoc */
  public seek(offset: number, origin: SeekOrigin): void {
    switch (origin) {
      case SeekOrigin.Begin:
        this._position = offset
        break
      case SeekOrigin.Current:
        this._position += offset
        break
      case SeekOrigin.End:
        this._position = this._data.length - offset
        break
    }
  }

  /** @inheritDoc */
  public setLength(length: number): void {
    this._data.resize(length)
    this._position = Math.max(this.length, this._position)
  }

  /** @inheritDoc */
  public write(buffer: ByteVector | Uint8Array, bufferOffset: number, length: number): number {
    if (!this._isWritable) {
      throw new Error('Invalid operation: read-only stream')
    }

    if (buffer instanceof Uint8Array) {
      buffer = ByteVector.fromByteArray(buffer)
    }

    const bytesToWrite = buffer.subarray(bufferOffset, bufferOffset + length)
    this._data.splice(this._position, bytesToWrite.length, bytesToWrite)
    this._position = bufferOffset + bytesToWrite.length

    return bytesToWrite.length
  }
}
