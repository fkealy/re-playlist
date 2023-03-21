import React from 'react';
import Login from './features/login/Login';
import { HashRouter as Router, Routes, Route} from "react-router-dom";
import User from './features/User';
import Error from './features/error/Error';

function App() {
  return (
          <Router>
           <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='user/:accessToken/:refreshToken' element={<User/>} />
              <Route path='error/:errorMsg' element={<Error/>} />
           </Routes>
         </Router>
  );
}

export default App;
