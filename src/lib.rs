#![deny(clippy::all)]

use napi_derive::napi;

#[napi]
pub fn ping() -> String {
  "pong".to_string()
}

#[napi]
pub async fn check_screen_capture() -> String {
  // Run screen capture and OCR
  let result = k21::screen_capture::utils::run_screen_capture_and_do_ocr_default().await;

  // Return the first element if it exists, otherwise return empty string
  if let Some(first) = result.first() {
    format!("{:?}", first)
  } else {
    "".to_string()
  }
}
