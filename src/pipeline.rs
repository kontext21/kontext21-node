use crate::image::JsImageDataCollection;
use crate::capture::JsScreenCaptureConfig;
use k21::capture::ScreenCaptureConfig;
use k21::process::run_live_screen_capture_ocr;
use k21::common::ImageData;

#[napi(catch_unwind)]
pub async fn capture_and_process_screen(config: JsScreenCaptureConfig) -> napi::Result<JsImageDataCollection> {
    let native_config: ScreenCaptureConfig = config.into();
    let result: Vec<ImageData> = run_live_screen_capture_ocr(&native_config).await.into();

    Ok(JsImageDataCollection {
        data: result.into_iter().map(|data| data.into()).collect()
    })
}