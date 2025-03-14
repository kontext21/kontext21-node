use k21::{mp4_pr::utils::FrameData, screen_capture::utils::ScreenCaptureConfig};
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
    video_chunk_duration_in_seconds: 10,
    stdout: true,
    save_screenshot: true,
    save_video: true,
    max_frames: None,
    record_length_in_seconds: record_length_in_seconds as u64,
    ..Default::default()
  };

  let result = k21::screen_capture::utils::run_screen_capture_and_do_ocr(config).await;

  result.into_iter()
    .map(convert_ocr_result)
    .collect()
}

#[napi]
pub async fn record_screen_images(fps: f64, duration: u32, output_dir_screenshot: String) -> () {
  let result = k21::screen_capture::utils::record_screen_capture_images(
    Some(fps as f32),
    Some(duration as u64),
    Some(&output_dir_screenshot)
  ).await;

  result.unwrap();
}

#[napi]
pub async fn record_screen_video(fps: f64, duration: u32, video_chunk_duration_in_seconds: u32, output_dir_video: String) -> () {
  let result = k21::screen_capture::utils::record_screen_capture_video(
    Some(fps as f32),
    Some(duration as u64),
    Some(video_chunk_duration_in_seconds as u64),
    Some(&output_dir_video)
  ).await;

  result.unwrap();
}

// Define a JavaScript-compatible struct for FrameData
#[napi(object, js_name = "FrameData")]
pub struct FrameDataJS {
  pub ocr_text: String,
  pub timestamp: String,
  // Add other fields you need from FrameData
}

// Convert FrameData to FrameDataJS
fn convert_frame_data(frame_data: FrameData) -> FrameDataJS {
  FrameDataJS {
    ocr_text: frame_data.ocr_text,
    timestamp: frame_data.timestamp,
  }
}

#[napi]
pub async fn process_image(image_path: String) -> FrameDataJS {
  let result = k21::processor::utils::perform_ocr_on_image_from_path(&image_path).await;
  convert_frame_data(result.unwrap())
}

#[napi]
pub async fn process_video(video_path: String) -> Vec<FrameDataJS> {
  let result = k21::processor::utils::perform_ocr_on_video_path(&video_path).await;
  result.unwrap().into_iter().map(convert_frame_data).collect()
}