import { useQuery } from '@tanstack/react-query';
import { httpGet } from './httpClient';
import { API_ENDPOINTS } from './config';
import { SeasonBadge, SeasonBadgeResponse } from '@/types/seasonBadge';

export const seasonBadgeQueryKeys = {
  byLeagueId: (leagueId: string) => ['season-badge', leagueId] as const,
};

export async function getSeasonBadge(
  leagueId: string,
  signal?: AbortSignal,
): Promise<SeasonBadge | null> {
  const data = await httpGet<SeasonBadgeResponse>(API_ENDPOINTS.seasonBadge(leagueId), signal);
  const seasons = data.seasons ?? [];
  return findNewestSeason(seasons);
}

function findNewestSeason(seasons: SeasonBadge[]): SeasonBadge | null {
  return seasons.length > 0 ? seasons[seasons.length - 1] : null;
}

export function useSeasonBadge(leagueId: string | null) {
  return useQuery({
    queryKey: seasonBadgeQueryKeys.byLeagueId(leagueId ?? 'none'),
    queryFn: ({ signal }) => {
      if (leagueId === null) throw new Error('useSeasonBadge called without a league id');
      return getSeasonBadge(leagueId, signal);
    },
    enabled: leagueId !== null,
    staleTime: Infinity,
  });
}
