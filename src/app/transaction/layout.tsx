import Sidebar from '@/components/Sidebar';
import '../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="gradient-bg-sidebar w-full fixed">
        <Sidebar />
      </div>
      <div className="h-screen overflow-y-auto pt-[104px]">{children}</div>
    </div>
  );
}

