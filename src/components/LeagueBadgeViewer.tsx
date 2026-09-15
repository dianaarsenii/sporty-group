import { useState } from 'react';
import { League } from '@/types/league';
import { SeasonBadge } from '@/types/seasonBadge';
import { Modal } from './Modal';
import { Spinner } from './Spinner';
import { Button } from './Button';
import styles from './LeagueBadgeViewer.module.css';

type LeagueBadgeViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  league: League | null;
  badge?: SeasonBadge | null;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  onRetry: () => void;
};

function BadgeImage({
  src,
  alt,
  season,
}: {
  src: string | null;
  alt: string;
  season: string | null;
}) {
  const [hasFailed, setHasFailed] = useState(false);
  const showPlaceholder = !src || hasFailed;

  return (
    <>
      {showPlaceholder ? (
        <div className={styles.placeholder}>No badge image available</div>
      ) : (
        <img src={src} alt={alt} className={styles.badgeImage} onError={() => setHasFailed(true)} />
      )}
      {season && <p className={styles.seasonLabel}>Season {season}</p>}
    </>
  );
}

export function LeagueBadgeViewer({
  isOpen,
  onClose,
  league,
  badge,
  isLoading,
  isError,
  isFetching,
  onRetry,
}: LeagueBadgeViewerProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={league?.strLeague ?? 'League badge'}>
      <div className={styles.content}>
        {isLoading && <Spinner />}

        {!isLoading && isError && (
          <>
            <p className={styles.errorMessage}>Could not load the season badge.</p>
            <Button onClick={onRetry} disabled={isFetching}>
              {isFetching ? 'Retrying…' : 'Retry'}
            </Button>
          </>
        )}

        {!isLoading && !isError && badge && (
          <BadgeImage
            key={badge.strSeason ?? 'season'}
            src={badge.strBadge}
            alt={`${league?.strLeague ?? 'League'} season badge`}
            season={badge.strSeason}
          />
        )}

        {!isLoading && !isError && !badge && (
          <p className={styles.emptyMessage}>No season information is available for this league.</p>
        )}
      </div>
    </Modal>
  );
}
