'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', href: '/' }];

    paths.forEach((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      const label = path.charAt(0).toUpperCase() + path.slice(1);
      breadcrumbs.push({ label, href });
    });

    return breadcrumbs;
  };

  if (!isClient) {
    return null;
  }

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length === 1 && pathname === '/') {
    return null;
  }

  return (
    <nav className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && <span className="text-gray-400 dark:text-gray-600 mx-2">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="breadcrumb-link text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300!
                    transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
