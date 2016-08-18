import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from './drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
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

	_changeSideBarVisibility: function(obj) {
		this.setState({
			drawer: !this.state.drawer
		});
	},

	signOut: function() {
		document.location = '/';
	},

	render: function() {
		return (			
			<div>
				<AppBar
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
					}}
				title="ComTale - Inside Out"
				iconClassNameRight="muidocs-icon-navigation-expand-more"
				onLeftIconButtonTouchTap={this._changeSideBarVisibility}
				iconElementRight={
				      <IconMenu
				        iconButtonElement={
				          <IconButton><MoreVertIcon /></IconButton>
				        }
				        targetOrigin={{horizontal: 'right', vertical: 'top'}}
				        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				      >
				        <MenuItem primaryText="Help" />
				        <MenuItem onClick={this.signOut}  primaryText="Sign out" />
				      </IconMenu>
				    }
				/>
				<Drawer visibility={this.state.drawer} close={this._changeSideBarVisibility} />

				{
					this.props.children
				}
		    </div>
		)
	}
});

export default App;