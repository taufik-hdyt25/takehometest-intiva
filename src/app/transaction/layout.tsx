import Sidebar from '@/components/Sidebar';
import '../globals.css';
import ClientLayout from '../client-provider';

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
      <ClientLayout>
        <div className="h-screen overflow-y-auto pt-[104px]">{children}</div>
      </ClientLayout>
    </div>
  );
}

