import { ServerResponse } from 'http'
import { serialize } from 'cookie'

function randomId() {
  return Math.floor(Math.random() * 1e17).toString(16)
}

export default (res: ServerResponse, expires?: Date) => {
  res.setHeader('set-cookie', serialize('accessToken', randomId() , { expires: expires || new Date(8640000000000000) }))
  if (expires) res.setHeader('set-cookie', serialize('guest', '1' , { expires }))
  res.setHeader('location', '/light')
  res.statusCode = 302
  res.end()
}
