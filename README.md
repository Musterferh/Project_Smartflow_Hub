<div align="center">
  <img src="public/logo.png" alt="SMARTFLOW HUB Logo" width="100" height="100" />
  <h1>SMARTFLOW HUB</h1>
  <p><strong>A Premier Tech Academy & Digital Skills Innovation Platform</strong></p>
  <p><em>The Future Belongs to Those Who Build It</em></p>

  <p>
    <a href="https://techhub.smartflowgroupltd.com">
      <img src="https://img.shields.io/badge/Website-techhub.smartflowgroupltd.com-00bfa5?style=for-the-badge&logo=vercel&logoColor=white" alt="Website" />
    </a>
    <img src="https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Paystack-Integrated-0ba4db?style=for-the-badge&logo=paypal&logoColor=white" alt="Paystack" />
    <img src="https://img.shields.io/badge/Resend-Email%20API-black?style=for-the-badge&logo=resend&logoColor=white" alt="Resend" />
  </p>
</div>

---

## 📖 Overview

**SMARTFLOW HUB** is an industry-standard course discovery, registration, and payment platform built for aspiring software engineers, mobile developers, and AI practitioners. A division of **Smartflow Group Ltd**, the hub provides hands-on, project-driven education both physically in **Bauchi, Nigeria** and virtually online.

---

## ✨ Key Features

- **🎓 Comprehensive Course Catalog**:
  - *Foundation & AI*: Basic Web Development, Prompt Engineering, Generative AI.
  - *Comprehensive Development*: Full Stack Development (React/Node), Mobile App Development, Professional Software Engineering.
  - *Advanced Web Platforms*: Advanced Frontend Architecture and Performance.
- **💳 Instant Paystack Payment Gateway**:
  - Secure real-time checkout popup with dynamic transaction tracking (`SFHUB_` prefix).
  - Client-side SSR safety via dynamic client-side rendering.
- **📧 Automated Admission & Receipt Emails**:
  - Powered by **Resend API** with custom domain sender: `SMARTFLOW HUB <noreply@smartflowgroupltd.com>`.
  - Sends high-definition HTML admission letters with unique Student Registration IDs, course breakdown, office address, and a direct WhatsApp onboarding link.
- **📱 100% Mobile Responsive Design**:
  - Zero horizontal scrolling across any viewport.
  - Fixed compact header card with branded logo and toggleable slide-down navigation menu.
  - Cyber-glow accents, dark glassmorphism aesthetics, and luminous ambient background effects.
- **🔍 Advanced SEO & Structured Data**:
  - Dynamic `sitemap.xml` listing all static routes and individual course endpoints.
  - `robots.txt` configuration for optimal Googlebot crawling.
  - Open Graph (OG) & Twitter card metadata for rich previews on WhatsApp, Twitter, and LinkedIn.
  - Google Schema.org JSON-LD structured data (`EducationalOrganization` and `Course`).
- **📍 Physical Campus Integration**:
  - Physical office location in Bauchi: `NO.B5 HD Plaza, Ahmadu Bello Way, Bauchi, Bauchi State, Nigeria`.
  - Direct WhatsApp support link (`+234 815 418 4722`).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS Modules (High-tech glassmorphism, responsive flex/grid)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Payments**: [react-paystack](https://paystack.com/)
- **Email Delivery**: [Resend](https://resend.com/)
- **Deployment & Hosting**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Musterferh/Project_Smartflow_Hub.git
cd Project_Smartflow_Hub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory (refer to `.env.example`):
```env
# Paystack API Keys
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_key_here
PAYSTACK_SECRET_KEY=sk_live_your_key_here

# Resend Email API
RESEND_API_KEY=re_your_resend_key_here
EMAIL_FROM=SMARTFLOW HUB <noreply@smartflowgroupltd.com>
ADMIN_NOTIFICATION_EMAIL=info@smartflowgroupltd.com

# Production Subdomain URL
NEXT_PUBLIC_APP_URL=https://techhub.smartflowgroupltd.com
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Build for Production
```bash
npm run build
```

---

## 🌐 Production Deployment & Subdomain

This project is optimized for deployment on **Vercel**:

1. **Connect GitHub**: Import `Musterferh/Project_Smartflow_Hub` on Vercel.
2. **Environment Variables**: Add all keys defined in `.env.example` in Vercel project settings.
3. **Subdomain Setup**:
   - In Vercel &rarr; *Settings* &rarr; *Domains*, add: `techhub.smartflowgroupltd.com`.
   - In your DNS provider (cPanel, Cloudflare, etc.), add the CNAME record:
     - **Type**: `CNAME`
     - **Host / Name**: `techhub`
     - **Target**: `cname.vercel-dns.com`

---

## 🏢 Contact & Organization

- **Organization**: SMARTFLOW HUB (Smartflow Group Ltd)
- **Portal**: [https://techhub.smartflowgroupltd.com](https://techhub.smartflowgroupltd.com)
- **Email**: [info@smartflowgroupltd.com](mailto:info@smartflowgroupltd.com)
- **Phone / WhatsApp**: [+234 815 418 4722](https://wa.me/2348154184722)
- **Address**: NO.B5 HD Plaza, Ahmadu Bello Way, Bauchi, Bauchi State, Nigeria

---

## 📄 License
Copyright &copy; 2026 SMARTFLOW HUB &bull; Smartflow Group Ltd. All rights reserved.
