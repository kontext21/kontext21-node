import test from 'ava'
import { takeOneScreenshotAndDoOcr, takeMultipleScreenshotsAndDoOcr, ping } from '../index'

test('ping function returns pong', async (t) => {
  t.is(ping(), 'pong')
})

test('takeOneScreenshotAndDoOcr runs without errors', async (t) => {
  const res = await takeOneScreenshotAndDoOcr()
  t.truthy(res, 'takeOneScreenshotAndDoOcr should return a value')
  t.pass('takeOneScreenshotAndDoOcr completed without throwing errors')
})

test('takeMultipleScreenshotsAndDoOcr runs without errors', async (t) => {
  const res = await takeMultipleScreenshotsAndDoOcr(10)
  console.log(res)
  t.truthy(res, 'takeMultipleScreenshotsAndDoOcr should return a value')
  t.pass('takeMultipleScreenshotsAndDoOcr completed without throwing errors')
})
