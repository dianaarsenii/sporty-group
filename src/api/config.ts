export const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

export const API_ENDPOINTS = {
  allLeagues: `${API_BASE_URL}/all_leagues.php`,
  seasonBadge: (leagueId: string) =>
    `${API_BASE_URL}/search_all_seasons.php?badge=1&id=${leagueId}`,
};
