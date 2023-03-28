import React from 'react';
import Login from './features/login/Login';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import User from './features/User';
import GenrePicker from './features/GenrePicker';
import PlaylistPicker from './features/PlaylistPicker';
import Error from './features/error/Error';

function App() {
  return (
          <BrowserRouter basename='/'>
           <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='user/:accessToken/:refreshToken' element={<User/>} />
              <Route path='user/playlist-picker' element={<PlaylistPicker/>} />
              <Route path='user/genre-picker' element={<GenrePicker/>} />
              <Route path='error/:errorMsg' element={<Error/>} />
           </Routes>
         </BrowserRouter>
  );
}

export default App;
