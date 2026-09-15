import { League } from '@/types/league';
import styles from './LeagueCard.module.css';

type LeagueCardProps = {
  league: League;
  onSelect: (league: League) => void;
};

export function LeagueCard({ league, onSelect }: LeagueCardProps) {
  return (
    <button type="button" onClick={() => onSelect(league)} className={styles.card}>
      <span className={styles.sportBadge}>{league.strSport}</span>
      <span className={styles.leagueName}>{league.strLeague}</span>
      <span className={styles.leagueAlternate}>
        {league.strLeagueAlternate || 'No alternate name'}
      </span>
    </button>
  );
}
