import { ServerResponse } from 'http'
import { serialize } from 'cookie'

function randomId() {
  return Math.floor(Math.random() * 1e17).toString(16)
}

export default (res: ServerResponse, expires?: Date) => {
  const cookie = serialize('accessToken', randomId() , { expires })
  res.setHeader('set-cookie', cookie)
  res.setHeader('location', '/light')
  res.statusCode = 302
  res.end()
}
