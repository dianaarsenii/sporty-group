import { League } from '@/types/league';
import { LeagueCard } from './LeagueCard';
import { Spinner } from './Spinner';
import { EmptyState } from './EmptyState';
import { Button } from './Button';
import styles from './LeagueList.module.css';

type LeagueListProps = {
  leagues: League[];
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  hasActiveFilters: boolean;
  onRetry: () => void;
  onSelectLeague: (league: League) => void;
};

export function LeagueList({
  leagues,
  isLoading,
  isError,
  isFetching,
  hasActiveFilters,
  onRetry,
  onSelectLeague,
}: LeagueListProps) {
  if (isLoading) {
    return (
      <div className={styles.centered}>
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.errorState}>
        <p className={styles.errorMessage}>Failed to load leagues.</p>
        <Button onClick={onRetry} disabled={isFetching}>
          {isFetching ? 'Retrying…' : 'Retry'}
        </Button>
      </div>
    );
  }

  if (leagues.length === 0) {
    return hasActiveFilters ? (
      <EmptyState
        title="No leagues match your filters"
        description="Try a different search term or sport."
      />
    ) : (
      <EmptyState title="No leagues available" description="The API returned an empty list." />
    );
  }

  return (
    <ul className={styles.grid}>
      {leagues.map((league) => (
        <li key={league.idLeague} className={styles.gridItem}>
          <LeagueCard league={league} onSelect={onSelectLeague} />
        </li>
      ))}
    </ul>
  );
}
