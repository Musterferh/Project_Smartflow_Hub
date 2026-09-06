import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://techhub.smartflowgroupltd.com'),
  title: {
    default: 'SMARTFLOW HUB — Learn Tech, Coding, AI & Build The Future',
    template: '%s | SMARTFLOW HUB',
  },
  description:
    'Join SMARTFLOW HUB to learn Web Development, Full Stack, Mobile App Development, AI & Software Engineering. Industry-led training, hands-on mentorship, and verified certificates in Bauchi, Nigeria.',
  keywords: [
    'SMARTFLOW HUB',
    'tech hub in Bauchi',
    'tech academy Nigeria',
    'learn web development Bauchi',
    'coding school Bauchi',
    'full stack development course Nigeria',
    'AI courses Nigeria',
    'prompt engineering training',
    'mobile app development course',
    'learn to code Nigeria',
    'software engineering academy',
    'Smartflow Group Ltd',
  ],
  authors: [{ name: 'SMARTFLOW HUB', url: 'https://techhub.smartflowgroupltd.com' }],
  creator: 'Smartflow Group Ltd',
  publisher: 'SMARTFLOW HUB',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SMARTFLOW HUB — Learn Tech, Coding, AI & Build The Future',
    description:
      'Discover high-impact courses in Web Development, Full Stack, Mobile Apps, and AI at SMARTFLOW HUB. Accelerate your career with real-world projects in Bauchi, Nigeria.',
    url: 'https://techhub.smartflowgroupltd.com',
    siteName: 'SMARTFLOW HUB',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'SMARTFLOW HUB Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SMARTFLOW HUB — Learn Tech, Coding, AI & Build The Future',
    description:
      'Learn Web Development, Full Stack, Mobile Apps & AI at SMARTFLOW HUB in Bauchi, Nigeria. Industry-led curriculum and career support.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google6ca1e25bcc3fa51d',
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/apple-icon.png',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'SMARTFLOW HUB',
  alternateName: 'Smartflow Tech Hub',
  url: 'https://techhub.smartflowgroupltd.com',
  logo: 'https://techhub.smartflowgroupltd.com/logo.png',
  description:
    'Premier tech academy and innovation hub in Bauchi, Nigeria offering industry-standard training in Web Development, Full Stack, Mobile App Development, and Artificial Intelligence.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'NO.B5 HD Plaza, Ahmadu Bello Way',
    addressLocality: 'Bauchi',
    addressRegion: 'Bauchi State',
    addressCountry: 'NG',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+2348154184722',
    contactType: 'customer service',
    email: 'info@smartflowgroupltd.com',
    availableLanguage: ['English', 'Hausa'],
  },
  sameAs: ['https://smartflowgroupltd.com'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <Navbar />
        <main style={{ minHeight: '100vh' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
