import Login from './features/login/Login';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import User from './features/User';
import GenrePicker from './features/GenrePicker';
import PlaylistPicker from './features/PlaylistPicker';
import Result from './features/Result';
import Error from './features/error/Error';
import LogoSvg from './assets/LogoSvg';
import Logout from './features/logout/Logout';
import { selectIsLoggedIn } from './features/auth/authSlice'
import { useAppSelector } from './app/hooks';
import ModeToggle from './features/mode_toggle/ModeToggle';

function App() {
  return (
    <div>
      { useAppSelector(selectIsLoggedIn) && <Logout/> }
      <ModeToggle/>
      <div className="user">
        <LogoSvg/>
              <BrowserRouter basename='/'>
              <Routes>
                  <Route path='/' element={<Login/>}/>
                  <Route path='user/:userId/:country/:accessToken/:refreshToken' element={<User/>} />
                  <Route path='playlist-picker' element={<PlaylistPicker/>} />
                  <Route path='genre-picker' element={<GenrePicker/>} />
                  <Route path='result' element={<Result/>} />
                  <Route path='error/:errorMsg' element={<Error/>} />
              </Routes>
            </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
