#![deny(clippy::all)]

use napi_derive::napi;

#[napi]
pub fn ping() -> String {
  println!("ping");
  k21::signal::utils::ping()
}

#[napi]
pub async fn check_screen_capture() {
  println!("pong");
  let result = k21::screen_capture::utils::run_screen_capture_and_do_ocr_default().await;
  println!("result: {:?}", result);
}
