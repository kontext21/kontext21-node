"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureTest = captureTest;
const k21_internal_1 = __importDefault(require("./k21_internal"));
async function captureTest() {
    await k21_internal_1.default.captureScreen({
        fps: 1,
        videoChunkDurationInSeconds: 1,
        saveScreenshot: false,
        saveVideo: false,
        recordLengthInSeconds: 10,
        outputDirVideo: '',
        outputDirScreenshot: '',
    });
    return;
}
