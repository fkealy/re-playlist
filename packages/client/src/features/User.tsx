import LogoSvg from '../assets/LogoSvg';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/joy';
import { ArrowRight } from '@mui/icons-material';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import { getUserPlaylists, selectPlaylistNames } from '../features/user/userPlaylistsSlice'
import { useAppSelector, useAppDispatch } from '../app/hooks';



function SelectBasic() {
  const playlists = useAppSelector(selectPlaylistNames);
  console.log(playlists);
  return (
    <Select className = "select" variant="soft" color="warning" placeholder="Select your playlist">
      <Option value="dog">Dog</Option>
      <Option value="cat">Cat</Option>
    </Select>
  );
}

function User() {


  const { accessToken, refreshToken } = useParams();
  const dispatch = useAppDispatch();
  dispatch({type: 'auth/setToken', payload: accessToken })


  const onClick = () => {
    dispatch(getUserPlaylists())
  }
  
  return (
    <div className="user">
      <LogoSvg/>
      <div className="buttonContainer">
      <Button className = "button"
          color="success"
          disabled={false}
          onClick={() =>onClick()}
          size="md"
          variant="solid"
          startDecorator={<ArrowRight />}> 
        Next
      </Button>
      </div>
      <div className="selectContainer">
      <SelectBasic/>
      </div>
    </div>
  );
}

export default User;
