export declare class K21 {
  private capturer
  private uploader
  private processor
  constructor()
  setCapturer(capturer: string): void
  setUploader(uploader: string): void
  setProcessor(processor: string): void
  run(): Promise<void>
}
export default K21
