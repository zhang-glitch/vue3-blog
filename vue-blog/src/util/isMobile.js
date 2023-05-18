export default function isMobile() {
  const userAgentInfo = navigator.userAgent.toLowerCase()
  const agents = ['android', 'iphone']
  return agents.some(value => userAgentInfo.includes(value))
}