import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const container = {
	marginTop: '15'
}

const PaintPointReview = React.createClass({
	render: function() {
		return (			
			<div style={container} className="col-md-9 col-lg-9 col-xl-9">
				<Card>
				<CardHeader
                      title="Customer pain point analysis summary"
                      actAsExpander={false}
                      showExpandableButton={false}
                    />
				{/* pain point table should come CardHeader */}
			  </Card>
		    </div>
		)
	}
});

export default PaintPointReview;
