import { NextResponse } from 'next/server';
import { getRequestCount, incrementRequestCount } from '@/lib/requestCounter';

export async function GET() {
  const requestCount = incrementRequestCount();

  return NextResponse.json({
    requestCount,
    totalClientRequests: getRequestCount(),
    timestamp: new Date().toISOString(),
  });
}
