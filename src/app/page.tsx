import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { featuredCourses, courses } from '@/data/courses';
import CourseCard from '@/components/CourseCard/CourseCard';
import HeroSlider from '@/components/HeroSlider/HeroSlider';
import ContactForm from '@/components/ContactForm/ContactForm';
import { Search, CheckCircle, GraduationCap, Rocket, ArrowRight, Lightbulb, Target, Users, Zap, Sparkles, ShieldCheck, Star, Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'SMARTFLOW HUB — Learn. Grow. Succeed.',
  description:
    'Register for world-class courses in technology, business, design, health, and personal development. Join 10,000+ learners at SMARTFLOW HUB.',
};



const steps = [
  {
    icon: <Search size={32} />,
    title: 'Browse Courses',
    description: 'Explore our curated catalog of expert-led courses.',
  },
  {
    icon: <CheckCircle size={32} />,
    title: 'Select Your Course',
    description: 'Select the course you want to enroll in.',
  },
  {
    icon: <GraduationCap size={32} />,
    title: 'Register & Learn',
    description: 'Complete registration in minutes and start learning.',
  },
];

const coreAdvantages = [
  {
    title: 'Industry-Relevant Curriculum',
    description: 'Our courses are constantly updated to reflect the latest trends, tools, and best practices used by top tech companies globally.',
    icon: <Lightbulb size={36} />,
  },
  {
    title: 'Hands-on Project Experience',
    description: 'Stop watching and start building. Every course includes real-world projects that you can immediately add to your professional portfolio.',
    icon: <Target size={36} />,
  },
  {
    title: 'Expert Mentorship',
    description: 'Learn directly from senior engineers, designers, and industry veterans who have built products used by millions.',
    icon: <Users size={36} />,
  },
  {
    title: 'Flexible Learning',
    description: 'Access high-quality content anytime, anywhere. Our platform is designed to fit into your busy schedule without compromising quality.',
    icon: <Zap size={36} />,
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* ====== HERO SECTION ====== */}
      <section className={styles.hero}>
        <HeroSlider />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <Rocket size={16} style={{ marginRight: '8px' }} /> The Future Belongs to Those Who Build It
          </div>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroLead}>Unlock Your Potential</span>{' '}
            <span className={styles.heroTagline}>
              with <span className={styles.heroHighlight}>SMARTFLOW HUB</span>
            </span>
          </h1>
          <p className={styles.heroSubtitle}>
            World-class courses designed by industry experts. Learn at your own pace,
            register with ease, and join a thriving community of ambitious learners.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/#featured-courses" className="btn btn-primary btn-lg">
              Browse Courses <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </Link>
            <Link href="/#contact" className="btn btn-outline btn-lg">
              Contact Us
            </Link>
          </div>
        </div>


      </section>

      {/* ====== ABOUT US SUMMARY ====== */}
      <section className={`section ${styles.aboutSection}`}>
        <div className={styles.aboutGlow} />
        <div className={styles.aboutOrbTeal} />
        <div className={styles.aboutOrbGold} />
        <div className={styles.aboutGrid} />
        <div className={styles.aboutAccentBar} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.aboutLayout}>
            <div className={styles.aboutText}>
              <div className={styles.aboutBadge}>
                <Sparkles size={15} /> ABOUT SMARTFLOW HUB
              </div>
              <h2 className="section-title">Transforming Lives Through Tech Education</h2>
              <div className={styles.aboutDivider} />
              <p className={styles.aboutBody}>
                SMARTFLOW HUB is dedicated to providing high-quality, accessible education in technology and development. We bridge the gap between ambition and industry-ready skills.
              </p>
              <p className={styles.aboutBody}>
                Whether you're starting from scratch with Basic Web Development, diving into AI, or mastering Full Stack Engineering, our curriculum is designed to help you succeed in the digital economy.
              </p>

              <div className={styles.aboutPillars}>
                <div className={styles.aboutPillar}>
                  <div className={styles.pillarIcon}><Sparkles size={16} /></div>
                  <span>Project-Based Learning</span>
                </div>
                <div className={styles.aboutPillar}>
                  <div className={styles.pillarIcon}><Target size={16} /></div>
                  <span>Industry-Ready Skills</span>
                </div>
                <div className={styles.aboutPillar}>
                  <div className={styles.pillarIcon}><ShieldCheck size={16} /></div>
                  <span>Recognised Certificates</span>
                </div>
              </div>
            </div>

            <div className={styles.aboutVisual}>
              <div className={styles.aboutImageBackdrop} />
              <div className={styles.aboutImageWrapper}>
                <Image
                  src="/H8.jpg"
                  alt="About SMARTFLOW HUB"
                  fill
                  className={styles.aboutImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className={styles.aboutImageOverlay} />

                <div className={styles.floatingTag}>
                  <Zap size={14} /> 100% Practical Curriculum
                </div>

                <div className={styles.floatingCard}>
                  <div className={styles.floatingCardIcon}>
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <div className={styles.floatingCardTitle}>Expert Mentors</div>
                    <div className={styles.floatingCardSub}>Industry practitioners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FEATURED COURSES ====== */}
      <section id="featured-courses" className={`section ${styles.featuredSection}`}>
        <div className={styles.featuredGlow} />
        <div className={styles.featuredOrb1} />
        <div className={styles.featuredOrb2} />
        <div className={styles.featuredGrid} />
        <div className={styles.featuredAccentLeft} />
        <div className={styles.featuredAccentRight} />
        <div className="container">
          <div className={`section-header ${styles.sectionHeader}`}>
            <span className={styles.featuredBadge}><Sparkles size={16} style={{ marginRight: '6px' }} /> HAND-PICKED FOR YOU</span>
            <h2 className={`section-title ${styles.featuredTitle}`}>Featured Courses</h2>
            <div className={styles.featuredDivider} />
            <p className={styles.featuredSubtitle}>
              Our most popular courses, highly rated by thousands of ambitious learners worldwide.
            </p>
          </div>

          <div className={styles.coursesGrid}>
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className={styles.viewAllWrapper}>
            <Link href="/courses" className={styles.viewAllBtn}>
              <span>View All {courses.length} Courses</span>
              <span className={styles.viewAllArrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className={`section ${styles.howSection}`}>
        <Image
          src="/hub.jpg"
          alt="How It Works Background"
          fill
          className={styles.howBgImage}
          sizes="100vw"
        />
        <div className={styles.howBgOverlay} />
        <div className={styles.howGlow} />
        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div className={`section-header ${styles.sectionHeader}`}>
            <span className={styles.howBadge}><Zap size={16} style={{ marginRight: '6px' }} /> SIMPLE PROCESS</span>
            <h2 className={`section-title ${styles.howTitle}`}>How It Works</h2>
            <div className={styles.howDivider} />
            <p className={styles.howSubtitle}>
              Start your learning journey in three quick, seamless steps.
            </p>
          </div>

          <div className={styles.stepsWrapper}>
            <div className={styles.connectingLine} />
            <div className={styles.stepsGrid}>
              {steps.map((step, i) => (
                <div key={step.title} className={styles.stepCard}>
                  <div className={styles.stepHeader}>
                    <div className={styles.stepIconContainer}>
                      <span className={styles.stepIcon}>{step.icon}</span>
                    </div>
                    <span className={styles.stepBadge}>Step 0{i + 1}</span>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== CORE ADVANTAGES ====== */}
      <section className={`section ${styles.advantagesSection}`}>
        <Image
          src="/H9.jpg"
          alt="Core Advantages Background"
          fill
          className={styles.advantagesBgImage}
          sizes="100vw"
        />
        <div className={styles.advantagesBgOverlay} />
        <div className={styles.advantagesGlow} />
        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div className={`section-header ${styles.sectionHeader}`}>
            <span className={styles.advantagesBadge}><Star size={16} style={{ marginRight: '6px' }} /> WHY CHOOSE US</span>
            <h2 className={`section-title ${styles.lightTitle}`}>Our Core Advantages</h2>
            <div className={styles.advantagesDivider} />
            <p className={styles.advantagesSubtitle}>
              We provide everything you need to accelerate your career and master in-demand tech skills.
            </p>
          </div>

          <div className={styles.advantagesGrid}>
            {coreAdvantages.map((adv) => (
              <div key={adv.title} className={styles.advantageCard}>
                <div className={styles.advantageIconWrapper}>
                  {adv.icon}
                </div>
                <h3 className={styles.advantageTitle}>{adv.title}</h3>
                <p className={styles.advantageText}>{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaSectionBg}>
          <Image
            src="/hub.jpg"
            alt="Smartflow Hub"
            fill
            className={styles.ctaBgImage}
            sizes="100vw"
          />
          <div className={styles.ctaSectionOverlay} />
        </div>

        <div className="container">
          <div className={styles.ctaInner}>

            {/* Left: Text content */}
            <div className={styles.ctaLeft}>
              <div className={styles.ctaBadgeRow}>
                <span className={styles.ctaBadge}>
                  <Rocket size={14} /> TAKE THE NEXT STEP
                </span>
              </div>

              <h2 className={styles.ctaTitle}>
                Ready to <span className={styles.ctaHighlight}>Start Learning?</span>
              </h2>
              <p className={styles.ctaSubtitle}>
                Join thousands of ambitious professionals transforming their careers with SMARTFLOW HUB — from zero to job-ready.
              </p>

              <div className={styles.ctaBtns}>
                <Link href="/courses" className={styles.ctaPrimaryBtn}>
                  <span>Explore Courses</span>
                  <ArrowRight size={18} className={styles.ctaArrow} />
                </Link>
                <Link href="/register" className={styles.ctaSecondaryBtn}>
                  <span>Register Free</span>
                  <Sparkles size={16} />
                </Link>
              </div>
            </div>

            {/* Right: Feature cards */}
            <div className={styles.ctaRight}>
              <div className={styles.ctaFeatureCard}>
                <div className={styles.ctaFeatureIconBox}>
                  <Zap size={24} />
                </div>
                <div>
                  <div className={styles.ctaFeatureTitle}>Instant Lifetime Access</div>
                  <div className={styles.ctaFeatureDesc}>Learn anytime, on any device, forever.</div>
                </div>
              </div>
              <div className={styles.ctaFeatureCard}>
                <div className={styles.ctaFeatureIconBox}>
                  <GraduationCap size={24} />
                </div>
                <div>
                  <div className={styles.ctaFeatureTitle}>Verified Certificate</div>
                  <div className={styles.ctaFeatureDesc}>Industry-recognised upon completion.</div>
                </div>
              </div>
              <div className={styles.ctaFeatureCard}>
                <div className={styles.ctaFeatureIconBox}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className={styles.ctaFeatureTitle}>100% Risk Free</div>
                  <div className={styles.ctaFeatureDesc}>Full satisfaction guaranteed, no questions asked.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ====== CONTACT SECTION ====== */}
      <section className={`section ${styles.contactSection}`} id="contact">
        <div className={styles.contactGlow} />
        <div className="container">
          <div className={`section-header ${styles.sectionHeader}`}>
            <span className={styles.contactBadge}><MessageSquare size={16} style={{ marginRight: '6px' }} /> GET IN TOUCH</span>
            <h2 className={`section-title ${styles.lightTitle}`}>Let's Start a Conversation</h2>
            <div className={styles.contactDivider} />
            <p className={styles.contactSubtitle}>
              We're a small, dedicated team — every message is welcomed and replied to personally.
            </p>
          </div>

          <div className={styles.contactGrid}>
            {/* Contact Details */}
            <div className={styles.contactInfo}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}><Mail size={24} /></div>
                <div className={styles.infoContent}>
                  <h4 className={styles.infoTitle}>Email</h4>
                  <p className={styles.infoText}>info@smartflowgroupltd.com</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}><Phone size={24} /></div>
                <div className={styles.infoContent}>
                  <h4 className={styles.infoTitle}>WhatsApp</h4>
                  <p className={styles.infoText}>+234 815 418 4722</p>
                  <p className={styles.infoSubtext}>Mon-Fri, 9am-5pm</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}><MapPin size={24} /></div>
                <div className={styles.infoContent}>
                  <h4 className={styles.infoTitle}>Office</h4>
                  <p className={styles.infoText}>NO.B5 HD Plaza, Ahmadu Bello Way, Bauchi Bauchi State</p>
                  <p className={styles.infoSubtext}>Mon-Fri: 9:00 AM - 5:00 PM</p>
                </div>
              </div>

              <div className={styles.socialCard}>
                <h4 className={styles.infoTitle}>Follow Us</h4>
                <a href="https://wa.me/2348154184722" target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.whatsappBtn}`}>
                  <MessageSquare size={18} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
