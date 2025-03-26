/** Configuration for screen capture
 * @example
 * // Basic config with no saving
 * const config: CaptureConfig = {
 *   fps: 1,
 *   record_length_in_seconds: 60
 * }
 *
 * // Config with video saving
 * const config: CaptureConfig = {
 *   fps: 1,
 *   record_length_in_seconds: 60,
 *   save_video: true,
 *   output_dir_video: '/path/to/videos',
 *   video_chunk_duration_in_seconds: 60  // Required when save_video is true
 * }
 */
interface CaptureConfig {
    fps?: number;
    recordLengthInSeconds?: number;
    saveScreenshot?: boolean;
    outputDirScreenshot?: string;
    saveVideo?: boolean;
    outputDirVideo?: string;
    videoChunkDurationInSeconds?: number;
}
interface ImageData {
    timestamp: string;
    frameNumber: number;
    content: string;
    processingType: string;
}
declare class K21Pipeline {
    private capturer;
    private uploader;
    private processor;
    private defaultConfig;
    constructor();
    setCapturer(config?: CaptureConfig): void;
    setUploader(uploader: any): void;
    setProcessor(processor: any): void;
    run(): Promise<ImageData[]>;
}
export { K21Pipeline };
