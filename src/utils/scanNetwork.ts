import pMap from 'p-map'
import { Netmask } from 'netmask'
import getLocalIp from './getLocalIp'

const getNetworkIps = (ip: string, bitmask = 24) => {
  const ips: string[] = []
  const block = new Netmask(`${ip}/${bitmask}`)
  block.forEach(currIp => ips.push(currIp))
  return ips
}

const checkHosts = async (ips: string[], path: string, port?: number) => {
  const checks = await pMap(ips, ip => new Promise(resolve => {
    const host = `http://${ip}${port == null ? '' : `:${port}`}${path}`
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 1000)
    fetch(host, {
      signal: controller.signal,
    })
      .then(() => resolve(ip))
      .catch(() => resolve())
      .finally(() => clearTimeout(timeout))
  }), { concurrency: 250 })
  return checks.filter(ip => !!ip)
}

export default async (path: string, port?: number) => {
  const ip = await getLocalIp()
  const networkIps = getNetworkIps(ip, 16)
  console.log(networkIps)
  return checkHosts(networkIps, path, port)
}
