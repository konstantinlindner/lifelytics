import { UserProvider } from '@/contexts/UserContext';
import { DatabaseProvider } from '@/contexts/DatabaseContext';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DatabaseProvider>
      <UserProvider>{children}</UserProvider>
    </DatabaseProvider>
  );
}
