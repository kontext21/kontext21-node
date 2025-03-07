#![deny(clippy::all)]

use napi_derive::napi;

#[napi]
pub fn ping() -> String {
  println!("ping");
  k21::signal::utils::ping()
}
