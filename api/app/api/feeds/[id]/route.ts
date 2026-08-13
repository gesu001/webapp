import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { incrementRequestCount } from '@/lib/requestCounter';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    incrementRequestCount();

    const { id } = await params;

    const feed = await prisma.feed.findUnique({
        where: { id },
        include: { author: true },
    });

    if (!feed) {
        return NextResponse.json({ error: 'Feed not found' }, { status: 404 });
    }

    return NextResponse.json({
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
        timestamp: new Date().toISOString(),
    });
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    incrementRequestCount();

    const { id } = await params;
    const payload = await request.json();

    const feed = await prisma.feed.update({
        where: { id },
        data: {
            title: payload.title,
            summary: payload.summary ?? undefined,
            content: payload.content ?? payload.summary ?? undefined,
            category: payload.category ?? undefined,
            link: payload.link ?? undefined,
            imageUrl: payload.imageUrl ?? undefined,
            source: payload.source ?? undefined,
            publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : undefined,
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

    return NextResponse.json({
        message: 'Feed updated successfully',
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
    });
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    incrementRequestCount();

    const { id } = await params;

    await prisma.feed.delete({ where: { id } });

    return NextResponse.json({
        message: 'Feed deleted successfully',
        id,
        timestamp: new Date().toISOString(),
    });
}
