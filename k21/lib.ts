import k21 from './k21_internal'

async function addEnhanced(a: number, b: number) {
  console.log('addEnhanced', a, b)
  return k21.add(a, b)
}

export { addEnhanced }
