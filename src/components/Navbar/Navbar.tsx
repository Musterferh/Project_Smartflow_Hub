'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Home, BookOpen, Phone, ChevronRight } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
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
    { href: '/', label: 'Home', Icon: Home },
    { href: '/courses', label: 'Courses', Icon: BookOpen },
    { href: '/#contact', label: 'Contact Us', Icon: Phone },
  ];

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.navbarOpen : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image src="/logo.png" alt="SMARTFLOW HUB Logo" width={40} height={40} className={styles.logoImage} />
          <span>
            <span className={styles.logoMain}>SMARTFLOW</span>
            <span className={styles.logoSub}> HUB</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navLink} ${pathname === href ? styles.active : ''}`}
            >
              <Icon size={16} />
              <span className={styles.navLabel}>{label}</span>
            </Link>
          ))}
          <Link href="/#featured-courses" className={`btn btn-primary btn-sm ${styles.ctaBtn}`}>
            <span>Register Now</span>
            <ChevronRight size={16} className={styles.ctaIcon} />
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
        {navLinks.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.mobileLink} ${pathname === href ? styles.active : ''}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
        <Link href="/#featured-courses" className={`btn btn-primary ${styles.mobileCta}`}>
          <span>Register Now</span>
          <ChevronRight size={18} className={styles.ctaIcon} />
        </Link>
      </div>
    </header>
  );
}
