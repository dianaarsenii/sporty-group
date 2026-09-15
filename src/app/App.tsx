import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LeaguesPage } from '@/components/LeaguesPage';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <LeaguesPage />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
