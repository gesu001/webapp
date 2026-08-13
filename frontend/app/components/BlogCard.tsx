'use client';

import Link from 'next/link';
import type { BlogPost } from './blogPosts';

interface BlogCardProps {
  post: BlogPost;
  showReadTime: boolean;
  compactLayout: boolean;
  viewMode: 'card' | 'list';
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  detailContext?: 'feeds' | 'favorites';
}

export default function BlogCard({
  post,
  showReadTime,
  compactLayout,
  viewMode,
  isFavorite,
  onToggleFavorite,
  detailContext = 'feeds',
}: BlogCardProps) {
  const detailHref = `/feeds/${post.id}?from=${detailContext}`;

  const formattedDate = new Date(post.date).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const contentPadding = compactLayout ? 'p-4' : 'p-6';
  const titleClass = compactLayout ? 'text-lg mb-1' : 'text-xl mb-2';
  const summaryClampClass = compactLayout ? 'line-clamp-2' : 'line-clamp-3';

  if (viewMode === 'list') {
    return (
      <article
        className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg 
          transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-slate-700 
          hover:border-blue-400 dark:hover:border-blue-500"
      >
        <div className={`${contentPadding} flex flex-col md:flex-row md:items-start md:justify-between gap-4`}>
          <div className="min-w-0 flex-1">
            <div className={`flex flex-wrap gap-2 ${compactLayout ? 'mb-2' : 'mb-3'}`}>
              <span
                className="inline-block px-3 py-1 text-xs font-semibold rounded-full 
                  bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              >
                {post.category}
              </span>
              {showReadTime && (
                <span className="text-xs text-gray-500 dark:text-gray-400 self-center">
                  {post.readTime} min read
                </span>
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400 self-center">
                {formattedDate}
              </span>
            </div>

            <h3
              className={`${titleClass} font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
            >
              {post.title}
            </h3>

            <p className={`text-gray-700 dark:text-gray-300 ${compactLayout ? 'mb-0 line-clamp-2' : 'mb-0 line-clamp-3'}`}>
              {post.summary}
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => onToggleFavorite(post.id)}
              className={`mr-2 inline-flex items-center justify-center px-3 py-2 rounded-lg border transition-colors ${
                isFavorite
                  ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-700'
                  : 'bg-white text-gray-700 border-gray-300 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-500 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
              aria-label={isFavorite ? `Remove ${post.title} from favorites` : `Add ${post.title} to favorites`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                aria-hidden="true"
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3.5l2.78 5.63 6.22.9-4.5 4.39 1.06 6.2L12 17.7l-5.56 2.92 1.06-6.2-4.5-4.39 6.22-.9L12 3.5z"
                />
              </svg>
            </button>
            <Link
              href={detailHref}
              className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 
                dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium rounded-lg 
                transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-blue-500 dark:focus:ring-offset-slate-800"
              aria-label={`Read full article: ${post.title}`}
            >
              Read More →
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg 
        transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-slate-700 
        hover:border-blue-400 dark:hover:border-blue-500"
    >
      <div className={contentPadding}>
        <div className={`flex flex-wrap items-start justify-between gap-2 ${compactLayout ? 'mb-2' : 'mb-3'}`}>
          <div className="flex flex-wrap gap-2">
            <span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full 
                bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
            >
              {post.category}
            </span>
            {showReadTime && (
              <span className="text-xs text-gray-500 dark:text-gray-400 self-center">
                {post.readTime} min read
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite(post.id)}
            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors ${
              isFavorite
                ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-700'
                : 'bg-white text-gray-700 border-gray-300 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-500 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
            aria-label={isFavorite ? `Remove ${post.title} from favorites` : `Add ${post.title} to favorites`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              aria-hidden="true"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3.5l2.78 5.63 6.22.9-4.5 4.39 1.06 6.2L12 17.7l-5.56 2.92 1.06-6.2-4.5-4.39 6.22-.9L12 3.5z"
              />
            </svg>
          </button>
        </div>
        <h3
          className={`${titleClass} font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
        >
          {post.title}
        </h3>

        <p className={`text-sm text-gray-500 dark:text-gray-400 ${compactLayout ? 'mb-3' : 'mb-4'}`}>
          {formattedDate}
        </p>

        <p className={`text-gray-700 dark:text-gray-300 ${compactLayout ? 'mb-3' : 'mb-4'} ${summaryClampClass}`}>
          {post.summary}
        </p>

        <Link
          href={detailHref}
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 
            dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium rounded-lg 
            transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-blue-500 dark:focus:ring-offset-slate-800"
          aria-label={`Read full article: ${post.title}`}
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
