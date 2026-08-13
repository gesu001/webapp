export interface BlogPost {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  category: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with RSS Feeds',
    date: '2026-07-20',
    summary:
      'Learn the basics of RSS feeds and how they can revolutionize content delivery in educational settings.',
    content: `
      RSS (Really Simple Syndication) is a web feed format that allows users to access updates from websites
      in a standardized computer-readable format. This is particularly valuable in learning management systems
      where instructors can syndicate course content, announcements, and resources.
      
      In this article, we explore how RSS feeds work, their benefits for educational environments, and how
      the RSS2LMS application bridges the gap between content providers and learners.
    `,
    category: 'Technology',
    readTime: 5,
  },
  {
    id: '2',
    title: 'Building User-Centric Learning Interfaces',
    date: '2026-07-18',
    summary:
      'Discover design principles and best practices for creating intuitive learning management systems.',
    content: `
      User experience is paramount in educational technology. A well-designed interface can significantly
      impact student engagement and learning outcomes. This article covers key UX principles including
      navigation clarity, accessibility, responsive design, and user feedback mechanisms.
      
      We discuss how these principles have been applied to the RSS2LMS frontend, ensuring students and
      educators can easily navigate, search for, and organize their learning content.
    `,
    category: 'Design',
    readTime: 7,
  },
  {
    id: '3',
    title: 'Accessibility in Web Applications',
    date: '2026-07-15',
    summary:
      'Making your web applications accessible to everyone through WCAG guidelines and best practices.',
    content: `
      Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact
      with the web. The Web Content Accessibility Guidelines (WCAG) provide a comprehensive framework for creating
      accessible digital content.
      
      Key considerations include: semantic HTML structure, color contrast ratios, keyboard navigation support,
      ARIA labels, and form accessibility. The RSS2LMS application implements these standards to ensure all
      students, regardless of ability, can access learning materials.
    `,
    category: 'Accessibility',
    readTime: 8,
  },
  {
    id: '4',
    title: 'Responsive Design for Mobile Learning',
    date: '2026-07-12',
    summary:
      'Create responsive interfaces that work seamlessly across devices, enabling learning on the go.',
    content: `
      Mobile-first design is essential in modern educational technology. With increasing numbers of students
      accessing learning platforms from smartphones and tablets, responsive design is no longer optional—it's mandatory.
      
      This article explores mobile-first design principles, CSS media queries, flexible layouts, and testing strategies.
      The RSS2LMS frontend uses Tailwind CSS utilities to deliver a fluid experience across all screen sizes.
    `,
    category: 'Design',
    readTime: 6,
  },
  {
    id: '5',
    title: 'Dark Mode: More Than Just Aesthetics',
    date: '2026-07-10',
    summary:
      'Implementing dark mode improves user comfort and accessibility while reducing eye strain.',
    content: `
      Dark mode has evolved from a trendy feature to an accessibility requirement. Studies show that dark mode
      reduces eye strain, improves readability in low-light conditions, and extends device battery life for OLED screens.
      
      Beyond aesthetics, dark mode implementation requires careful consideration of color contrast ratios, ensuring
      that dark and light text remains readable. The RSS2LMS application provides seamless light/dark mode switching
      with theme persistence using local storage.
    `,
    category: 'Technology',
    readTime: 5,
  },
  {
    id: '6',
    title: 'React Best Practices for Educational Apps',
    date: '2026-07-08',
    summary:
      'Patterns and practices for building scalable, maintainable React applications in education technology.',
    content: `
      React's component-based architecture makes it ideal for building complex educational interfaces.
      This article covers: component composition, state management with Context API, custom hooks, performance
      optimization, and testing strategies.
      
      We examine how these practices contribute to the RSS2LMS architecture, enabling features like theme switching,
      responsive navigation, and dynamic content rendering without compromising performance.
    `,
    category: 'Technology',
    readTime: 9,
  },
];
