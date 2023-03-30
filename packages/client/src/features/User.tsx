import LogoSvg from '../assets/LogoSvg';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/joy';
import { getUserPlaylists, getGenreSeeds, selectIsLoading } from './user/userSlice'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Navigate } from 'react-router-dom';

function User() {
  const { accessToken, refreshToken } = useParams();
  const dispatch = useAppDispatch();
  dispatch({type: 'auth/setToken', payload: accessToken })
  dispatch(getUserPlaylists())
  dispatch(getGenreSeeds())
  
  return (
  <div className="user">
    <LogoSvg/>
    { useAppSelector(selectIsLoading) ?
      <Button loading loadingPosition="start" variant="outlined">
      </Button> : <Navigate to='/playlist-picker'/>}
  </div>
  );
}

export default User;
