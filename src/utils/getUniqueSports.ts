import { League } from '@/types/league';

export function getUniqueSports(leagues: League[]): string[] {
  const sports = new Set(leagues.map((league) => league.strSport).filter(Boolean));
  return Array.from(sports);
}
