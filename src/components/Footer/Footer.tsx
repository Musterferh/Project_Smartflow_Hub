import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGlow} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>⚡</span>
              <span>
                <span className={styles.logoMain}>SMARTFLOW</span>
                <span className={styles.logoSub}> HUB</span>
              </span>
            </Link>
            <p className={styles.tagline}>
              Empowering ambitious learners worldwide with expert-led courses across technology, business, design, and development.
            </p>
            <div className={styles.brandBadge}>
              <span className={styles.badgePulse} />
              <span>10,000+ Active Students</span>
            </div>
          </div>

          {/* Links */}
          <div className={styles.linksGrid}>
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Platform</h4>
              <ul>
                <li><Link href="/courses">All Courses</Link></li>
                <li><Link href="/selection">My Selection</Link></li>
                <li><Link href="/register">Register Free</Link></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Categories</h4>
              <ul>
                <li><Link href="/courses">Foundation & AI</Link></li>
                <li><Link href="/courses">Comprehensive Dev</Link></li>
                <li><Link href="/courses">Advanced Web</Link></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Company</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/about">Instructors</Link></li>
                <li><Link href="/about">Contact & Support</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} SMARTFLOW HUB. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="#">Privacy Policy</Link>
            <span className={styles.dot}>•</span>
            <Link href="#">Terms of Service</Link>
            <span className={styles.dot}>•</span>
            <Link href="#">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
