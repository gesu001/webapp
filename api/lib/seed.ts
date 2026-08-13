import { prisma } from '@/lib/prisma';

const defaultFeeds = [
  {
    title: 'Getting Started with RSS Feeds',
    summary: 'Learn the basics of RSS feeds and how they support educational content delivery.',
    content:
      'RSS (Really Simple Syndication) is a web feed format that allows users to access updates from websites in a structured, machine-readable format. In learning environments, RSS helps instructors and students keep up with course announcements, blog posts, and external learning resources without manually checking multiple websites. This feed demonstrates how the backend can store and deliver content consistently to the RSS client.',
    link: 'https://example.com/rss/intro',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    category: 'Technology',
    source: 'RSS2LMS Editorial',
    authorName: 'RSS2LMS Editorial',
    publishedAt: '2026-08-01T09:00:00.000Z',
  },
  {
    title: 'Building User-Centric Learning Interfaces',
    summary: 'Design principles for creating intuitive educational interfaces and experiences.',
    content:
      'A strong learning interface is more than a collection of screens. It needs clear navigation, consistent visual hierarchy, and accessible interactions that support different user needs. This article explores how thoughtful UX decisions improve engagement, trust, and task completion for both learners and educators.',
    link: 'https://example.com/rss/design',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    category: 'Design',
    source: 'RSS2LMS Editorial',
    authorName: 'RSS2LMS Editorial',
    publishedAt: '2026-08-03T12:15:00.000Z',
  },
  {
    title: 'Accessibility in Web Applications',
    summary: 'Designing inclusive digital experiences using clear, resilient UI patterns.',
    content:
      'Accessibility is a core requirement rather than an optional enhancement. When developers build semantic layouts, support keyboard navigation, and respect contrast and labeling patterns, they improve usability for everyone. This feed introduces the mindset and practices needed for accessible digital learning environments.',
    link: 'https://example.com/rss/accessibility',
    imageUrl: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80',
    category: 'Accessibility',
    source: 'RSS2LMS Editorial',
    authorName: 'RSS2LMS Editorial',
    publishedAt: '2026-08-05T15:45:00.000Z',
  },
];

export async function ensureSeedData() {
  const feedCount = await prisma.feed.count();

  if (feedCount > 0) {
    return;
  }

  const author = await prisma.author.upsert({
    where: { name: 'RSS2LMS Editorial' },
    update: {},
    create: {
      name: 'RSS2LMS Editorial',
      email: 'editorial@rss2lms.local',
    },
  });

  await prisma.feed.createMany({
    data: defaultFeeds.map((feed) => ({
      title: feed.title,
      summary: feed.summary,
      content: feed.content,
      link: feed.link,
      imageUrl: feed.imageUrl,
      category: feed.category,
      source: feed.source,
      authorId: author.id,
      publishedAt: new Date(feed.publishedAt),
    })),
  });
}
