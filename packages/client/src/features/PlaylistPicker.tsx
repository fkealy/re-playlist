import { Link as RouterLink} from 'react-router-dom';
import Link from '@mui/joy/Link';
import { Button, Option, Select } from '@mui/joy';
import { ArrowRight } from '@mui/icons-material';
import { getPlaylistTracks, selectPlaylistNames, selectIsPlaylistChosen } from './user/userSlice'
import { useAppSelector, useAppDispatch } from '../app/hooks';


function PlaylistSelect() {
    const dispatch = useAppDispatch();
    const handleChange = (name, id) => {
        console.log(name);
        dispatch({type: 'user/setSelectedPlaylist', payload: {id: id, name: name}})
      };

    return (
        <Select 
            onChange={(event, id) => {
                const target = event?.target as HTMLButtonElement
                handleChange(target.innerText , id)}
            }
            className="select"
            variant="plain"
            color="neutral"
            placeholder="Select your playlist"
            sx={{maxWidth: '300px',        
            }}
            slotProps={{
                button: {
                    sx: {
                        whiteSpace: 'pre-wrap',
                    }
                },
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
            <div className="userInputContainer">
                <div className="buttonContainer">
                { useAppSelector(selectIsPlaylistChosen) ? 
                    <Link component={RouterLink} to='/genre-picker' underline="none">
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
                    </Link> : 
                    <Button className = "button"
                        color="primary"
                        disabled={true}
                        variant="solid"
                        startDecorator={<ArrowRight/>}> 
                        Next
                    </Button> }
                </div>
                <div className="selectContainer">
                <PlaylistSelect/>
                </div>
            </div>
        </div>
  );
}

export default PlaylistPicker;
