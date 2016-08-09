/**
 * Created by Dishan on 8/9/2016.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';

const StyledAppBar = () => (
	<AppBar
		style={{
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			height:500,
		}}
		iconClassNameRight="muidocs-icon-navigation-expand-more"
	/>
);

export default StyledAppBar;