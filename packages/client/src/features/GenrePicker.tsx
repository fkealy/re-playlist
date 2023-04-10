import { Link as RouterLink} from 'react-router-dom';
import Link from '@mui/joy/Link';
import { Button, Chip, Autocomplete } from '@mui/joy';
import { ArrowRight, Close } from '@mui/icons-material';
import { selectGenres, selectUserSelectedGenres } from './user/userSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

function GenrePicker() { 
    var genres = useAppSelector(selectUserSelectedGenres);
    const dispatch = useAppDispatch();
    const handleChange = (value) => {
        dispatch({type: 'user/setSelectedGenres', payload: value})
    };

    return (
        <div className="userInputContainer">
            <div className="buttonContainer">
                <Link component={RouterLink }to='/result' underline="none">
                    <Button className = "button"
                        color="success"
                        disabled={false}
                        size="md"
                        variant="solid"
                        startDecorator={<ArrowRight />}
                        onClick={() => {
                            dispatch({type: 'result/getResults' })
                        }}> 
                        Go
                    </Button>
                </Link>
            </div>
            <div className="selectContainer">
                <Autocomplete
                    className="select"
                    multiple
                    placeholder="Select up to 5 genres"
                    onChange={(_, value) => handleChange(value)}
                    options={ useAppSelector(selectGenres)}
                    getOptionDisabled={() => genres.length > 4}
                    defaultValue={[]}
                    variant="plain"
                    color="neutral"
                    renderTags={(tags, getTagProps) =>
                        tags.map((item, index) => (
                        <Chip
                            variant="solid"
                            color="neutral"
                            endDecorator={<Close/>}
                            {...getTagProps({ index })}
                        >
                            {item}
                        </Chip>
                        ))
                    }
                    slotProps={{
                        listbox: {
                        sx: {
                            maxHeight: '300px',
                            minWidth: '300px',
                        },
                        placement: 'bottom-start' ,
                        },
                    }}
                />       
            </div>
        </div>
    );
}

export default GenrePicker;
