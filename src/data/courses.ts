import { Course } from '@/types';

export const courses: Course[] = [
  // Foundation & AI (20,000 NGN)
  {
    id: 'fai-001',
    title: 'Basic Web Development',
    description: 'Learn the fundamentals of web development. Build responsive and interactive websites from scratch using HTML, CSS, and basic JavaScript. Perfect for absolute beginners.',
    category: 'Foundation & AI',
    instructor: 'Expert Instructor',
    duration: '3 weeks',
    price: 20000,
    originalPrice: 30000,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
    rating: 4.8,
    level: 'Beginner',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Basics'],
    featured: true,
  },
  {
    id: 'fai-002',
    title: 'Prompt Engineering',
    description: 'Master the art of communicating with AI models. Learn advanced prompt design strategies to generate high-quality text, code, and images using ChatGPT and other LLMs.',
    category: 'Foundation & AI',
    instructor: 'AI Specialist',
    duration: '3 weeks',
    price: 20000,
    originalPrice: 30000,
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
    rating: 4.9,
    level: 'Beginner',
    tags: ['AI', 'Prompting', 'ChatGPT', 'LLMs'],
  },
  {
    id: 'fai-003',
    title: 'AI & Generative AI',
    description: 'Dive into the world of Artificial Intelligence. Understand how generative AI works under the hood and learn how to integrate AI tools into your daily workflow for maximum productivity.',
    category: 'Foundation & AI',
    instructor: 'AI Specialist',
    duration: '3 weeks',
    price: 20000,
    originalPrice: 30000,
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
    rating: 4.7,
    level: 'Beginner',
    tags: ['Generative AI', 'Machine Learning', 'Future Tech'],
    featured: true,
  },

  // Comprehensive Development (60,000 NGN)
  {
    id: 'comp-001',
    title: 'Full Stack Development',
    description: 'Become a complete developer. Master both frontend (React, Next.js) and backend (Node.js, Databases) technologies. Build scalable full-stack applications ready for production.',
    category: 'Comprehensive Development',
    instructor: 'Senior Engineer',
    duration: '9 weeks',
    price: 60000,
    originalPrice: 70000,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    rating: 4.9,
    level: 'Intermediate',
    tags: ['React', 'Node.js', 'Full Stack', 'Databases'],
    featured: true,
  },
  {
    id: 'comp-002',
    title: 'App Development',
    description: 'Learn to build native mobile applications for iOS and Android. Master modern frameworks like React Native or Flutter to deploy cross-platform apps with a single codebase.',
    category: 'Comprehensive Development',
    instructor: 'Mobile Developer',
    duration: '9 weeks',
    price: 60000,
    originalPrice: 70000,
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    rating: 4.8,
    level: 'Intermediate',
    tags: ['Mobile', 'iOS', 'Android', 'App Dev'],
  },
  {
    id: 'comp-003',
    title: 'Software Development',
    description: 'Master the principles of professional software engineering. Learn architecture, testing, version control, CI/CD, and agile methodologies used by top tech companies.',
    category: 'Comprehensive Development',
    instructor: 'Principal Architect',
    duration: '9 weeks',
    price: 60000,
    originalPrice: 70000,
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80',
    rating: 4.7,
    level: 'Advanced',
    tags: ['Architecture', 'Engineering', 'DevOps', 'Agile'],
  },

  // Advanced Web (40,000 NGN)
  {
    id: 'adv-001',
    title: 'Advanced Web Development',
    description: 'Take your web skills to the next level. Learn advanced React patterns, performance optimization, state management architectures, and building complex web platforms.',
    category: 'Advanced Web',
    instructor: 'Senior Frontend Dev',
    duration: '6 weeks',
    price: 40000,
    originalPrice: 50000,
    imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&q=80',
    rating: 4.9,
    level: 'Advanced',
    tags: ['Advanced React', 'Performance', 'Architecture'],
    featured: true,
  },
];

export const featuredCourses = courses.filter((c) => c.featured);

export const categories = [
  'Foundation & AI',
  'Comprehensive Development',
  'Advanced Web',
] as const;

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getCoursesByCategory(category: string): Course[] {
  return courses.filter((c) => c.category === category);
}
