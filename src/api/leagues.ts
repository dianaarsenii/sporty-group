import { useQuery } from '@tanstack/react-query';
import { httpGet } from './httpClient';
import { API_ENDPOINTS } from './config';
import { League, AllLeaguesResponse } from '@/types/league';

export const leagueQueryKeys = {
  all: ['leagues'] as const,
};

export async function getAllLeagues(signal?: AbortSignal): Promise<League[]> {
  const data = await httpGet<AllLeaguesResponse>(API_ENDPOINTS.allLeagues, signal);

  if (!data.leagues) {
    throw new Error('The leagues API responded without any league data.');
  }

  return data.leagues;
}

export function useAllLeagues() {
  return useQuery({
    queryKey: leagueQueryKeys.all,
    queryFn: ({ signal }) => getAllLeagues(signal),
    staleTime: Infinity,
  });
}
