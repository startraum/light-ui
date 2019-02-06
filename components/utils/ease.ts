import easing from 'bezier-easing'

const easeConfig: [number, number, number, number] = [.7, .06, .88, .44]

const ease = easing(...easeConfig)
const reverseEase = easing(1 - easeConfig[2], 1 - easeConfig[3], 1 - easeConfig[0], 1 - easeConfig[1])

export default (num: number, reverse = false) => (reverse ? reverseEase : ease)(num / 100) * 100
