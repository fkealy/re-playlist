import LogoSvg from '../assets/LogoSvg';
import { useParams } from 'react-router-dom';
import { Button, Chip } from '@mui/joy';
import { ArrowRight } from '@mui/icons-material';

function Result() {  
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
           
        </div>
    </div>
  );
}

export default Result;
