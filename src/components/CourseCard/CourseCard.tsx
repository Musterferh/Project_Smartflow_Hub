'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types';
import { Star, Clock, Check } from 'lucide-react';
import styles from './CourseCard.module.css';

function getCategoryBadgeClass(category: string): string {
  if (category.includes('Technology')) return 'badge-tech';
  if (category.includes('Business')) return 'badge-business';
  if (category.includes('Design')) return 'badge-design';
  if (category.includes('Health')) return 'badge-health';
  return 'badge-personal';
}

function getLevelBadgeClass(level: string): string {
  if (level === 'Beginner') return 'badge-level-beginner';
  if (level === 'Intermediate') return 'badge-level-intermediate';
  return 'badge-level-advanced';
}



interface CourseCardProps {
  course: Course;
  compact?: boolean;
}

export default function CourseCard({ course, compact = false }: CourseCardProps) {
  return (
    <div className={styles.card}>
      {/* Image */}
      <Link href={`/courses/${course.id}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.imageOverlay} />
          {course.featured && (
            <span className={styles.featuredBadge}><Star size={12} fill="currentColor" style={{ marginRight: '4px' }} /> Featured</span>
          )}
          <span className={`badge ${getLevelBadgeClass(course.level)} ${styles.levelBadge}`}>
            {course.level}
          </span>
        </div>
      </Link>

      {/* Body */}
      <div className={styles.body}>
        <span className={`badge ${getCategoryBadgeClass(course.category)} ${styles.categoryBadge}`}>
          {course.category}
        </span>

        <h3 className={styles.title}>
          <Link href={`/courses/${course.id}`} className={styles.titleLink}>
            {course.title}
          </Link>
        </h3>

        {!compact && (
          <p className={styles.description}>{course.description.slice(0, 100)}...</p>
        )}

        {/* Meta */}
        <div className={styles.meta}>
          <span className={styles.duration}><Clock size={14} style={{ marginRight: '4px' }} /> {course.duration}</span>
        </div>



        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.priceSeats}>
            <div className={styles.priceContainer}>
              <span className={styles.price}>₦{course.price.toLocaleString()}</span>
              {course.originalPrice && (
                <span className={styles.originalPrice}>₦{course.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>
          <Link
            href={`/register?courseId=${course.id}`}
            className={styles.toggleBtn}
            aria-label={`Enroll in ${course.title}`}
          >
            Enroll Now <Check size={16} style={{ marginLeft: '4px' }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
