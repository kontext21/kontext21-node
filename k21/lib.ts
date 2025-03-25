import k21i from './k21_internal'

async function captureTest() {
  await k21i.capture_screen({
    fps: 1,
    video_chunk_duration_in_seconds: 1,
    stdout: false,
    save_screenshot: false,
    save_video: false,
    record_length_in_seconds: 10,
    output_dir_video: '',
    output_dir_screenshot: '',
  })
  return ;
}



export { captureTest }
