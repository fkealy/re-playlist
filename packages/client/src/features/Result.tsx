import { Button } from '@mui/joy';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getResults, selectIsLoading, selectPlaylistId } from './result/resultSlice';
import { useEffect, useState } from 'react';

function Result() {
  const dispatch = useAppDispatch();
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    dispatch(getResults());
  }, [dispatch]);

  const isLoading = useAppSelector(selectIsLoading);
  const playlistSrc = useAppSelector(selectPlaylistId);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setShowIframe(true);
      }, 1000); // Adjust the delay (in milliseconds) as needed
    }
  }, [isLoading]);

  return (
      isLoading ? (
        <Button loading loadingPosition="start" variant="outlined">
        </Button>
      ) : (
        <div className='iframe'>
          {showIframe && (
            <iframe
              title="Spotify Playlist"
              src={playlistSrc}
              width="300"
              height="380"
              frameBorder="0"
              allowTransparency={true}
              allow="encrypted-media"
            ></iframe>
          )}
        </div>
      )
  );
}

export default Result;