import LogoSvg from '../assets/LogoSvg';
import { useParams } from 'react-router-dom';
import { Button, Chip } from '@mui/joy';
import { ArrowRight } from '@mui/icons-material';
import  Autocomplete from '@mui/joy/Autocomplete';
import { selectGenres } from './user/userSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import Close from '@mui/icons-material/Close';

function GenrePicker() {  
  return (
    <div className="user">
        <LogoSvg/>
        <div className="buttonContainer">
            <Button className = "button"
                color="success"
                disabled={false}
                onClick={() => {}}
                size="md"
                variant="solid"
                startDecorator={<ArrowRight />}> 
                Finish
            </Button>
        </div>
        <div className="selectContainer">
            <Autocomplete
                multiple
                placeholder="Select your genres"
                options={ useAppSelector(selectGenres)}
                defaultValue={[]}
                variant="plain"
                color="info"
                limitTags={3}
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
