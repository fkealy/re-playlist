import { Button } from '@mui/joy';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getResults, selectIsLoading, selectLoadingPercentage, selectPlaylistId } from './result/resultSlice';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';


function Result() {
  const dispatch = useAppDispatch();
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    dispatch(getResults());
  }, [dispatch]);

  const isLoading = useAppSelector(selectIsLoading);
  const progress = useAppSelector(selectLoadingPercentage);
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
          <div className='loadingBar'>
            <LinearProgress
              determinate
              variant="outlined"
              color="neutral"
              size="sm"
              thickness={32}
              value={progress}
              sx={{
                '--LinearProgress-radius': '0px',
                '--LinearProgress-progressThickness': '24px',
                boxShadow: 'sm',
                borderColor: 'neutral.500',
              }}
            >
              <Typography
                level="body3"
                fontWeight="xl"
                textColor="common.white"
                sx={{ mixBlendMode: 'difference' }}
              >
                LOADING… {`${Math.round(progress)}%`}
              </Typography>
            </LinearProgress>
          </div>
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