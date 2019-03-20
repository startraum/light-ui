import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import generateAccessToken from './generateAccessToken'

const port = parseInt(process.env.PORT || '3000', 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const server = createServer((req, res) => {
  if (req.url === (process.env.LIMITED_ACCESS_URL || '/guest-access')) {
    return generateAccessToken(res, new Date(new Date().getTime() + (15 * 60 * 1000)))
  }
  if (req.url === (process.env.ACCESS_URL || '/member-access')) {
    return generateAccessToken(res)
  }
  if (req.url === '/') {
    res.setHeader('location', '/light')
    res.statusCode = 302
    res.end()
    return
  }

  const parsedUrl = parse(req.url || '', true)
  handle(req, res, parsedUrl)
})

app.prepare().then(() => {
  server.listen(port, (err: Error) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

export default server
