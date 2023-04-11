import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { store }  from './app/store';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { CssBaseline } from '@mui/joy';

function Root() {
  const theme = extendTheme({ cssVarPrefix: 'demo' });
    return (
      <React.StrictMode>
        <Provider store={store}>
            <CssVarsProvider
              defaultMode="dark"
              // The props below are specific to this demo,
              // you might not need them in your app.
              //
              theme={theme}
              // the local storage key to use.
              modeStorageKey="demo_identify-system-mode"
              // set as root provider
              disableNestedContext
            >
              <CssBaseline />
            <App/>
          </CssVarsProvider>
        </Provider>
      </React.StrictMode>
    );
}
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// render town
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
reportWebVitals(console.log);
