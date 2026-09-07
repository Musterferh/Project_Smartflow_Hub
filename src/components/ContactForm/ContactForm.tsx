'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    enquiryType: 'enrollment',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const payload = {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        enquiryType: formData.enquiryType,
        message: formData.message.trim(),
        honeypot: formData.honeypot,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          enquiryType: 'enrollment',
          message: '',
          honeypot: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to deliver your message. Please try again.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage('A network error occurred. Please try again or chat with us on WhatsApp.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.formTitle}>Send Us a Message</h3>

      {status === 'success' ? (
        <div className={styles.successBox}>
          <CheckCircle2 size={48} className={styles.successIcon} />
          <h4 className={styles.successTitle}>Message Sent Successfully!</h4>
          <p className={styles.successDesc}>
            Thank you for reaching out. Our admissions and support team has received your enquiry and will reply to your email shortly.
          </p>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setStatus('idle')}
            style={{ marginTop: '14px' }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          {/* Honeypot field for bot protection */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          {status === 'error' && (
            <div className={styles.errorBox}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name *</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="form-input"
                required
                placeholder="e.g. John"
                value={formData.firstName}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name *</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="form-input"
                required
                placeholder="e.g. Doe"
                value={formData.lastName}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'loading'}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone / WhatsApp (optional)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form-input"
              placeholder="+234 ..."
              value={formData.phone}
              onChange={handleChange}
              disabled={status === 'loading'}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="enquiryType">Type of Enquiry *</label>
            <select
              id="enquiryType"
              name="enquiryType"
              className="form-input"
              required
              value={formData.enquiryType}
              onChange={handleChange}
              disabled={status === 'loading'}
            >
              <option value="enrollment">Program Enrollment</option>
              <option value="support">General Support</option>
              <option value="partnership">Partnership</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Your Message *</label>
            <textarea
              id="message"
              name="message"
              className="form-input"
              required
              rows={5}
              placeholder="How can we help you?"
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'loading'}
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={18} className={styles.spinner} />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={18} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
