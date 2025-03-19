#![allow(clippy::transmute_undefined_repr)]

#[macro_use]
extern crate napi_derive;

use std::path::PathBuf;

pub use napi::bindgen_prelude::*;
pub use k21::screen_capture::utils::{capture, ScreenCaptureConfig};

const VERSION: &str = env!("CARGO_PKG_VERSION");

#[napi]
pub fn version() -> &'static str {
    VERSION
}

#[napi]
pub async fn add(a: i32, b: i32) -> i32 {
  a + b
}

#[napi(object, js_name = "JsScreenCaptureConfig")]
pub struct JsScreenCaptureConfig {
    #[napi(js_name = "fps")]
    pub fps: f64,
    #[napi(js_name = "video_chunk_duration_in_seconds")]
    pub video_chunk_duration_in_seconds: i64,
    #[napi(js_name = "stdout")]
    pub stdout: bool,
    #[napi(js_name = "save_screenshot")]
    pub save_screenshot: bool,
    #[napi(js_name = "save_video")]
    pub save_video: bool,
    #[napi(js_name = "max_frames")]
    pub max_frames: Option<i64>,
    #[napi(js_name = "record_length_in_seconds")]
    pub record_length_in_seconds: i64,
    #[napi(js_name = "output_dir_video")]
    pub output_dir_video: Option<String>,
    #[napi(js_name = "output_dir_screenshot")]
    pub output_dir_screenshot: Option<String>
}

#[napi(js_name = "capture_screen")]
pub async fn capture_screen(config: JsScreenCaptureConfig) -> () {
  let native_config = ScreenCaptureConfig {
    fps: config.fps as f32,
    video_chunk_duration_in_seconds: config.video_chunk_duration_in_seconds as u64,
    stdout: config.stdout,
    save_screenshot: config.save_screenshot,
    save_video: config.save_video,
    max_frames: config.max_frames.map(|x: i64| x as u64),
    record_length_in_seconds: config.record_length_in_seconds as u64,
    output_dir_video: config.output_dir_video.and_then(|path| Some(PathBuf::from(path))),
    output_dir_screenshot: config.output_dir_screenshot.and_then(|path| Some(PathBuf::from(path))),
  };

  capture(
    Some(native_config.fps),
    Some(native_config.record_length_in_seconds),
    Some(native_config.save_video),
    Some(native_config.video_chunk_duration_in_seconds),
    Some(native_config.save_screenshot),
    native_config.output_dir_video.as_deref(),
    native_config.output_dir_screenshot.as_deref()
  ).await
}
