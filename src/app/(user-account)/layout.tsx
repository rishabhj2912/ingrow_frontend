import Navbar from '@/components/Navbar';
import ProgressBar from '@/components/ProgressBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar component={<></>} />
      <div className="w-full h-[calc(100vh-92px)]">{children}</div>
      <ProgressBar percentage={'100%'} className="h-3 w-full" />
    </div>
  );
}
