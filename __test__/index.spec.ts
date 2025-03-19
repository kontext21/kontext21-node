import test from 'ava'
import { add, addEnhanced } from '../index'

test('async function from native code', async (t) => {
  const fixture = 42
  t.is(await add(fixture, 100), fixture + 100)
})

test('enhanced function from native code', async (t) => {
  const fixture = 42
  t.is(await addEnhanced(fixture, 100), fixture + 100)
})
