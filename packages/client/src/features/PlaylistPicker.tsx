import LogoSvg from '../assets/LogoSvg';
import { Link } from 'react-router-dom';
import { Button } from '@mui/joy';
import { ArrowRight } from '@mui/icons-material';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import { selectPlaylistNames } from './user/userSlice'
import { useAppSelector, useAppDispatch } from '../app/hooks';

function PlaylistSelect() {
  return (
    <Select 
        className = "select" 
        variant="plain"
        color="info"
        placeholder="Select one of your saved playlists"
        slotProps={{
        listbox: {
            sx: {
            maxHeight: '300px',
            },
            placement: 'bottom-start' ,
        },
        }}
    >
      {useAppSelector(selectPlaylistNames).map(playlist => { return ( <Option value={playlist} key={playlist}> {playlist} </Option>) })}
    </Select>
  );
}

function PlaylistPicker() {
  return (
  <div>
    <div className="buttonContainer">
      <Link to='/user/genre-picker'>
        <Button className = "button"
        color="primary"
        disabled={false}
        variant="solid"
        startDecorator={<ArrowRight/>}> 
        Next
        </Button>
      </Link>
    </div>
    <div className="selectContainer">
      <PlaylistSelect/>
    </div>
  </div>
  );
}

export default PlaylistPicker;
