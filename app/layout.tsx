import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import './globals.css'; // Global styles

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cursive',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Конструктор заданий по русскому языку',
  description: 'Минималистичный онлайн-конструктор дидактических материалов и рабочих листов по русскому языку от Эльвиры',
  openGraph: {
    title: 'Конструктор заданий по русскому языку',
    description: 'Минималистичный онлайн-конструктор дидактических материалов и рабочих листов по русскому языку от Эльвиры',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Конструктор заданий по русскому языку',
    description: 'Минималистичный онлайн-конструктор дидактических материалов и рабочих листов по русскому языку от Эльвиры',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ru" className={`${plusJakarta.variable} ${caveat.variable}`}>
      <body suppressHydrationWarning className="bg-white text-emerald-950/80 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
