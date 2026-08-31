import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About — SMARTFLOW HUB',
  description:
    'Learn about SMARTFLOW HUB mission, team, and commitment to delivering world-class online education.',
};

const values = [
  { icon: '🎯', title: 'Excellence', description: 'We partner only with top-tier industry practitioners and academics to deliver world-class education.' },
  { icon: '🤝', title: 'Community', description: 'Learning is better together. Our platforms foster meaningful connection between students and instructors.' },
  { icon: '🚀', title: 'Innovation', description: 'We continuously evolve our curriculum to reflect the latest trends and technologies in every industry.' },
  { icon: '🌍', title: 'Accessibility', description: 'Quality education should be available to everyone. We offer flexible schedules and competitive pricing.' },
];

const team = [
  { name: 'Dr. Amina Osei', role: 'Founder & CEO', initials: 'AO', bg: '#0f2444' },
  { name: 'Kwame Boateng', role: 'Head of Curriculum', initials: 'KB', bg: '#1a3a6e' },
  { name: 'Sophie Laroche', role: 'Lead Designer', initials: 'SL', bg: '#7c3aed' },
  { name: 'Marcus Obi', role: 'Head of Technology', initials: 'MO', bg: '#065f46' },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <h1>About SMARTFLOW HUB</h1>
          <p>Empowering ambitious learners with world-class education since 2020.</p>
        </div>
      </div>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className={styles.missionLayout}>
            <div className={styles.missionText}>
              <p className={styles.eyebrow}>OUR MISSION</p>
              <h2 className="section-title">Learning That Transforms Lives</h2>
              <div className="divider" />
              <p className={styles.missionBody}>
                SMARTFLOW HUB was founded on a simple belief: that access to high-quality, practical education should not be limited by geography or circumstance. We bring together the world&apos;s best instructors and the most motivated learners to create transformative educational experiences.
              </p>
              <p className={styles.missionBody}>
                Our courses are designed with one goal in mind — to give you real, applicable skills that advance your career, grow your business, or simply enrich your life. Every module, every lesson, every project is built to deliver measurable impact.
              </p>
              <Link href="/courses" className="btn btn-primary">
                Explore Our Courses →
              </Link>
            </div>
            <div className={styles.missionVisual}>
              <div className={styles.visualCard}>
                <div className={styles.visualStat}>
                  <span className={styles.visualStatNum}>10K+</span>
                  <span className={styles.visualStatLabel}>Students Enrolled</span>
                </div>
                <div className={styles.visualStat}>
                  <span className={styles.visualStatNum}>500+</span>
                  <span className={styles.visualStatLabel}>Courses Available</span>
                </div>
                <div className={styles.visualStat}>
                  <span className={styles.visualStatNum}>120+</span>
                  <span className={styles.visualStatLabel}>Expert Instructors</span>
                </div>
                <div className={styles.visualStat}>
                  <span className={styles.visualStatNum}>4.8★</span>
                  <span className={styles.visualStatLabel}>Average Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <div className={`section-header ${styles.centeredHeader}`}>
            <p className={styles.eyebrow}>WHAT WE STAND FOR</p>
            <h2 className="section-title">Our Core Values</h2>
            <div className="divider" />
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDescription}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className={`section-header ${styles.centeredHeader}`}>
            <p className={styles.eyebrow}>THE PEOPLE BEHIND THE PLATFORM</p>
            <h2 className="section-title">Meet Our Team</h2>
            <div className="divider" />
          </div>
          <div className={styles.teamGrid}>
            {team.map((member) => (
              <div key={member.name} className={styles.teamCard}>
                <div
                  className={styles.teamAvatar}
                  style={{ background: member.bg }}
                >
                  {member.initials}
                </div>
                <h3 className={styles.teamName}>{member.name}</h3>
                <p className={styles.teamRole}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactBox}>
            <h2>Have Questions?</h2>
            <p>Our team is here to help you find the right courses for your goals.</p>
            <div className={styles.contactActions}>
              <a href="mailto:hello@smartflowhub.com" className="btn btn-primary btn-lg">
                📧 &nbsp;Email Us
              </a>
              <Link href="/courses" className="btn btn-outline btn-lg">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
