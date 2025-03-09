#![deny(clippy::all)]
use k21::screen_capture::utils::ScreenCaptureConfig;
use napi_derive::napi;

#[napi]
pub fn ping() -> String {
  "pong".to_string()
}

#[napi(object, js_name = "OcrResult")]
pub struct OcrResultJS {
  pub text: String,
  pub timestamp: String,
  pub frame_number: i64,
}

// Private helper function to convert k21 OcrResult to our OcrResult
fn convert_ocr_result(ocr_result: k21::screen_capture::utils::OcrResult) -> OcrResultJS {
  OcrResultJS {
    text: ocr_result.text.clone(),
    timestamp: ocr_result.timestamp.clone(),
    frame_number: ocr_result.frame_number as i64,
  }
}

#[napi]
pub async fn take_one_screenshot_and_do_ocr() -> Option<OcrResultJS> {
  let result = k21::screen_capture::utils::run_screen_capture_and_do_ocr_default().await;

  result.into_iter()
    .next()
    .map(convert_ocr_result)
}

#[napi]
pub async fn take_multiple_screenshots_and_do_ocr(record_length_in_seconds: i32) -> Vec<OcrResultJS> {
  // Run screen capture and OCR
  let config = ScreenCaptureConfig {
    fps: 1.0,
    video_chunk_duration: 10,
    stdout: true,
    save_screenshot: true,
    save_video: true,
    max_frames: None,
    record_length_in_seconds: record_length_in_seconds as u64,
  };

  let result = k21::screen_capture::utils::run_screen_capture_and_do_ocr(config).await;

  result.into_iter()
    .map(convert_ocr_result)
    .collect()
}
