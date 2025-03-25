"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureTest = captureTest;
const k21_internal_1 = __importDefault(require("./k21_internal"));
async function captureTest() {
    await k21_internal_1.default.capture_screen({
        fps: 1,
        video_chunk_duration_in_seconds: 1,
        stdout: false,
        save_screenshot: false,
        save_video: false,
        record_length_in_seconds: 10,
        output_dir_video: '',
        output_dir_screenshot: '',
    });
    return;
}
