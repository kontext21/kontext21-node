import test from 'ava'
import {
  takeOneScreenshotAndDoOcr,
  takeMultipleScreenshotsAndDoOcr,
  ping,
  recordScreenImages,
  recordScreenVideo,
  processImage,
  processVideo,
} from '../index'

test('ping function returns pong', async (t) => {
  t.is(ping(), 'pong')
})

test('takeOneScreenshotAndDoOcr runs without errors', async (t) => {
  const res = await takeOneScreenshotAndDoOcr()
  t.truthy(res, 'takeOneScreenshotAndDoOcr should return a value')
  t.pass('takeOneScreenshotAndDoOcr completed without throwing errors')
})

test('takeMultipleScreenshotsAndDoOcr runs without errors', async (t) => {
  const res = await takeMultipleScreenshotsAndDoOcr(2)
  t.truthy(res, 'takeMultipleScreenshotsAndDoOcr should return a value')
  t.pass('takeMultipleScreenshotsAndDoOcr completed without throwing errors')
})

test('recordScreenImages runs without errors', async (t) => {
  await recordScreenImages(1, 10, './')
  t.pass('recordScreenImages completed without throwing errors')
})

test('recordScreenVideo runs without errors', async (t) => {
  await recordScreenVideo(1, 11, 10, './')
  t.pass('recordScreenVideo completed without throwing errors')
})

test('processImage runs without errors', async (t) => {
  const res = await processImage('./__test__/screenshot-9.png')
  console.log('processImage result:', res)
  t.truthy(res, 'processImage should return a value')
  t.pass('processImage completed without throwing errors')
})

test('processVideo runs without errors', async (t) => {
  const res = await processVideo('./__test__/test-output.mp4')
  console.log('processVideo result:', res)
  t.truthy(res, 'processVideo should return a value')
  t.pass('processVideo completed without throwing errors')
})

test('processImage runs without errors', async (t) => {
  const res = await processImage('./__test__/screenshot-9.png')
  console.log('processImage result:', res)
  t.truthy(res, 'processImage should return a value')
  t.pass('processImage completed without throwing errors')
})
