'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCourseContext } from '@/context/CourseContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const { totalCount } = useCourseContext();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/selection', label: 'My Selection' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image src="/logo.png" alt="SMARTFLOW HUB Logo" width={64} height={64} className={styles.logoImage} />
          <span>
            <span className={styles.logoMain}>SMARTFLOW</span>
            <span className={styles.logoSub}> HUB</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.label}
              {link.href === '/selection' && totalCount > 0 && (
                <span className={styles.navBadge}>{totalCount}</span>
              )}
            </Link>
          ))}
          <Link href="/register" className={`btn btn-primary btn-sm ${styles.ctaBtn}`}>
            Register Now
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.mobileLink} ${pathname === link.href ? styles.active : ''}`}
          >
            {link.label}
            {link.href === '/selection' && totalCount > 0 && (
              <span className={styles.navBadge}>{totalCount}</span>
            )}
          </Link>
        ))}
        <Link href="/register" className={`btn btn-primary ${styles.mobileCta}`}>
          Register Now
        </Link>
      </div>
    </header>
  );
}
