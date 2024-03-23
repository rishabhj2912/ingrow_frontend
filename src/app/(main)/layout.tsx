import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="w-full h-[calc(100vh-80px)] bg-[#F8F8F9]">{children}</div>
    </div>
  );
}
