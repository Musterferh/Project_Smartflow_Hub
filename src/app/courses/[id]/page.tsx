'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCourseById, getCoursesByCategory } from '@/data/courses';
import { useCourseContext } from '@/context/CourseContext';
import CourseCard from '@/components/CourseCard/CourseCard';
import { ArrowLeft, User, Clock, BarChart, CheckCircle2, Star, Check, Plus, ArrowRight, Lock } from 'lucide-react';
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
            <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Courses
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
            <User size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> {course.instructor} &nbsp;•&nbsp; <Clock size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> {course.duration} &nbsp;•&nbsp; <BarChart size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> {course.level}
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
                <li><CheckCircle2 size={16} style={{ marginRight: '8px', color: '#10b981', verticalAlign: 'middle' }} /> Industry-relevant skills taught by expert practitioners</li>
                <li><CheckCircle2 size={16} style={{ marginRight: '8px', color: '#10b981', verticalAlign: 'middle' }} /> Hands-on projects and real-world case studies</li>
                <li><CheckCircle2 size={16} style={{ marginRight: '8px', color: '#10b981', verticalAlign: 'middle' }} /> Weekly live sessions and Q&A with the instructor</li>
                <li><CheckCircle2 size={16} style={{ marginRight: '8px', color: '#10b981', verticalAlign: 'middle' }} /> Certificate of completion upon finishing the course</li>
                <li><CheckCircle2 size={16} style={{ marginRight: '8px', color: '#10b981', verticalAlign: 'middle' }} /> Lifetime access to course materials and updates</li>
                <li><CheckCircle2 size={16} style={{ marginRight: '8px', color: '#10b981', verticalAlign: 'middle' }} /> Private community of fellow learners</li>
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
                  <span className={styles.stars}>
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </span>
                  <span className={styles.ratingValue}>{course.rating}</span>
                </div>
              </div>

              <div className={styles.metaList}>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}><Clock size={20} /></span>
                  <div>
                    <div className={styles.metaLabel}>Duration</div>
                    <div className={styles.metaValue}>{course.duration}</div>
                  </div>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}><User size={20} /></span>
                  <div>
                    <div className={styles.metaLabel}>Instructor</div>
                    <div className={styles.metaValue}>{course.instructor}</div>
                  </div>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}><BarChart size={20} /></span>
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
                {selected ? <><Check size={20} style={{ marginRight: '8px' }} /> Added to Selection</> : <><Plus size={20} style={{ marginRight: '8px' }} /> Add to My Selection</>}
              </button>

              {selected && (
                <Link href="/selection" className={`btn btn-secondary btn-lg ${styles.viewSelectionBtn}`}>
                  View My Selection <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                </Link>
              )}

              <p className={styles.moneyBack}>
                <Lock size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Secure registration &nbsp;•&nbsp; 30-day money-back guarantee
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
