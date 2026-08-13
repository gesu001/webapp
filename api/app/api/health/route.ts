import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getRequestCount, incrementRequestCount } from '@/lib/requestCounter';

export async function GET() {
  const requestCount = incrementRequestCount();

  try {
    await prisma.$queryRaw`SELECT 1 as ok`;

    return NextResponse.json({
      ok: true,
      status: 'healthy',
      requestCount,
      totalRequests: getRequestCount(),
      timestamp: new Date().toISOString(),
      message: 'RSS server is running and connected to the database.',
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        status: 'degraded',
        requestCount,
        totalRequests: getRequestCount(),
        timestamp: new Date().toISOString(),
        message: 'Database check failed.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
