'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

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

type SortMode = 'latest' | 'oldest';
type ViewMode = 'card' | 'list';
type CategoryFilter = 'all' | string;

export default function RSSClientPage() {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [health, setHealth] = useState<{ ok: boolean; status?: string; requestCount?: number; totalRequests?: number; message?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortMode, setSortMode] = useState<SortMode>('latest');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

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

  const sortedFeeds = useMemo(() => {
    const items = [...feeds];
    items.sort((a, b) => {
      const timeA = new Date(a.publishedAt).getTime();
      const timeB = new Date(b.publishedAt).getTime();
      return sortMode === 'latest' ? timeB - timeA : timeA - timeB;
    });
    return items;
  }, [feeds, sortMode]);

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(feeds.map((feed) => feed.category).filter((c): c is string => Boolean(c))))],
    [feeds]
  );

  const filteredFeeds = useMemo(() => {
    if (categoryFilter === 'all') {
      return sortedFeeds;
    }
    return sortedFeeds.filter((feed) => feed.category === categoryFilter);
  }, [categoryFilter, sortedFeeds]);

  const totalPages = Math.max(1, Math.ceil(filteredFeeds.length / pageSize));

  useEffect(() => {
    setCurrentPage(1);
  }, [sortMode, viewMode, categoryFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedFeeds = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredFeeds.slice(start, start + pageSize);
  }, [currentPage, filteredFeeds]);

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

        {/* Filter panel */}
        <div className="favorites-filter-panel mb-8 p-4 bg-blue-50 dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Total Feeds:</strong> {feeds.length}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  (Showing {filteredFeeds.length})
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Live feed items retrieved from the RSS server database.
              </p>
            </div>

            <div className="w-full lg:w-auto lg:min-w-140">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                <div className="rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 p-2.5">
                  <label
                    htmlFor="filterCategory"
                    className="favorites-filter-label mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide"
                  >
                    Category
                  </label>
                  <select
                    id="filterCategory"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                    className="favorites-filter-select w-full px-3 py-2 rounded-lg text-sm font-medium bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Filter feeds by category"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All' : category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 p-2.5">
                  <label
                    htmlFor="sortFeeds"
                    className="favorites-filter-label mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide"
                  >
                    Sort
                  </label>
                  <select
                    id="sortFeeds"
                    value={sortMode}
                    onChange={(e) => setSortMode(e.target.value as SortMode)}
                    className="favorites-filter-select w-full px-3 py-2 rounded-lg text-sm font-medium bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Sort feeds"
                  >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                </div>

                <div className="rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 p-2.5 sm:col-span-2 xl:col-span-1">
                  <span className="favorites-filter-label mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">View</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setViewMode('card')}
                      className={`inline-flex items-center justify-center h-10 rounded-lg border transition-colors ${viewMode === 'card'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-600'
                        }`}
                      aria-label="Card view"
                      title="Card view"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                        <rect x="3" y="4" width="8" height="7" rx="1.5" />
                        <rect x="13" y="4" width="8" height="7" rx="1.5" />
                        <rect x="3" y="13" width="8" height="7" rx="1.5" />
                        <rect x="13" y="13" width="8" height="7" rx="1.5" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className={`inline-flex items-center justify-center h-10 rounded-lg border transition-colors ${viewMode === 'list'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-600'
                        }`}
                      aria-label="List view"
                      title="List view"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
                        <line x1="4" y1="7" x2="20" y2="7" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="17" x2="20" y2="17" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-gray-600 dark:text-gray-300">Loading feed data...</div>
        ) : (
          <>
            <div className={viewMode === 'list' ? 'grid grid-cols-1 gap-4' : 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
              {paginatedFeeds.map((feed) =>
                viewMode === 'list' ? (
                  <article
                    key={feed.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 p-4"
                  >
                    {feed.imageUrl && (
                      <img src={feed.imageUrl} alt={feed.title} className="h-20 w-28 shrink-0 rounded-lg object-cover" />
                    )}
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {feed.category ?? 'Uncategorised'}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(feed.publishedAt).toLocaleDateString('en-AU')}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{feed.title}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">By {feed.author?.name ?? 'Unknown author'}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Link
                        href={`/rss-client/${feed.id}`}
                        className="inline-flex rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700"
                      >
                        Read more
                      </Link>
                      <a
                        href={feed.link ?? '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Open link
                      </a>
                    </div>
                  </article>
                ) : (
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

                      <div className="mt-5 flex items-center gap-3">
                        <Link
                          href={`/rss-client/${feed.id}`}
                          className="inline-flex rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700"
                        >
                          Read more
                        </Link>
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
                )
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-gray-300 dark:border-slate-600 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-gray-300 dark:border-slate-600 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
