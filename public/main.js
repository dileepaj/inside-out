/* entry point for react application */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
//import react-router
import { Router, Route, browserHistory } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//tap-event-plugin for touch events
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render((
	<MuiThemeProvider>
		<Router history={browserHistory}>
		    <Route path="/" component={App} />
	  	</Router>
	</MuiThemeProvider>
), document.getElementById('root'));