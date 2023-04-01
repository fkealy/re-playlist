import Login from './features/login/Login';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import User from './features/User';
import GenrePicker from './features/GenrePicker';
import PlaylistPicker from './features/PlaylistPicker';
import Result from './features/Result';
import Error from './features/error/Error';
import LogoSvg from './assets/LogoSvg';

function App() {
  return (
    <div className="user">
      <LogoSvg/>
            <BrowserRouter basename='/'>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='user/:accessToken/:refreshToken' element={<User/>} />
                <Route path='playlist-picker' element={<PlaylistPicker/>} />
                <Route path='genre-picker' element={<GenrePicker/>} />
                <Route path='result' element={<Result/>} />
                <Route path='error/:errorMsg' element={<Error/>} />
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
