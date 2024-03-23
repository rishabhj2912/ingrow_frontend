import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/redux/ReduxProvider';
import UserData from '@/components/UserData';
import { Toaster } from 'react-hot-toast';
import MobileScreen from '@/components/MobileScreen';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'inGrow',
  description: 'AI Comments Generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Toaster />
          <UserData>
            <MobileScreen />
            <div className="h-screen w-screen hidden md:block">{children}</div>
          </UserData>
        </ReduxProvider>
      </body>
    </html>
  );
}
