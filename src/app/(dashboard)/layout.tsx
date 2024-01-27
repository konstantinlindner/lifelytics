import { UserProvider } from '@/contexts/UserContext';
import { DatabaseProvider } from '@/contexts/DatabaseContext';

import { Toaster } from '@/components/ui/sonner';

export default function OuterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <DatabaseProvider>
        {children}
        <Toaster />
      </DatabaseProvider>
    </UserProvider>
  );
}
