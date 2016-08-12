import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router'

const DrawerCustom = React.createClass({
	getInitialState: function() {
		return {
			open: false
		}
	},

	handleClose: function() {
		this.props.close();
	},

	render: function() {
		return (			
			<div>
		        <Drawer
		          docked={false}
		          width={300}
		          open={this.props.visibility}
		          onRequestChange={(open) => this.setState({open})}
		        >
		        	<MenuItem onTouchTap={this.handleClose}><Link to={`/no-of-purchases-by-day`}>Purchases by day </Link></MenuItem>
			        <MenuItem onTouchTap={this.handleClose}><Link to={`/customer-enagagement-pattern`}>Customer engagement pattern </Link></MenuItem>
					<MenuItem onTouchTap={this.handleClose}><Link to={`/purchases-by-time`}>Purchases by time </Link></MenuItem>
					<MenuItem onTouchTap={this.handleClose}><Link to={`/customer-value-per-city`}>Customer value per city </Link></MenuItem>
					<MenuItem onTouchTap={this.handleClose}><Link to={`/total-customers-per-city`}>Total customers per city </Link></MenuItem>
		        </Drawer>
		    </div>
		)
	}
});

export default DrawerCustom;
