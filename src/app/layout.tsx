import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const inter = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'qué preferís?',
  description: 'qué preferís? es un juego de preguntas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} overflow-hidden`}>{children}</body>
    </html>
  );
}
