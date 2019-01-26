// @ts-ignore
const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
const noop = () => new Promise(r => r())
const ipRegEx = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/

export default () => new Promise<string>((resolve, reject) => {
  const pc = new RTCPeerConnection({ iceServers: [] })
  pc.createDataChannel('') // create a bogus data channel
  pc.createOffer((...args) => pc.setLocalDescription(...args), noop) // create offer and set local description
  pc.onicecandidate = ice => {
    const candidate = ice && ice.candidate && ice.candidate.candidate
    if (candidate) {
      const val = ipRegEx.exec(candidate)
      if (!val) {
        reject()
        return
      }
      const myIP = val[1]
      resolve(myIP)
      pc.onicecandidate = noop
    }
  }
})
