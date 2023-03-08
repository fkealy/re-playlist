import React from 'react';
import Login from './Login';
import { HashRouter as Router, Routes, Route} from "react-router-dom";
import User from './User';
import Error from './Error';

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
