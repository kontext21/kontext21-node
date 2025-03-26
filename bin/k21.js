"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.K21Pipeline = void 0;
const k21_internal_1 = __importDefault(require("./k21_internal"));
class K21Pipeline {
    capturer;
    uploader;
    processor;
    defaultConfig = {
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
    setCapturer(config) {
        if (this.uploader !== null) {
            throw new Error('Cannot set Capturer when Uploader is already set');
        }
        let finalConfig = {
            ...this.defaultConfig,
            ...config
        };
        this.capturer = finalConfig;
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
            try {
                await k21_internal_1.default.captureScreen(this.capturer);
                return [];
            }
            catch (error) {
                throw new Error(`Screen capture failed: ${error?.message}`);
            }
        }
        try {
            console.log('Running routine with:', {
                capturer: this.capturer,
                uploader: this.uploader,
                processor: this.processor,
            });
            return await k21_internal_1.default.captureAndProcessScreen(this.capturer);
        }
        catch (error) {
            throw new Error(`Routine failed: ${error?.message}`);
        }
    }
}
exports.K21Pipeline = K21Pipeline;
