let requestCount = 0;

export function incrementRequestCount() {
  requestCount += 1;
  return requestCount;
}

export function getRequestCount() {
  return requestCount;
}
