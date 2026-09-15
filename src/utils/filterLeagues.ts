import { League } from '@/types/league';

export const ALL_SPORTS_VALUE = 'all';

export type LeagueFilterCriteria = {
  search: string;
  sport: string;
};

export function filterLeagues(leagues: League[], { search, sport }: LeagueFilterCriteria): League[] {
  const normalizedSearch = search.trim().toLowerCase();

  return leagues.filter((league) => {
    if (sport !== ALL_SPORTS_VALUE && league.strSport !== sport) return false;
    if (normalizedSearch === '') return true;

    const searchableName = `${league.strLeague} ${league.strLeagueAlternate ?? ''}`.toLowerCase();
    return searchableName.includes(normalizedSearch);
  });
}
