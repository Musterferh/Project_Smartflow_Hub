'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCourseById, getCoursesByCategory } from '@/data/courses';
import { useCourseContext } from '@/context/CourseContext';
import CourseCard from '@/components/CourseCard/CourseCard';
import styles from './page.module.css';

function getCategoryBadgeClass(category: string): string {
  if (category.includes('Technology')) return 'badge-tech';
  if (category.includes('Business')) return 'badge-business';
  if (category.includes('Design')) return 'badge-design';
  if (category.includes('Health')) return 'badge-health';
  return 'badge-personal';
}

interface PageProps {
  params: { id: string };
}

export default function CourseDetailPage({ params }: PageProps) {
  const course = getCourseById(params.id);
  if (!course) notFound();

  const { addCourse, removeCourse, isSelected } = useCourseContext();
  const selected = isSelected(course.id);

  const relatedCourses = getCoursesByCategory(course.category)
    .filter((c) => c.id !== course.id)
    .slice(0, 3);

  const handleToggle = () => {
    if (selected) {
      removeCourse(course.id);
    } else {
      addCourse(course);
    }
  };

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link href="/courses" className={styles.backLink}>
            ← Back to Courses
          </Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{course.title}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className={styles.bannerImage}
          priority
          sizes="100vw"
        />
        <div className={styles.bannerOverlay} />
        <div className={`container ${styles.bannerContent}`}>
          <span className={`badge ${getCategoryBadgeClass(course.category)} ${styles.catBadge}`}>
            {course.category}
          </span>
          <h1 className={styles.courseTitle}>{course.title}</h1>
          <p className={styles.courseMeta}>
            👤 {course.instructor} &nbsp;•&nbsp; ⏱ {course.duration} &nbsp;•&nbsp; 📊 {course.level}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className={styles.layout}>
          {/* Left: Details */}
          <div className={styles.main}>
            <section className={styles.card}>
              <h2 className={styles.sectionTitle}>About This Course</h2>
              <p className={styles.description}>{course.description}</p>

              <div className={styles.tags}>
                {course.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>#{tag}</span>
                ))}
              </div>
            </section>

            <section className={styles.card}>
              <h2 className={styles.sectionTitle}>What You&apos;ll Learn</h2>
              <ul className={styles.learnList}>
                <li>✅ Industry-relevant skills taught by expert practitioners</li>
                <li>✅ Hands-on projects and real-world case studies</li>
                <li>✅ Weekly live sessions and Q&A with the instructor</li>
                <li>✅ Certificate of completion upon finishing the course</li>
                <li>✅ Lifetime access to course materials and updates</li>
                <li>✅ Private community of fellow learners</li>
              </ul>
            </section>

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <section className={styles.relatedSection}>
                <h2 className={styles.sectionTitle}>Related Courses</h2>
                <div className={styles.relatedGrid}>
                  {relatedCourses.map((c) => (
                    <CourseCard key={c.id} course={c} compact />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: Sticky Card */}
          <aside className={styles.sidebar}>
            <div className={styles.stickyCard}>
              <div className={styles.priceRow}>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>₦{course.price.toLocaleString()}</span>
                  {course.originalPrice && (
                    <span className={styles.originalPrice}>₦{course.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <div className={styles.rating}>
                  <span className={styles.stars}>★★★★★</span>
                  <span className={styles.ratingValue}>{course.rating}</span>
                </div>
              </div>

              <div className={styles.metaList}>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>⏱</span>
                  <div>
                    <div className={styles.metaLabel}>Duration</div>
                    <div className={styles.metaValue}>{course.duration}</div>
                  </div>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>👤</span>
                  <div>
                    <div className={styles.metaLabel}>Instructor</div>
                    <div className={styles.metaValue}>{course.instructor}</div>
                  </div>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>📊</span>
                  <div>
                    <div className={styles.metaLabel}>Level</div>
                    <div className={styles.metaValue}>{course.level}</div>
                  </div>
                </div>
              </div>

              <button
                className={`btn btn-lg ${selected ? styles.selectedBtn : 'btn-primary'} ${styles.addBtn}`}
                onClick={handleToggle}
                id={`detail-select-${course.id}`}
              >
                {selected ? '✓ Added to Selection' : '+ Add to My Selection'}
              </button>

              {selected && (
                <Link href="/selection" className={`btn btn-secondary btn-lg ${styles.viewSelectionBtn}`}>
                  View My Selection →
                </Link>
              )}

              <p className={styles.moneyBack}>
                🔒 &nbsp;Secure registration &nbsp;•&nbsp; 30-day money-back guarantee
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
