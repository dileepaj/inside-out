import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = React.createClass({
	render: function() {
		return (
			<MuiThemeProvider>
				<div>
					<AppBar
					title="Inside-out"
					iconClassNameRight="muidocs-icon-navigation-expand-more"
					/>
			    </div>
			</MuiThemeProvider>
		)
	}
});

export default App;