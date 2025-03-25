"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.K21 = void 0;
const k21_internal_1 = __importDefault(require("./k21_internal"));
class K21 {
    capturer;
    uploader;
    processor;
    constructor() {
        this.capturer = null;
        this.uploader = null;
        this.processor = null;
    }
    setCapturer(capturer) {
        if (this.uploader !== null) {
            throw new Error('Cannot set Capturer when Uploader is already set');
        }
        this.capturer = capturer;
    }
    setUploader(uploader) {
        if (this.capturer !== null) {
            throw new Error('Cannot set Uploader when Capturer is already set');
        }
        this.uploader = uploader;
    }
    setProcessor(processor) {
        this.processor = processor;
    }
    async run() {
        if (!this.capturer && !this.uploader) {
            throw new Error('Either Capturer or Uploader must be set');
        }
        if (this.capturer && !this.processor) {
            const config = {
                fps: 1,
                video_chunk_duration_in_seconds: 1,
                save_screenshot: false,
                save_video: false,
                record_length_in_seconds: 10,
                max_frames: 10,
                output_dir_video: '',
                output_dir_screenshot: '',
            };
            k21_internal_1.default.capture_screen(config);
            return;
        }
        try {
            console.log('Running routine with:', {
                capturer: this.capturer,
                uploader: this.uploader,
                processor: this.processor,
            });
        }
        catch (error) {
            throw new Error(`Routine failed: ${error?.message}`);
        }
    }
}
exports.K21 = K21;
// Export default instance
exports.default = K21;
