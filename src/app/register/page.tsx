'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCourseContext } from '@/context/CourseContext';
import StepIndicator from '@/components/StepIndicator/StepIndicator';
import { ShoppingCart, ArrowRight, ArrowLeft, Check, PartyPopper } from 'lucide-react';
import { RegistrationData } from '@/types';
import styles from './page.module.css';

const STEPS = ['Personal Details', 'Review Selection', 'Confirmation'];

type FormErrors = Partial<Record<keyof RegistrationData, string>>;

function generateRegistrationId(): string {
  return 'SFH-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function validateForm(data: RegistrationData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = 'Full name is required';
  else if (data.fullName.trim().length < 3) errors.fullName = 'Name must be at least 3 characters';

  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Please enter a valid email';

  if (!data.phone.trim()) errors.phone = 'Phone number is required';
  else if (!/^\+?[\d\s\-()]{7,}$/.test(data.phone)) errors.phone = 'Please enter a valid phone number';

  if (!data.address.trim()) errors.address = 'Address is required';
  else if (data.address.trim().length < 10) errors.address = 'Please enter a full address';

  return errors;
}

export default function RegisterPage() {
  const { selectedCourses, totalPrice, clearSelection } = useCourseContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationId, setRegistrationId] = useState('');
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegistrationData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      const errs = validateForm(formData);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
    }
    setCurrentStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    const id = generateRegistrationId();
    setRegistrationId(id);
    setCurrentStep(3);
    clearSelection();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedCourses.length === 0 && currentStep !== 3) {
    return (
      <div>
        <div className="page-hero">
          <div className="container">
            <h1>Registration</h1>
            <p>Complete your course registration in three simple steps.</p>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="empty-state">
              <div className="empty-state-icon"><ShoppingCart size={48} strokeWidth={1.5} /></div>
              <h3>No courses selected</h3>
              <p>Please add courses to your selection before registering.</p>
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
          <h1>Registration</h1>
          <p>Complete your registration in 3 easy steps.</p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className={styles.formWrapper}>
            <StepIndicator steps={STEPS} currentStep={currentStep} />

            {/* ===== STEP 1: Personal Details ===== */}
            {currentStep === 1 && (
              <div className={`${styles.stepContent} animate-fade-in`}>
                <div className={styles.stepHeader}>
                  <h2>Personal Details</h2>
                  <p>Please fill in your personal information to complete the registration.</p>
                </div>

                <div className={styles.formGrid}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Full Name *</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className={`form-input ${errors.fullName ? 'error' : ''}`}
                      placeholder="e.g. Jane Smith"
                      value={formData.fullName}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                    {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="e.g. jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="e.g. +234 801 234 5678"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>

                  <div className={`form-group ${styles.fullWidth}`}>
                    <label className="form-label" htmlFor="address">Address *</label>
                    <textarea
                      id="address"
                      name="address"
                      className={`form-input ${errors.address ? 'error' : ''} ${styles.textarea}`}
                      placeholder="Street address, city, state, country"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      autoComplete="street-address"
                    />
                    {errors.address && <span className="form-error">{errors.address}</span>}
                  </div>
                </div>

                <div className={styles.actions}>
                  <div />
                  <button className="btn btn-primary btn-lg" onClick={handleNext}>
                    Next: Review Selection <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                  </button>
                </div>
              </div>
            )}

            {/* ===== STEP 2: Review ===== */}
            {currentStep === 2 && (
              <div className={`${styles.stepContent} animate-fade-in`}>
                <div className={styles.stepHeader}>
                  <h2>Review Your Selection</h2>
                  <p>Please confirm your details and selected courses before submitting.</p>
                </div>

                {/* Personal Details Summary */}
                <div className={styles.reviewCard}>
                  <div className={styles.reviewCardHeader}>
                    <h3>Personal Details</h3>
                    <button className={styles.editBtn} onClick={() => setCurrentStep(1)}>Edit</button>
                  </div>
                  <div className={styles.reviewGrid}>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Full Name</span>
                      <span className={styles.reviewValue}>{formData.fullName}</span>
                    </div>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Email</span>
                      <span className={styles.reviewValue}>{formData.email}</span>
                    </div>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Phone</span>
                      <span className={styles.reviewValue}>{formData.phone}</span>
                    </div>
                    <div className={`${styles.reviewItem} ${styles.fullWidth}`}>
                      <span className={styles.reviewLabel}>Address</span>
                      <span className={styles.reviewValue}>{formData.address}</span>
                    </div>
                  </div>
                </div>

                {/* Courses Summary */}
                <div className={styles.reviewCard}>
                  <div className={styles.reviewCardHeader}>
                    <h3>Selected Courses ({selectedCourses.length})</h3>
                    <Link href="/selection" className={styles.editBtn}>Edit</Link>
                  </div>
                  <div className={styles.reviewCourses}>
                    {selectedCourses.map((course) => (
                      <div key={course.id} className={styles.reviewCourseRow}>
                        <div>
                          <div className={styles.reviewCourseTitle}>{course.title}</div>
                          <div className={styles.reviewCourseMeta}>{course.instructor} · {course.duration}</div>
                        </div>
                        <span className={styles.reviewCoursePrice}>₦{course.price.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className={styles.reviewTotal}>
                      <span>Total</span>
                      <span className={styles.totalAmt}>₦{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button className="btn btn-secondary btn-lg" onClick={handleBack}>
                    <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back
                  </button>
                  <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
                    Confirm Registration <Check size={16} style={{ marginLeft: '8px' }} />
                  </button>
                </div>
              </div>
            )}

            {/* ===== STEP 3: Confirmation ===== */}
            {currentStep === 3 && (
              <div className={`${styles.stepContent} ${styles.successStep} animate-fade-in`}>
                <div className={styles.successIcon}><PartyPopper size={48} strokeWidth={1.5} /></div>
                <h2 className={styles.successTitle}>Registration Successful!</h2>
                <p className={styles.successSubtitle}>
                  Welcome aboard! Your registration has been confirmed.
                </p>

                <div className={styles.regIdBox}>
                  <span className={styles.regIdLabel}>Your Registration ID</span>
                  <span className={styles.regId}>{registrationId}</span>
                  <span className={styles.regIdNote}>Save this ID for your records</span>
                </div>

                <div className={styles.confirmDetails}>
                  <div className={styles.confirmRow}>
                    <span className={styles.confirmLabel}>Name</span>
                    <span>{formData.fullName}</span>
                  </div>
                  <div className={styles.confirmRow}>
                    <span className={styles.confirmLabel}>Email</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className={styles.confirmRow}>
                    <span className={styles.confirmLabel}>Courses</span>
                    <span>{selectedCourses.length > 0 ? `${selectedCourses.length} courses registered` : 'Registration complete'}</span>
                  </div>
                </div>

                <div className={styles.successActions}>
                  <Link href="/courses" className="btn btn-primary btn-lg">
                    Explore More Courses
                  </Link>
                  <Link href="/" className="btn btn-secondary btn-lg">
                    Back to Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
