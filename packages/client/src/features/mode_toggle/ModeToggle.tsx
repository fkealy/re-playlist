import { useColorScheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import { IconButton } from '@mui/joy';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <div
    className="darkMode"
    >
    <IconButton
      variant="plain"
      color="neutral"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      {mode === 'dark' ? <DarkModeOutlinedIcon/> : <DarkModeIcon/>}
    </IconButton>
    </div>
  );
}

export default ModeToggle;