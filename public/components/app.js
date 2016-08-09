import React from 'react';
import StyledAppBar from './AppBar/appbar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = React.createClass({
	render: function() {
		return (
			<MuiThemeProvider>
				<div>
					<StyledAppBar/>
			    </div>
			</MuiThemeProvider>
		)
	}
});

export default App;