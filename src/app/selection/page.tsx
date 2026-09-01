'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCourseContext } from '@/context/CourseContext';
import { ClipboardList, User, Clock, BarChart, ArrowRight, ArrowLeft, Lock } from 'lucide-react';
import styles from './page.module.css';

export default function SelectionPage() {
  const { selectedCourses, removeCourse, totalPrice, totalCount } = useCourseContext();

  if (selectedCourses.length === 0) {
    return (
      <div>
        <div className="page-hero">
          <div className="container">
            <h1>My Selection</h1>
            <p>Review and manage the courses you&apos;ve chosen before registering.</p>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="empty-state">
              <div className="empty-state-icon"><ClipboardList size={48} strokeWidth={1.5} /></div>
              <h3>Your selection is empty</h3>
              <p>
                Browse our catalog and add courses to your selection. You can register for multiple courses at once!
              </p>
              <Link href="/courses" className="btn btn-primary btn-lg">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>My Selection</h1>
          <p>{totalCount} course{totalCount !== 1 ? 's' : ''} selected — ready to register!</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* Course List */}
            <div className={styles.courseList}>
              <h2 className={styles.listTitle}>Selected Courses</h2>
              {selectedCourses.map((course) => (
                <div key={course.id} className={styles.courseRow}>
                  <div className={styles.courseImage}>
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      fill
                      className={styles.img}
                      sizes="80px"
                    />
                  </div>
                  <div className={styles.courseInfo}>
                    <Link href={`/courses/${course.id}`} className={styles.courseTitle}>
                      {course.title}
                    </Link>
                      <span><User size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} /> {course.instructor}</span>
                      <span><Clock size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} /> {course.duration}</span>
                      <span><BarChart size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} /> {course.level}</span>
                  </div>
                  <div className={styles.courseRight}>
                    <span className={styles.coursePrice}>₦{course.price.toLocaleString()}</span>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCourse(course.id)}
                      aria-label={`Remove ${course.title}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Card */}
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRows}>
                {selectedCourses.map((course) => (
                  <div key={course.id} className={styles.summaryRow}>
                    <span className={styles.summaryCourseName}>{course.title}</span>
                    <span className={styles.summaryPrice}>₦{course.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className={styles.divider} />

              <div className={styles.totalRow}>
                <span>Total</span>
                <span className={styles.totalPrice}>₦{totalPrice.toLocaleString()}</span>
              </div>

              <Link
                href="/register"
                className={`btn btn-primary btn-lg ${styles.registerBtn}`}
              >
                Proceed to Registration <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </Link>

              <Link href="/courses" className={`btn btn-secondary ${styles.continueBtn}`}>
                <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Add More Courses
              </Link>

              <p className={styles.secureNote}>
                <Lock size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Secure & encrypted registration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
