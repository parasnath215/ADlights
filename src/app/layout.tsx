import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from '../components/chrome/ClientProviders';

export const metadata: Metadata = {
  title: 'ADlights — Architectural Ambient Illumination & Luxury Lighting',
  description: 'ADlights designs museum-grade architectural floor arcs, hand-blown glass pendants, and smart linear fixtures engineered for warm 2700K atmospheric distinction.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,600;0,700;0,800;1,800&display=swap"
        />
      </head>
      <body className="antialiased bg-white text-text-primary selection:bg-amber-300 selection:text-zinc-950">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
