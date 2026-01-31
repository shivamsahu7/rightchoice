export function getClientIP(headers: Record<string, string | undefined>): string | undefined {
  // Check common headers that contain client IP
  const xForwardedFor = headers['x-forwarded-for']
  const xRealIp = headers['x-real-ip']
  const cfConnectingIp = headers['cf-connecting-ip'] // Cloudflare
  
  // x-forwarded-for can contain multiple IPs, get the first one
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim()
  }
  
  if (xRealIp) {
    return xRealIp
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp
  }
  
  return undefined
}
