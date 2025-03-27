import k21 from './k21_internal'

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

class K21Pipeline {
    private capturer: any;
    private uploader: any;
    private processor: any;
    private defaultConfig = {
        fps: 1,
        recordLengthInSeconds: 10,
        saveVideo: false,
        outputDirVideo: '',
        videoChunkDurationInSeconds: 60,
        saveScreenshot: false,
        outputDirScreenshot: '',
    };

    constructor() {
        this.capturer = null;
        this.uploader = null;
        this.processor = null;
    }

    setCapturer(config?: CaptureConfig): void {
        if (this.uploader !== null) {
            throw new Error('Cannot set Capturer when Uploader is already set');
        }

        if (config === undefined) {
            config = {};
        }

        let finalConfig: Partial<CaptureConfig> = {
            ...this.defaultConfig,
            ...config
        };

        this.capturer = finalConfig;
    }

    setUploader(uploader: any): void {
        if (this.capturer !== null) {
            throw new Error('Cannot set Uploader when Capturer is already set')
        }
        if (uploader === undefined) {
          uploader = {};
      }
        this.uploader = uploader
    }

    setProcessor(processor: any): void {
      if (processor === undefined) {
        processor = {};
      }
        this.processor = processor
    }

    async run(): Promise<ImageData[]> {
        if (!this.capturer && !this.uploader) {
            throw new Error('Either Capturer or Uploader must be set')
        }

        if (this.capturer && !this.processor) {
            try {
                await k21.captureScreen(this.capturer)
                return []
            } catch (error: any) {
                throw new Error(`Screen capture failed: ${error?.message}`)
            }
        }

        try {
            console.log('Running routine with:', {
                capturer: this.capturer,
                uploader: this.uploader,
                processor: this.processor,
            })
            const result = await k21.captureAndProcessScreen(this.capturer)
            return result.data
        } catch (error: any) {
            throw new Error(`Routine failed: ${error?.message}`)
        }
    }
}

// Export default instance
export { K21Pipeline }
