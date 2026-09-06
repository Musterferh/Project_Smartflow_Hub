import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
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
              <Image src="/logo.png" alt="SMARTFLOW HUB Logo" width={48} height={48} className={styles.logoImage} />
              <span>
                <span className={styles.logoMain}>SMARTFLOW</span>
                <span className={styles.logoSub}> HUB</span>
              </span>
            </Link>
            <p className={styles.tagline}>
              Empowering ambitious learners with expert-led courses in technology, development, and AI.
            </p>

            {/* Contact Info */}
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <Mail size={15} />
                <span>info@smartflowgroupltd.com</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={15} />
                <span>+234 815 418 4722</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={15} />
                <span>NO.B5 HD Plaza, Ahmadu Bello Way, Bauchi</span>
              </div>
            </div>

            <a
              href="https://wa.me/2348154184722"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <MessageSquare size={16} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Links */}
          <div className={styles.linksGrid}>
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Platform</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/courses">All Courses</Link></li>
                <li><Link href="/register">Register Free</Link></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Categories</h4>
              <ul>
                <li><Link href="/courses">Foundation &amp; AI</Link></li>
                <li><Link href="/courses">Comprehensive Dev</Link></li>
                <li><Link href="/courses">Advanced Web</Link></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Contact</h4>
              <ul>
                <li><Link href="/#contact">Send a Message</Link></li>
                <li>
                  <a href="https://wa.me/2348154184722" target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </li>
                <li><Link href="/#contact">Get Support</Link></li>
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
          </div>
        </div>

      </div>
    </footer>
  );
}
