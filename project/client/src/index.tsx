import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/layout/layout'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// @ts-ignore
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

ReactDOM.render(
<Layout/>,
  document.getElementById('root')
);

reportWebVitals();
