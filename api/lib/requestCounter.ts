let requestCount = 0;
const serverStartedAt = new Date();

export function incrementRequestCount() {
  requestCount += 1;
  return requestCount;
}

export function getRequestCount() {
  return requestCount;
}

export function getServerStartedAt() {
  return serverStartedAt;
}

export function getUptimeSeconds() {
  return Math.floor((Date.now() - serverStartedAt.getTime()) / 1000);
}
