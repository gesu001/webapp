'use client';

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

export default function RSSClientPage() {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [health, setHealth] = useState<{ ok: boolean; status?: string; requestCount?: number; totalRequests?: number; message?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [feedsResponse, healthResponse] = await Promise.all([
          fetch('/api/feeds', { cache: 'no-store' }),
          fetch('/health', { cache: 'no-store' }),
        ]);

        if (!feedsResponse.ok) {
          throw new Error('Unable to load feeds.');
        }

        const feedsData = await feedsResponse.json();
        const healthData = await healthResponse.json();

        setFeeds(feedsData.feeds ?? []);
        setHealth(healthData);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load RSS content');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="flex-1 w-full bg-white dark:bg-black">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">RSS Client</h1>
          <p className="text-blue-100 text-lg">
            Live feed content delivered from the backend database and API.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-6">
            <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Server health</p>
            <div className="mt-3 flex items-center gap-3">
              <span className={`inline-block h-3 w-3 rounded-full ${health?.ok === false ? 'bg-red-500' : 'bg-green-500'}`} />
              <strong className="text-lg text-gray-900 dark:text-white">{health?.status ?? 'Checking...'}</strong>
            </div>
            <p className="mt-3 text-gray-700 dark:text-gray-300">{health?.message ?? 'Waiting for server response...'}</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Request count: {health?.requestCount ?? 0} | Total: {health?.totalRequests ?? 0}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-6">
            <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Available feeds</p>
            <p className="mt-3 text-4xl font-bold text-gray-900 dark:text-white">{feeds.length}</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Database-backed items retrieved from the RSS server.</p>
          </div>
        </div>

        {error && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-gray-600 dark:text-gray-300">Loading feed data...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {feeds.map((feed) => (
              <article key={feed.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                {feed.imageUrl && (
                  <img src={feed.imageUrl} alt={feed.title} className="h-48 w-full object-cover" />
                )}
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {feed.category ?? 'Uncategorised'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(feed.publishedAt).toLocaleDateString('en-AU')}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{feed.title}</h2>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">By {feed.author?.name ?? 'Unknown author'}</p>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">{feed.summary ?? feed.content.slice(0, 160)}...</p>

                  <div className="mt-5 flex items-center justify-between gap-3">
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
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
