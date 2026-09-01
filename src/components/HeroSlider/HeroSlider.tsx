'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HeroSlider.module.css';

const images = [
  '/H.jpg',
  '/H2.jpg',
  '/H5.jpg',
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.sliderContainer}>
      {images.map((src, index) => (
        <div
          key={src}
          className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
        >
          <Image
            src={src}
            alt={`Hero Slide ${index + 1}`}
            fill
            priority={index === 0}
            className={styles.image}
          />
        </div>
      ))}
      <div className={styles.overlay} />
    </div>
  );
}
