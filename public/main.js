import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
//import react-router
import { Router, Route, browserHistory } from 'react-router'

//tap-event-plugin for touch events
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render((
	<Router history={browserHistory}>
	    <Route path="/" component={App} />
  	</Router>
), document.getElementById('root'));