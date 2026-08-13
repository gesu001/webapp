'use client';

import { useTheme } from '@/app/context/ThemeContext';
import Link from 'next/link';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-3 py-3 sm:py-0 sm:h-16">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
              <Link
                href="/"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Go to homepage"
              >
                RSS2LMS
              </Link>
            </h1>
          </div>
          <a
            href="https://github.com/gesu001/rss2lms"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-300"
            aria-label="Open RSS2LMS GitHub repository"
          >
            GitHub
          </a>
          <a
            href="https://github.com/gesu001/rss2lms"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden inline-flex items-center justify-center shrink-0 w-10 h-10 rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Open RSS2LMS GitHub repository"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.36 6.84 9.72.5.1.68-.22.68-.5 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.22-3.37-1.22-.45-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.05A9.24 9.24 0 0112 6.84c.85 0 1.7.12 2.5.35 1.9-1.32 2.74-1.05 2.74-1.05.56 1.42.21 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.95-2.33 4.81-4.56 5.07.36.32.68.93.68 1.88 0 1.36-.01 2.45-.01 2.78 0 .27.18.6.69.5A10.25 10.25 0 0022 12.25C22 6.59 17.52 2 12 2z" />
            </svg>
          </a>
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn inline-flex items-center justify-center shrink-0 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors 
              bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white 
              hover:bg-gray-200 dark:hover:bg-slate-700! dark:hover:text-white!
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </div>
      </div>
    </header>
  );
}
