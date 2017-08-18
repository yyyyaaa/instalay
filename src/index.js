import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './index.css';
import App from './App';
import CreatePage from './CreatePage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <div className="section">
      <Route exact path="/" component={App} />
      <Route exact path="/create" component={CreatePage} />
    </div>
  </Router>
, document.getElementById('root'));

registerServiceWorker();
