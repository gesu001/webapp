import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getRequestCount, getUptimeSeconds, incrementRequestCount } from '@/lib/requestCounter';

export async function GET() {
    incrementRequestCount();

    try {
        const [totalFeeds, totalAuthors, categoryGroups, latestFeed, oldestFeed] = await Promise.all([
            prisma.feed.count(),
            prisma.author.count(),
            prisma.feed.groupBy({
                by: ['category'],
                _count: { _all: true },
            }),
            prisma.feed.findFirst({ orderBy: { publishedAt: 'desc' } }),
            prisma.feed.findFirst({ orderBy: { publishedAt: 'asc' } }),
        ]);

        return NextResponse.json({
            feeds: {
                total: totalFeeds,
                byCategory: categoryGroups.map((group) => ({
                    category: group.category ?? 'Uncategorised',
                    count: group._count._all,
                })),
                latestPublishedAt: latestFeed?.publishedAt.toISOString() ?? null,
                oldestPublishedAt: oldestFeed?.publishedAt.toISOString() ?? null,
            },
            authors: {
                total: totalAuthors,
            },
            server: {
                totalRequests: getRequestCount(),
                uptimeSeconds: getUptimeSeconds(),
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Failed to fetch stats',
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}
