'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.addEnhanced = addEnhanced
const k21_internal_1 = __importDefault(require('./k21_internal'))
async function addEnhanced(a, b) {
  console.log('addEnhanced', a, b)
  return k21_internal_1.default.add(a, b)
}
