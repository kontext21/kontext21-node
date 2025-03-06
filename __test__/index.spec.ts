import test from 'ava'

import { ping, plus100 } from '../index'

test('sync function from native code', (t) => {
  const fixture = 42
  t.is(plus100(fixture), fixture + 100)
})

test('ping function returns pong', async (t) => {
  t.is(ping(), 'pong')
})
