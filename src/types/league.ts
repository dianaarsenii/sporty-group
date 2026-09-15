export type League = {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string | null;
};

export type AllLeaguesResponse = {
  leagues: League[] | null;
};
