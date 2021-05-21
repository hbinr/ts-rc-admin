import { createServer } from '@blued-core/http-server'

import { PORT } from './config';

// curl http://127.0.0.1:8080
createServer({
  logPath: './log',
  port: Number(PORT)
})