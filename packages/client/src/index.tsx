import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import reducer from './reducers';
import { createStore } from 'redux';

function Root() {

const store = createStore(reducer)
    return (
      <React.StrictMode>
        <Provider store={store}>
          <App/>
        </Provider>
      </React.StrictMode>
    );
}
// render town
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
reportWebVitals(console.log);
