import Link from 'next/link';
import { Zap } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Zap className={styles.logoIcon} size={24} />
              <span>
                <span className={styles.logoMain}>SMARTFLOW</span>
                <span className={styles.logoSub}> HUB</span>
              </span>
            </div>
            <p className={styles.tagline}>
              Empowering lifelong learners with world-class courses across technology, business, design, and wellness.
            </p>
          </div>

          {/* Links */}
          <div className={styles.linksGrid}>
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Platform</h4>
              <ul>
                <li><Link href="/courses">All Courses</Link></li>
                <li><Link href="/selection">My Selection</Link></li>
                <li><Link href="/register">Register</Link></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Categories</h4>
              <ul>
                <li><Link href="/courses?category=Technology+%26+Programming">Technology</Link></li>
                <li><Link href="/courses?category=Business+%26+Entrepreneurship">Business</Link></li>
                <li><Link href="/courses?category=Design+%26+Creative+Arts">Design</Link></li>
                <li><Link href="/courses?category=Health+%26+Wellness">Health</Link></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Company</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/about">Instructors</Link></li>
                <li><Link href="/about">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} SMARTFLOW HUB. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
