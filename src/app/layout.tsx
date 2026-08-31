import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { CourseProvider } from '@/context/CourseContext';

export const metadata: Metadata = {
  title: 'SMARTFLOW HUB — Online Course Registration Platform',
  description:
    'Discover and register for world-class courses in technology, business, design, health, and personal development at SMARTFLOW HUB.',
  keywords: 'online courses, learning, technology, business, design, smartflow hub',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CourseProvider>
          <Navbar />
          <main style={{ paddingTop: '72px', minHeight: '100vh' }}>
            {children}
          </main>
          <Footer />
        </CourseProvider>
      </body>
    </html>
  );
}
