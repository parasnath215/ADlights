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
      <body className="antialiased bg-white text-text-primary selection:bg-amber-300 selection:text-zinc-950">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
