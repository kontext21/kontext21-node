import test from 'ava'

import { ping} from '../index'

test('ping function returns pong', async (t) => {
  t.is(ping(), 'pong')
})
