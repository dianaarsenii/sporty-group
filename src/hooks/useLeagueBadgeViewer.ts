import { useState } from 'react';
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

  return {
    selectedLeague,
    isOpen: selectedLeague !== null,
    badge,
    isLoading,
    isError,
    isFetching,
    openBadge: (league: League) => setSelectedLeague(league),
    closeBadge: () => setSelectedLeague(null),
    retry: () => {
      void refetch();
    },
  };
}
