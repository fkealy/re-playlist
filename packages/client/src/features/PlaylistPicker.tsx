import { Link } from 'react-router-dom';
import { Button, Option, Select } from '@mui/joy';
import { ArrowRight } from '@mui/icons-material';
import { getPlaylistTracks, selectPlaylistNames } from './user/userSlice'
import { useAppSelector, useAppDispatch } from '../app/hooks';

var playlist;

function PlaylistSelect() {
    const dispatch = useAppDispatch();
    const handleChange = (value) => {
        dispatch({type: 'user/setSelectedPlaylist', payload: value})
    };

    return (
        <Select 
            onChange={(_, value) => handleChange(value)}
            className="select"
            variant="plain"
            color="info"
            placeholder="Select your playlist"
            slotProps={{
                listbox: {
                    sx: {
                        maxHeight: '300px',
                    },
                    placement: 'bottom-start',
                },
            }}
        >
            {useAppSelector(selectPlaylistNames).map(({ name, id }) => (
                <Option key={id} value={id}>{name} </Option>
            ))}
        </Select>
    );
}


function PlaylistPicker() {
    const dispatch = useAppDispatch();
    return (
        <div>
            <div>
                <div className="buttonContainer">
                <Link to='/genre-picker'>
                    <Button className = "button"
                    color="primary"
                    disabled={false}
                    variant="solid"
                    startDecorator={<ArrowRight/>}
                    onClick={() => {
                        dispatch(getPlaylistTracks())
                    }}> 
                    Next
                    </Button>
                </Link>
                </div>
                <div className="selectContainer">
                <PlaylistSelect/>
                </div>
            </div>
        </div>
  );
}

export default PlaylistPicker;
