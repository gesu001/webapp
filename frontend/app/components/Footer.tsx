export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Student:</strong> Ge Su
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Student ID:</strong> 21724222
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2026-CSE5006-T4-W - Cloud-Base Web Application
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              RSS2LMS
            </p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built with React & Next.js
            </p>
            <a
              href="https://github.com/gesu001/rss2lms"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              aria-label="Open RSS2LMS GitHub repository"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
