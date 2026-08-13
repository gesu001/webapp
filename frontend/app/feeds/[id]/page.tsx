import { blogPosts } from '@/app/components/blogPosts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageParams {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    from?: string;
  }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export default async function PostPage({ params, searchParams }: PageParams) {
  const { id } = await params;
  const { from } = await searchParams;
  const post = blogPosts.find((p) => p.id === id);

  const fromFavorites = from === 'favorites';
  const backHref = fromFavorites ? '/favorites' : '/feeds';
  const backLabel = fromFavorites ? '← Back to My Favorites' : '← Back to Feeds';

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex-1 w-full bg-white dark:bg-black">
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <Link
            href={backHref}
            className="inline-block mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 
              dark:hover:text-blue-300 font-medium transition-colors"
          >
            {backLabel}
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="inline-block px-3 py-1 text-sm font-semibold rounded-full 
                bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
            >
              {post.category}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 self-center">
              {post.readTime} min read
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>

          <time
            dateTime={post.date}
            className="text-gray-600 dark:text-gray-400 text-lg"
          >
            {formattedDate}
          </time>
        </header>

        {/* Article Content */}
        <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none mb-8">
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* Article Footer */}
        <footer className="border-t border-gray-200 dark:border-slate-700 pt-8">
          <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <strong>About this content:</strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This article is part of the RSS2LMS Assessment 1 demonstration. It showcases how RSS feed content
              will be displayed in the learning management system interface. The content structure supports rich text,
              metadata, and seamless navigation.
            </p>
            <Link
              href="/feeds"
              className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 
                dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              Explore More Posts
            </Link>
          </div>
        </footer>
      </article>

      {/* Related Posts */}
      <section className="bg-gray-50 dark:bg-slate-900 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Related Posts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter((p) => p.id !== post.id && p.category === post.category)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/feeds/${relatedPost.id}`}
                  className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow hover:shadow-lg 
                    transition-shadow border border-gray-200 dark:border-slate-700 
                    hover:border-blue-400 dark:hover:border-blue-500"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 
                    dark:hover:text-blue-400 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {relatedPost.summary}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
