import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { featuredCourses, courses } from '@/data/courses';
import CourseCard from '@/components/CourseCard/CourseCard';
import { Search, CheckCircle, GraduationCap, Rocket, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'SMARTFLOW HUB — Learn. Grow. Succeed.',
  description:
    'Register for world-class courses in technology, business, design, health, and personal development. Join 10,000+ learners at SMARTFLOW HUB.',
};

const stats = [
  { value: '500+', label: 'Courses Available' },
  { value: '10K+', label: 'Active Students' },
  { value: '120+', label: 'Expert Instructors' },
  { value: '95%', label: 'Completion Rate' },
];

const steps = [
  {
    icon: <Search size={32} />,
    title: 'Browse Courses',
    description: 'Explore our curated catalog of expert-led courses across 5 categories.',
  },
  {
    icon: <CheckCircle size={32} />,
    title: 'Build Your Selection',
    description: 'Add your favorite courses to your selection — mix and match freely.',
  },
  {
    icon: <GraduationCap size={32} />,
    title: 'Register & Learn',
    description: 'Complete registration in minutes and start your learning journey immediately.',
  },
];

const testimonials = [
  {
    name: 'Yemi Adebayo',
    role: 'Software Engineer',
    text: 'SMARTFLOW HUB completely transformed my career. The Full-Stack bootcamp was rigorous, practical, and worth every penny.',
    avatar: 'YA',
  },
  {
    name: 'Chloe Beaumont',
    role: 'UX Designer',
    text: 'The UI/UX Design course gave me the confidence and portfolio pieces to land my dream job. The instructors are world-class.',
    avatar: 'CB',
  },
  {
    name: 'Kwame Mensah',
    role: 'Startup Founder',
    text: 'The Startup Launch Accelerator was exactly what I needed. We secured our first round of funding three months after completing the program.',
    avatar: 'KM',
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* ====== HERO SECTION ====== */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOrbs}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.orb3} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <Rocket size={16} style={{ marginRight: '8px' }} /> The Future of Online Learning
          </div>
          <h1 className={styles.heroTitle}>
            Unlock Your Potential with{' '}
            <span className={styles.heroHighlight}>SMARTFLOW HUB</span>
          </h1>
          <p className={styles.heroSubtitle}>
            World-class courses designed by industry experts. Learn at your own pace,
            register with ease, and join a thriving community of ambitious learners.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/courses" className="btn btn-primary btn-lg">
              Browse Courses <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </Link>
            <Link href="/about" className="btn btn-outline btn-lg">
              Learn More
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        <div className={styles.statsBar}>
          <div className="container">
            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== ABOUT US SUMMARY ====== */}
      <section className={`section ${styles.aboutSection}`}>
        <div className="container">
          <div className={styles.aboutLayout}>
            <div className={styles.aboutText}>
              <p className={styles.sectionEyebrow}>ABOUT US</p>
              <h2 className="section-title">Transforming Lives Through Tech Education</h2>
              <div className="divider" />
              <p className={styles.aboutBody}>
                SMARTFLOW HUB is dedicated to providing high-quality, accessible education in technology and development. We bridge the gap between ambition and industry-ready skills.
              </p>
              <p className={styles.aboutBody}>
                Whether you're starting from scratch with Basic Web Development, diving into AI, or mastering Full Stack Engineering, our curriculum is designed to help you succeed in the digital economy.
              </p>
              <div style={{ marginTop: '16px' }}>
                <Link href="/about" className="btn btn-primary">
                  Read Our Full Story
                </Link>
              </div>
            </div>
            
            <div className={styles.aboutVisual}>
              <div className={styles.aboutImageWrapper}>
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                  alt="Students learning together"
                  fill
                  className={styles.aboutImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FEATURED COURSES ====== */}
      <section className={`section ${styles.featuredSection}`}>
        <div className="container">
          <div className={`section-header ${styles.sectionHeader}`}>
            <p className={styles.sectionEyebrow}>HAND-PICKED FOR YOU</p>
            <h2 className="section-title">Featured Courses</h2>
            <div className="divider" />
            <p className="section-subtitle">
              Our most popular courses, highly rated by thousands of students worldwide.
            </p>
          </div>
          <div className={styles.coursesGrid}>
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className={styles.viewAllWrapper}>
            <Link href="/courses" className="btn btn-navy btn-lg">
              View All {courses.length} Courses
            </Link>
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className={`section ${styles.howSection}`}>
        <div className="container">
          <div className={`section-header ${styles.sectionHeader}`}>
            <p className={styles.sectionEyebrow}>SIMPLE PROCESS</p>
            <h2 className="section-title">How It Works</h2>
            <div className="divider" />
            <p className="section-subtitle">
              Start your learning journey in three easy steps.
            </p>
          </div>
          <div className={styles.stepsGrid}>
            {steps.map((step, i) => (
              <div key={step.title} className={styles.stepCard}>
                <div className={styles.stepNumber}>0{i + 1}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className={`section ${styles.testimonialSection}`}>
        <div className="container">
          <div className={`section-header ${styles.sectionHeader}`}>
            <p className={styles.sectionEyebrow}>STUDENT STORIES</p>
            <h2 className={`section-title ${styles.lightTitle}`}>What Our Students Say</h2>
            <div className={styles.dividerLight} />
          </div>
          <div className={styles.testimonialGrid}>
            {testimonials.map((t) => (
              <div key={t.name} className={styles.testimonialCard}>
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.avatar}>{t.avatar}</div>
                  <div>
                    <div className={styles.authorName}>{t.name}</div>
                    <div className={styles.authorRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaGlow} />
            <h2 className={styles.ctaTitle}>Ready to Start Learning?</h2>
            <p className={styles.ctaSubtitle}>
              Join 10,000+ students already transforming their lives with SMARTFLOW HUB.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/courses" className="btn btn-primary btn-lg">
                Explore Courses
              </Link>
              <Link href="/register" className="btn btn-outline btn-lg">
                Register Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
