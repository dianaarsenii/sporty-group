import { useCallback, useMemo, useState } from 'react';
import { League } from '@/types/league';
import { useSeasonBadge } from '@/api/seasonBadge';

export function useLeagueBadgeViewer() {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);

  const {
    data: badge,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useSeasonBadge(selectedLeague?.idLeague ?? null);

  const openBadge = useCallback((league: League) => setSelectedLeague(league), []);
  const closeBadge = useCallback(() => setSelectedLeague(null), []);
  const retry = useCallback(() => {
    void refetch();
  }, [refetch]);

  return useMemo(
    () => ({
      selectedLeague,
      isOpen: selectedLeague !== null,
      badge,
      isLoading,
      isError,
      isFetching,
      openBadge,
      closeBadge,
      retry,
    }),
    [selectedLeague, badge, isLoading, isError, isFetching, openBadge, closeBadge, retry],
  );
}
