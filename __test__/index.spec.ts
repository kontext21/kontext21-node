import test from 'ava'
import { checkScreenCapture, ping } from '../index'

test('ping function returns pong', async (t) => {
  t.is(ping(), 'pong')
})

test('check_screen_capture runs without errors', async (t) => {
  const res = await checkScreenCapture()
  console.log(res)
  t.pass('checkScreenCapture completed without throwing errors')
})
