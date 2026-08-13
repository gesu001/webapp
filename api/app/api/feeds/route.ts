import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureSeedData } from '@/lib/seed';
import { incrementRequestCount } from '@/lib/requestCounter';

export async function GET() {
  incrementRequestCount();

  try {
    await ensureSeedData();

    const feeds = await prisma.feed.findMany({
      orderBy: { publishedAt: 'desc' },
      include: { author: true },
    });

    return NextResponse.json({
      feeds: feeds.map((feed) => ({
        id: feed.id,
        title: feed.title,
        summary: feed.summary,
        content: feed.content,
        category: feed.category,
        link: feed.link,
        imageUrl: feed.imageUrl,
        publishedAt: feed.publishedAt.toISOString(),
        author: feed.author ? { name: feed.author.name } : null,
      })),
      total: feeds.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch feeds',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  incrementRequestCount();

  try {
    const payload = await request.json();
    const feed = await prisma.feed.create({
      data: {
        title: payload.title,
        summary: payload.summary ?? '',
        content: payload.content ?? payload.summary ?? '',
        category: payload.category ?? 'General',
        link: payload.link ?? '',
        imageUrl: payload.imageUrl ?? null,
        source: payload.source ?? 'API',
        publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : new Date(),
        author: payload.authorName
          ? {
              connectOrCreate: {
                where: { name: payload.authorName },
                create: { name: payload.authorName, email: payload.authorEmail ?? null },
              },
            }
          : undefined,
      },
      include: { author: true },
    });

    return NextResponse.json(
      {
        message: 'Feed created successfully',
        feed: {
          id: feed.id,
          title: feed.title,
          summary: feed.summary,
          content: feed.content,
          category: feed.category,
          link: feed.link,
          imageUrl: feed.imageUrl,
          publishedAt: feed.publishedAt.toISOString(),
          author: feed.author ? { name: feed.author.name } : null,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create feed',
      },
      { status: 500 }
    );
  }
}
