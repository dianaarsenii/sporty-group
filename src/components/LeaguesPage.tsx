import { useMemo, useState } from 'react';
import { useAllLeagues } from '@/api/leagues';
import { useDebounce } from '@/hooks/useDebounce';
import { useLeagueBadgeViewer } from '@/hooks/useLeagueBadgeViewer';
import { ALL_SPORTS_VALUE, filterLeagues } from '@/utils/filterLeagues';
import { getUniqueSports } from '@/utils/getUniqueSports';
import { LeagueBadgeViewer } from './LeagueBadgeViewer';
import { LeagueList } from './LeagueList';
import { SearchInput } from './SearchInput';
import { SportSelect } from './SportSelect';
import { Button } from './Button';
import styles from './LeaguesPage.module.css';

const SEARCH_DEBOUNCE_MS = 300;

export function LeaguesPage() {
  const { data: leagues = [], isLoading, isError, isFetching, refetch } = useAllLeagues();

  const [search, setSearch] = useState('');
  const [sport, setSport] = useState(ALL_SPORTS_VALUE);

  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS);
  const activeSearch = search === '' ? '' : debouncedSearch;

  const badgeViewer = useLeagueBadgeViewer();

  const sports = useMemo(() => getUniqueSports(leagues), [leagues]);

  const filteredLeagues = useMemo(
    () => filterLeagues(leagues, { search: activeSearch, sport }),
    [leagues, activeSearch, sport],
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Sports Leagues</h1>
        <p className={styles.subtitle}>
          Browse leagues, filter by sport, and click a league to see a season badge.
        </p>
      </header>

      <div className={styles.filters}>
        <div className={styles.searchField}>
          <SearchInput value={search} onChange={setSearch} />
        </div>
        <div className={styles.sportField}>
          <SportSelect sports={sports} value={sport} onChange={setSport} />
        </div>
        <Button onChange={() => setSearch('')}>
          Clear Search
        </Button>
      </div>

      <LeagueList
        leagues={filteredLeagues}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        onRetry={() => refetch()}
        onSelectLeague={badgeViewer.openBadge}
      />

      <LeagueBadgeViewer
        isOpen={badgeViewer.isOpen}
        onClose={badgeViewer.closeBadge}
        league={badgeViewer.selectedLeague}
        badge={badgeViewer.badge}
        isLoading={badgeViewer.isLoading}
        isError={badgeViewer.isError}
        isFetching={badgeViewer.isFetching}
        onRetry={badgeViewer.retry}
      />
    </main>
  );
}
