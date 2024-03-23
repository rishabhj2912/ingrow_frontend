'use client';
import { useRouter } from 'next/navigation';
import Logo from '@/assets/icons/ingrow-logo.svg';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <div className="h-20 border-b border-light-grey-primary flex items-center justify-center">
        <Logo
          onClick={() => {
            router.push('/');
          }}
          className="cursor-pointer"
        />
      </div>
      <div className="w-full h-[calc(100vh-80px)]">{children}</div>
    </>
  );
}
