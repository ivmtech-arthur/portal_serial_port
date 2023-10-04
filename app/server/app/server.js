const express = require('express')
const next = require('next')
const path = require('path')
// const { APP_PREFIX } = require('./../../config/app.config')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  const proxy = express()
  server.disable('x-powered-by')

  // if (APP_PREFIX) proxy.use(APP_PREFIX, express.static(path.resolve('public')))

  // healthz endpoint for readiness and liveness.
  server.get('/healthz', (req, res) => {
    res.send('OK')
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
