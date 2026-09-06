'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { usePaystackPayment } from 'react-paystack';
import StepIndicator from '@/components/StepIndicator/StepIndicator';
import { ShoppingCart, ArrowRight, ArrowLeft, Check, PartyPopper } from 'lucide-react';
import { RegistrationData } from '@/types';
import { getCourseById } from '@/data/courses';
import styles from './page.module.css';

const STEPS = ['Personal Details', 'Review & Pay', 'Confirmation'];

type FormErrors = Partial<Record<keyof RegistrationData, string>>;

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

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const course = courseId ? getCourseById(courseId) : null;

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

  // Paystack Integration
  const paystackKey =
    process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ||
    'pk_test_1234567890abcdef1234567890abcdef12345678';

  const config = {
    reference: `SFHUB_${Date.now()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    email: formData.email,
    amount: course ? course.price * 100 : 0, // Paystack amount is in kobo
    publicKey: paystackKey,
    metadata: {
      custom_fields: [
        { display_name: 'Platform', variable_name: 'platform', value: 'Smartflow Hub' },
        { display_name: 'Course', variable_name: 'course_title', value: course?.title || '' },
        { display_name: 'Student Name', variable_name: 'student_name', value: formData.fullName },
        { display_name: 'Phone Number', variable_name: 'phone_number', value: formData.phone },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference: any) => {
    const regId = reference.reference || `SFHUB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setRegistrationId(regId);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Send confirmation email via Resend API
    try {
      await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: formData.fullName,
          studentEmail: formData.email,
          studentPhone: formData.phone,
          courseTitle: course?.title,
          courseDuration: course?.duration,
          amountPaid: course ? `₦${course.price.toLocaleString()}` : '',
          registrationId: regId,
          paymentReference: reference.reference || regId,
        }),
      });
    } catch (err) {
      console.error('Error sending confirmation email:', err);
    }
  };

  const onClose = () => {
    console.log('Payment closed window');
  };

  const handleSubmit = () => {
    initializePayment({ onSuccess, onClose });
  };

  if (!course && currentStep !== 3) {
    return (
      <div>
        <div className="page-hero">
          <div className="container">
            <h1>Registration</h1>
            <p>Complete your course registration securely.</p>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="empty-state">
              <div className="empty-state-icon"><ShoppingCart size={48} strokeWidth={1.5} /></div>
              <h3>No course selected</h3>
              <p>Please select a course to register.</p>
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
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <span className="badge badge-tech" style={{ marginBottom: '12px' }}>
            🔒 Secure Registration
          </span>
          <h1>Course Registration</h1>
          <p>
            {currentStep === 3
              ? 'Your registration is complete!'
              : `Enrolling in: ${course?.title}`}
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className={styles.formWrapper}>
            {/* Step Indicator */}
            <StepIndicator steps={STEPS} currentStep={currentStep} />

            {/* STEP 1: Personal Details */}
            {currentStep === 1 && (
              <div className={`${styles.stepContent} animate-fade-in`}>
                <div className={styles.stepHeader}>
                  <h2>Personal Information</h2>
                  <p>Please enter your accurate contact information for course enrollment.</p>
                </div>

                <div className={styles.formGrid}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`form-input ${errors.fullName ? 'error' : ''}`}
                    />
                    {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="e.g. +234 801 234 5678"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>

                  <div className={`form-group ${styles.fullWidth}`}>
                    <label className="form-label" htmlFor="address">
                      Residential Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      placeholder="e.g. 123 Tech Avenue, Victoria Island, Lagos"
                      value={formData.address}
                      onChange={handleChange}
                      className={`form-input ${styles.textarea} ${errors.address ? 'error' : ''}`}
                    />
                    {errors.address && <span className="form-error">{errors.address}</span>}
                  </div>
                </div>

                <div className={styles.actions}>
                  <Link href={`/courses/${course?.id}`} className="btn btn-secondary">
                    <ArrowLeft size={16} /> Back to Course
                  </Link>
                  <button type="button" onClick={handleNext} className="btn btn-primary btn-lg">
                    Continue to Review <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Review & Pay */}
            {currentStep === 2 && course && (
              <div className={`${styles.stepContent} animate-fade-in`}>
                <div className={styles.stepHeader}>
                  <h2>Review &amp; Pay</h2>
                  <p>Please confirm your details and course information before completing payment.</p>
                </div>

                {/* Personal Details Review */}
                <div className={styles.reviewCard}>
                  <div className={styles.reviewCardHeader}>
                    <h3>Personal Details</h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className={styles.editBtn}
                    >
                      Edit
                    </button>
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
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Address</span>
                      <span className={styles.reviewValue}>{formData.address}</span>
                    </div>
                  </div>
                </div>

                {/* Course Review */}
                <div className={styles.reviewCard}>
                  <div className={styles.reviewCardHeader}>
                    <h3>Enrolled Course</h3>
                  </div>
                  <div className={styles.reviewCourses}>
                    <div className={styles.reviewCourseRow}>
                      <div>
                        <div className={styles.reviewCourseTitle}>{course.title}</div>
                        <div className={styles.reviewCourseMeta}>
                          {course.category} • {course.duration} • {course.level}
                        </div>
                      </div>
                      <div className={styles.reviewCoursePrice}>
                        ₦{course.price.toLocaleString()}
                      </div>
                    </div>
                    <div className={styles.reviewTotal}>
                      <span>Total Amount:</span>
                      <span className={styles.totalAmt}>₦{course.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button type="button" onClick={handleBack} className="btn btn-secondary">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-primary btn-lg"
                  >
                    <Check size={18} /> Pay with Paystack (₦{course.price.toLocaleString()})
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Confirmation */}
            {currentStep === 3 && (
              <div className={`${styles.stepContent} ${styles.successStep} animate-fade-in`}>
                <div className={styles.successIcon}><PartyPopper size={64} color="#f5a623" /></div>
                <h2 className={styles.successTitle}>Registration &amp; Payment Successful!</h2>
                <p className={styles.successSubtitle}>
                  Welcome to SMARTFLOW HUB! Your enrollment is confirmed and an official receipt has been dispatched to <strong>{formData.email}</strong>.
                </p>

                <div className={styles.regIdBox}>
                  <span className={styles.regIdLabel}>Your Registration ID</span>
                  <span className={styles.regId}>{registrationId}</span>
                  <span className={styles.regIdNote}>
                    Please save this ID for your orientation and records.
                  </span>
                </div>

                <div className={styles.confirmDetails}>
                  <div className={styles.confirmRow}>
                    <span className={styles.confirmLabel}>Name</span>
                    <span>{formData.fullName}</span>
                  </div>
                  <div className={styles.confirmRow}>
                    <span className={styles.confirmLabel}>Course</span>
                    <span>{course?.title || 'Course registration complete'}</span>
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
