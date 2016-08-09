import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const DrawerCustom = React.createClass({
	getInitialState: function() {
		return {
			open: false
		}
	},

	render: function() {
		return (			
			<div>
		        <Drawer
		          docked={false}
		          width={200}
		          open={this.props.visibility}
		          onRequestChange={(open) => this.setState({open})}
		        >
		        	<MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
			        <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
		        </Drawer>
		    </div>
		)
	}
});

export default DrawerCustom;
