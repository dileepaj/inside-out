import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from './drawer';
import NumberOfPurchasesByDay from './graphs/numberOfPurchasesByDay';
import { Link } from 'react-router'

const fetchNumberOfPurchasesByDay = function() {
	fetch('/api/purchases-by-days')
	  .then(function(response) {
	    return response.json()
	  }).then(function(json) {
	    // console.log('parsed json', json);
	    let data = json.message;
	    let mappedData = [];
	    let xAxis = 1;
	    let values = [];
	    for(var value in data) {
	    	values.push(
	    		{ "x": xAxis, "y": data[value] }
	    	);
	    	// mappedData.push({
	    	// 	"name": value,
	    	// 	"values": [
	    	// 		{ "x": xAxis, "y": data[value] }
	    	// 	]
	    	// });
	    	xAxis += 1;
	    }
	    mappedData.name = "service A";
	    mappedData.values = values;
	    console.log(mappedData);
	    return mappedData;
	  }).catch(function(ex) {
	    console.log('parsing failed', ex)
	  });
}


const App = React.createClass({
	getInitialState: function() {
		return {
			drawer: false,
		}
	},

	componentDidMount: function() {

	},

	// shouldComponentUpdate: function() {
	// 	return true;
	// },

	_changeSideBarVisibility: function(obj) {
		this.setState({
			drawer: !this.state.drawer
		});
	},

	render: function() {
		return (			
			<div>
				<AppBar
				title="Inside-out"
				iconClassNameRight="muidocs-icon-navigation-expand-more"
				onLeftIconButtonTouchTap={this._changeSideBarVisibility}
				/>
				<Drawer visibility={this.state.drawer} />
				<Link to={`/no-of-purchases-by-day`}>Purchases by day </Link>
				<Link to={`/customer-enagagement-pattern`}>Customer engagement pattern </Link>
				<Link to={`/purchases-by-time`}>Purchases by time </Link>

				{
					this.props.children
				}
		    </div>
		)
	}
});

export default App;