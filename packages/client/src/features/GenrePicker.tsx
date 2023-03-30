import { Link } from 'react-router-dom';
import { Button, Chip, Autocomplete } from '@mui/joy';
import { ArrowRight, Close } from '@mui/icons-material';
import { selectGenres } from './user/userSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

function GenrePicker() { 
    var genres = [];
    const dispatch = useAppDispatch();
    const handleChange = (value) => {
        genres = value;
        console.log(genres);
    };

    return (
        <div>
            <div className="buttonContainer">
                <Link to='/genre-picker'>
                    <Button className = "button"
                        color="success"
                        disabled={false}
                        size="md"
                        variant="solid"
                        startDecorator={<ArrowRight />}
                        onClick={() => {
                            dispatch({type: 'user/setSelectedGenres', payload: genres })
                        }}> 
                        Go
                    </Button>
                </Link>
            </div>
            <div className="selectContainer">
                <Autocomplete
                    multiple
                    placeholder="Select your genres"
                    onChange={(_, value) => handleChange(value)}
                    options={ useAppSelector(selectGenres)}
                    getOptionDisabled={() => genres.length > 4}
                    defaultValue={[]}
                    variant="plain"
                    color="info"
                    renderTags={(tags, getTagProps) =>
                        tags.map((item, index) => (
                        <Chip
                            variant="solid"
                            color="primary"
                            endDecorator={<Close/>}
                            {...getTagProps({ index })}
                        >
                            {item}
                        </Chip>
                        ))
                    }
                    sx={{ maxWidth: '300px' }}
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
