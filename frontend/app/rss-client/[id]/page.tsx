'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type FeedItem = {
    id: string;
    title: string;
    summary: string | null;
    content: string;
    category: string | null;
    link: string | null;
    imageUrl: string | null;
    publishedAt: string;
    author?: {
        name: string;
    } | null;
};

export default function RSSClientDetailPage() {
    const params = useParams<{ id: string }>();
    const [feed, setFeed] = useState<FeedItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadFeed() {
            try {
                const response = await fetch(`/api/feeds/${params.id}`, { cache: 'no-store' });

                if (!response.ok) {
                    throw new Error('Feed not found.');
                }

                const data = await response.json();
                setFeed(data.feed ?? null);
            } catch (loadError) {
                setError(loadError instanceof Error ? loadError.message : 'Failed to load feed');
            } finally {
                setLoading(false);
            }
        }

        loadFeed();
    }, [params.id]);

    return (
        <div className="flex-1 w-full bg-white dark:bg-black">
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">{feed?.title ?? 'Feed Detail'}</h1>
                    <p className="text-blue-100 text-lg">Full content for this RSS feed item.</p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Link
                    href="/rss-client"
                    className="inline-flex items-center gap-1 mb-6 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                    &larr; Back to RSS Client
                </Link>

                {error && (
                    <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-200">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-gray-600 dark:text-gray-300">Loading feed data...</div>
                ) : feed ? (
                    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        {feed.imageUrl && (
                            <img src={feed.imageUrl} alt={feed.title} className="h-64 w-full object-cover" />
                        )}
                        <div className="p-6">
                            <div className="mb-3 flex items-center justify-between gap-2">
                                <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    {feed.category ?? 'Uncategorised'}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(feed.publishedAt).toLocaleDateString('en-AU')}
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{feed.title}</h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">By {feed.author?.name ?? 'Unknown author'}</p>
                            <p className="mt-6 whitespace-pre-line text-gray-700 dark:text-gray-300">{feed.content}</p>

                            <div className="mt-8">
                                <a
                                    href={feed.link ?? '#'}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    Open link
                                </a>
                            </div>
                        </div>
                    </article>
                ) : null}
            </section>
        </div>
    );
}
