import ProgressBar from '@/components/ProgressBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='w-full h-[calc(100vh-12px)]'>{children}</div>
      <ProgressBar percentage={'100%'} className='h-3 w-full' />
    </>
  );
}
