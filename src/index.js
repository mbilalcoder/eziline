import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
// import Layout from '../../components/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Layout>
  <>
  <Router>
    
    <App />
  </Router>
  </>
  // </Layout>
);
