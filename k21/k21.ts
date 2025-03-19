import k21 from './k21_internal'

export class K21 {
  private capturer: string | null
  private uploader: string | null
  private processor: string | null

  constructor() {
    this.capturer = null
    this.uploader = null
    this.processor = null
  }

  setCapturer(capturer: string): void {
    if (this.uploader !== null) {
      throw new Error('Cannot set Capturer when Uploader is already set')
    }
    this.capturer = capturer
  }

  setUploader(uploader: string): void {
    if (this.capturer !== null) {
      throw new Error('Cannot set Uploader when Capturer is already set')
    }
    this.uploader = uploader
  }

  setProcessor(processor: string): void {
    this.processor = processor
  }

  async run(): Promise<void> {
    if (!this.capturer && !this.uploader) {
      throw new Error('Either Capturer or Uploader must be set')
    }

    if (this.capturer && !this.processor) {
      const config = {
        fps: 1,
        video_chunk_duration_in_seconds: 1,
        stdout: false,
        save_screenshot: false,
        save_video: false,
        record_length_in_seconds: 10,
        max_frames: 10,
        output_dir_video: '',
        output_dir_screenshot: '',
      }

      k21.capture_screen(config)
      return
    }

    try {
      console.log('Running routine with:', {
        capturer: this.capturer,
        uploader: this.uploader,
        processor: this.processor,
      })
    } catch (error: any) {
      throw new Error(`Routine failed: ${error?.message}`)
    }
  }
}

// Export default instance
export default K21
