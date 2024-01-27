import { UserProvider } from '@/contexts/UserContext';
import { DatabaseProvider } from '@/contexts/DatabaseContext';

import { Toaster } from '@/components/ui/sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DatabaseProvider>
      <UserProvider>
        {children}
        <Toaster />
      </UserProvider>
    </DatabaseProvider>
  );
}
