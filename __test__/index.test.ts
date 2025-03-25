import k21 from '@k21'

describe('k21', () => {
  test('capture screen', async () => {
    await k21.captureTest()
    console.log('captureTest')
    expect(true).toBe(true)
  }, 20000)
})