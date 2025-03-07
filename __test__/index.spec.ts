import test from 'ava'

import { ping } from '../index'
import { checkScreenCapture } from '../index'

test('ping function returns pong', async (t) => {
  t.is(ping(), 'pong')
})

test('check_screen_capture runs without errors', async (t) => {
  t.notThrows(() => checkScreenCapture())
})
