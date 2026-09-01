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
    course: 'Full Stack Development',
    verified: 'Verified Graduate',
  },
  {
    name: 'Chloe Beaumont',
    role: 'UX Designer',
    text: 'The UI/UX Design course gave me the confidence and portfolio pieces to land my dream job. The instructors are world-class.',
    avatar: 'CB',
    course: 'Advanced Web & UX',
    verified: 'Verified Graduate',
  },
  {
    name: 'Kwame Mensah',
    role: 'Startup Founder',
    text: 'The Startup Launch Accelerator was exactly what I needed. We secured our first round of funding three months after completing the program.',
    avatar: 'KM',
    course: 'Prompt Engineering & AI',
    verified: 'Verified Alumni',
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
        <div className={styles.featuredGlow} />
        <div className="container">
          <div className={`section-header ${styles.sectionHeader}`}>
            <span className={styles.featuredBadge}>✨ HAND-PICKED FOR YOU</span>
            <h2 className={`section-title ${styles.featuredTitle}`}>Featured Courses</h2>
            <div className={styles.featuredDivider} />
            <p className={styles.featuredSubtitle}>
              Our most popular courses, highly rated by thousands of ambitious learners worldwide.
            </p>
          </div>

          <div className={styles.coursesGrid}>
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className={styles.viewAllWrapper}>
            <Link href="/courses" className={styles.viewAllBtn}>
              <span>View All {courses.length} Courses</span>
              <span className={styles.viewAllArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className={`section ${styles.howSection}`}>
        <div className={styles.howGlow} />
        <div className="container">
          <div className={`section-header ${styles.sectionHeader}`}>
            <span className={styles.howBadge}>⚡ SIMPLE PROCESS</span>
            <h2 className={`section-title ${styles.howTitle}`}>How It Works</h2>
            <div className={styles.howDivider} />
            <p className={styles.howSubtitle}>
              Start your learning journey in three quick, seamless steps.
            </p>
          </div>

          <div className={styles.stepsWrapper}>
            <div className={styles.connectingLine} />
            <div className={styles.stepsGrid}>
              {steps.map((step, i) => (
                <div key={step.title} className={styles.stepCard}>
                  <div className={styles.stepHeader}>
                    <div className={styles.stepIconContainer}>
                      <span className={styles.stepIcon}>{step.icon}</span>
                    </div>
                    <span className={styles.stepBadge}>Step 0{i + 1}</span>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className={`section ${styles.testimonialSection}`}>
        <div className={styles.testimonialGlow} />
        <div className={styles.testimonialOrb} />
        <div className="container">
          <div className={`section-header ${styles.sectionHeader}`}>
            <span className={styles.testimonialBadge}>💬 STUDENT STORIES</span>
            <h2 className={`section-title ${styles.lightTitle}`}>What Our Students Say</h2>
            <div className={styles.testimonialDivider} />
            <p className={styles.testimonialSubtitle}>
              Real stories from ambitious learners who transformed their skills and landed dream roles with SMARTFLOW HUB.
            </p>
          </div>

          <div className={styles.testimonialGrid}>
            {testimonials.map((t) => (
              <div key={t.name} className={styles.testimonialCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.testimonialStars}>
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <span className={styles.verifiedBadge}>✓ {t.verified}</span>
                </div>
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.courseTag}>
                  <span>🎓 Course:</span> <strong>{t.course}</strong>
                </div>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.avatarWrapper}>
                    <div className={styles.avatar}>{t.avatar}</div>
                    <span className={styles.onlineDot} />
                  </div>
                  <div className={styles.authorMeta}>
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
            <div className={styles.ctaOrb1} />
            <div className={styles.ctaOrb2} />
            
            <div className={styles.ctaBadgeWrapper}>
              <span className={styles.ctaBadge}>🚀 TAKE THE NEXT STEP</span>
              <span className={styles.ctaLiveCount}>● 10,000+ Enrolled</span>
            </div>

            <h2 className={styles.ctaTitle}>
              Ready to <span className={styles.ctaHighlight}>Start Learning?</span>
            </h2>
            
            <div className={styles.ctaBtns}>
              <Link href="/courses" className={styles.ctaPrimaryBtn}>
                <span>Explore Courses</span>
                <span className={styles.ctaArrow}>→</span>
              </Link>
              <Link href="/register" className={styles.ctaSecondaryBtn}>
                <span>Register Free</span>
                <span className={styles.ctaSparkle}>✨</span>
              </Link>
            </div>

            <div className={styles.ctaFeaturesGrid}>
              <div className={styles.ctaFeatureCard}>
                <span className={styles.ctaFeatureIcon}>⚡</span>
                <span className={styles.ctaFeatureText}>Instant Lifetime Access</span>
              </div>
              <div className={styles.ctaFeatureCard}>
                <span className={styles.ctaFeatureIcon}>🎓</span>
                <span className={styles.ctaFeatureText}>Verified Certificate</span>
              </div>
              <div className={styles.ctaFeatureCard}>
                <span className={styles.ctaFeatureIcon}>🔒</span>
                <span className={styles.ctaFeatureText}>100% Risk Free Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
