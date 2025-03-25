// use crate::image::{JsImageData, JsImageDataCollection};
// use crate::capture::JsScreenCaptureConfig;
// use k21::capture::ScreenCaptureConfig;
// use k21::process::run_live_screen_capture_ocr;

// #[napi(catch_unwind)]
// pub async fn process_screen(config: JsScreenCaptureConfig) -> napi::Result<JsImageDataCollection> {
//     let native_config: ScreenCaptureConfig = config.into();
//     let result = run_live_screen_capture_ocr(&native_config).await;

//     Ok(result.into())
// }