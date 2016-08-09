import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const App = React.createClass({
	getInitialState: function() {
		this.setState({
			open: true
		});
	},

	render: function() {
		return (			
			<div>
				<AppBar
				title="Inside-out"
				iconClassNameRight="muidocs-icon-navigation-expand-more"
				/>
				<RaisedButton
		          label="Open Drawer"
		          onTouchTap={this.handleToggle}
		        />
		        <Drawer
		          docked={false}
		          width={200}
		          open={this.state.open}
		          onRequestChange={(open) => this.setState({open})}
		        >
		          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
		          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
		        </Drawer>
		    </div>
		)
	}
});

export default App;