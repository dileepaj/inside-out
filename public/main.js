/* entry point for react application */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
//import react-router
import { Router, Route, browserHistory } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//tap-event-plugin for touch events
import injectTapEventPlugin from 'react-tap-event-plugin';

import NumberOfPurchasesByDay from './components/graphs/numberOfPurchasesByDay';
import CustomerEngagementPattern from './components/graphs/customerEngagementPattern';
import PurchasesByTime from './components/graphs/purchasesByTime';
import CustomerValuePerCity from './components/graphs/customerValuePerCity';
import TotalCustomersPerCity from './components/graphs/totalCustomersPerCity';
import Graphifier from './components/graphifier';
import { cyan500 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#1A237E',
    primary1Color: '#F57C00'
  },
  appBar: {
    height: 75,
  },
});

ReactDOM.render((
	<MuiThemeProvider muiTheme={muiTheme}>
		<Router history={browserHistory}>
		    <Route path="/" component={App}>
			    <Route path="/no-of-purchases-by-day" component={NumberOfPurchasesByDay} />
			    <Route path="/customer-enagagement-pattern" component={CustomerEngagementPattern} />
			    <Route path="/purchases-by-time" component={PurchasesByTime} />
			    <Route path="/customer-value-per-city" component={CustomerValuePerCity} />
			    <Route path="/total-customers-per-city" component={TotalCustomersPerCity} />
			    <Route path="/all" component={Graphifier} />
	  		</Route>
	  	</Router>
	</MuiThemeProvider>
), document.getElementById('root'));