import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-1 w-full bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            RSS2LMS
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
            Bringing educational content to learners through intelligent RSS feed integration and learning management systems.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-slate-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg 
                  transition-shadow border border-gray-200 dark:border-slate-700"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Explore the Application
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/feeds"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg 
                transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                dark:focus:ring-offset-black"
            >
              View Feeds
            </Link>
            <Link
              href="/about"
              className="learn-more-btn px-8 py-4 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 
                text-gray-900 dark:text-white font-bold rounded-lg transition-colors 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 
                dark:focus:ring-offset-black"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    id: 1,
    icon: '📡',
    title: 'RSS Feed Integration',
    description:
      'Seamlessly aggregate content from multiple RSS feeds and deliver it to learners through an intuitive interface.',
  },
  {
    id: 2,
    icon: '🎓',
    title: 'LMS Integration',
    description:
      'Connect with learning management systems to synchronize content and track student engagement.',
  },
  {
    id: 3,
    icon: '🎨',
    title: 'Responsive Design',
    description:
      'Beautiful, accessible interface that works perfectly on desktop, tablet, and mobile devices.',
  },
  {
    id: 4,
    icon: '🌙',
    title: 'Theme Support',
    description:
      'Light and dark modes with automatic detection and persistent user preferences.',
  },
  {
    id: 5,
    icon: '♿',
    title: 'Accessibility First',
    description:
      'Built with WCAG guidelines ensuring content is accessible to all learners regardless of ability.',
  },
  {
    id: 6,
    icon: '⚡',
    title: 'Performance',
    description:
      'Optimized React components and Next.js features ensure fast, smooth user experience.',
  },
];

