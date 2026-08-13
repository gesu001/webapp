"use client";

import BlogCard from '@/app/components/BlogCard';
import { blogPosts } from '@/app/components/blogPosts';
import { useFavorites } from '@/app/context/FavoritesContext';
import { usePreferences } from '@/app/context/PreferencesContext';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type SortMode = 'latest' | 'oldest';
type ViewMode = 'card' | 'list';
type CategoryFilter = 'all' | string;

export default function FavoritesPage() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const { preferences } = usePreferences();

  const [sortMode, setSortMode] = useState<SortMode>('latest');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

  const favoritePosts = useMemo(
    () => blogPosts.filter((post) => favoriteIds.includes(post.id)),
    [favoriteIds]
  );

  const gridClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[preferences.cardsPerRow];

  const spacingClass = preferences.compactLayout ? 'py-8' : 'py-12';
  const summaryClass = preferences.compactLayout ? 'mb-6 p-3' : 'mb-8 p-4';
  const gapClass = preferences.compactLayout ? 'gap-4' : 'gap-6';

  const sortedPosts = useMemo(() => {
    const posts = [...favoritePosts];
    posts.sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return sortMode === 'latest' ? timeB - timeA : timeA - timeB;
    });
    return posts;
  }, [favoritePosts, sortMode]);

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(favoritePosts.map((post) => post.category)))],
    [favoritePosts]
  );

  const filteredPosts = useMemo(() => {
    if (categoryFilter === 'all') {
      return sortedPosts;
    }
    return sortedPosts.filter((post) => post.category === categoryFilter);
  }, [categoryFilter, sortedPosts]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));

  useEffect(() => {
    setCurrentPage(1);
  }, [sortMode, viewMode, categoryFilter, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [currentPage, filteredPosts, pageSize]);

  return (
    <div className="flex-1 w-full bg-white dark:bg-black">
      <section className="bg-linear-to-r from-amber-600 to-amber-800 dark:from-amber-900 dark:to-amber-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">My Favorites</h1>
          <p className="text-lg text-amber-100">
            Your saved feed posts with the same filters and views as the main feeds page
          </p>
        </div>
      </section>

      <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${spacingClass}`}>
        <div className={`favorites-filter-panel ${summaryClass} bg-amber-50 dark:bg-slate-800 rounded-lg border border-amber-200 dark:border-slate-700`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Favorited Posts:</strong> {favoritePosts.length}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  (Showing {filteredPosts.length})
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage your saved articles and quickly revisit the content you care about most.
              </p>
            </div>

            <div className="w-full lg:w-auto lg:min-w-140">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                <div className="rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 p-2.5">
                  <label
                    htmlFor="filterFavoritesCategory"
                    className="favorites-filter-label mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide"
                  >
                    Category
                  </label>
                  <select
                    id="filterFavoritesCategory"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                    className="favorites-filter-select w-full px-3 py-2 rounded-lg text-sm font-medium bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Filter favorite posts by category"
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
                    htmlFor="sortFavorites"
                    className="favorites-filter-label mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide"
                  >
                    Sort
                  </label>
                  <select
                    id="sortFavorites"
                    value={sortMode}
                    onChange={(e) => setSortMode(e.target.value as SortMode)}
                    className="favorites-filter-select w-full px-3 py-2 rounded-lg text-sm font-medium bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Sort favorite posts"
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
                      className={`inline-flex items-center justify-center h-10 rounded-lg border transition-colors ${
                        viewMode === 'card'
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
                      className={`inline-flex items-center justify-center h-10 rounded-lg border transition-colors ${
                        viewMode === 'list'
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

        <div className={viewMode === 'list' ? 'grid grid-cols-1 gap-4' : `grid ${gridClass} ${gapClass}`}>
          {paginatedPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              showReadTime={preferences.showReadTime}
              compactLayout={preferences.compactLayout}
              viewMode={viewMode}
              isFavorite={isFavorite(post.id)}
              onToggleFavorite={toggleFavorite}
              detailContext="favorites"
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg font-medium bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {favoritePosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              You have not favorited any posts yet.
            </p>
            <Link
              href="/feeds"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Browse Feeds
            </Link>
          </div>
        )}

        {favoritePosts.length > 0 && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No favorite posts match this category.
            </p>
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Show All Favorites
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
