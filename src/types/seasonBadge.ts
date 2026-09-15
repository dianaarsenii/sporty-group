export type SeasonBadge = {
  strSeason: string | null;
  strBadge: string | null;
};

export type SeasonBadgeResponse = {
  seasons: SeasonBadge[] | null;
};
