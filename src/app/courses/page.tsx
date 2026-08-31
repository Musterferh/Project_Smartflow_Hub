'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { courses, categories } from '@/data/courses';
import CourseCard from '@/components/CourseCard/CourseCard';
import { useCourseContext } from '@/context/CourseContext';
import styles from './page.module.css';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { totalCount } = useCourseContext();

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        activeCategory === 'All' || course.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.instructor.toLowerCase().includes(q) ||
        course.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <h1>Explore All Courses</h1>
          <p>
            {courses.length} expert-led courses across 5 categories. Find your next skill and register today.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {/* Search + Filter */}
          <div className={styles.controls}>
            <div className={styles.searchWrapper}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                id="course-search"
                type="text"
                placeholder="Search by title, instructor, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Search courses"
              />
              {searchQuery && (
                <button
                  className={styles.clearBtn}
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className={styles.filterPills} role="group" aria-label="Filter by category">
              <button
                className={`${styles.pill} ${activeCategory === 'All' ? styles.pillActive : ''}`}
                onClick={() => setActiveCategory('All')}
              >
                All ({courses.length})
              </button>
              {categories.map((cat) => {
                const count = courses.filter((c) => c.category === cat).length;
                return (
                  <button
                    key={cat}
                    className={`${styles.pill} ${activeCategory === cat ? styles.pillActive : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat.split(' &')[0]} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count */}
          <div className={styles.resultsBar}>
            <p className={styles.resultsCount}>
              {filteredCourses.length === 0
                ? 'No courses found'
                : `Showing ${filteredCourses.length} course${filteredCourses.length !== 1 ? 's' : ''}`}
              {activeCategory !== 'All' && (
                <span className={styles.categoryLabel}> in {activeCategory}</span>
              )}
            </p>
          </div>

          {/* Grid */}
          {filteredCourses.length > 0 ? (
            <div className={styles.grid}>
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🎓</div>
              <h3>No courses found</h3>
              <p>Try adjusting your search or category filter to find what you&apos;re looking for.</p>
              <button
                className="btn btn-primary"
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Selection Badge */}
      {totalCount > 0 && (
        <Link href="/selection" className="floating-badge" aria-label={`View selection: ${totalCount} courses`}>
          <span>My Selection</span>
          <span className="count">{totalCount}</span>
        </Link>
      )}
    </div>
  );
}
