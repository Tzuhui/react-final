import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import './assets/scss/all.scss';
import {
  HashRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Message from './components/Message';
import store from './app/store';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Message />
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);

// export default ErrorPage;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
