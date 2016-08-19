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
				<Table selectable={false}>
					    <TableHeader displaySelectAll={false}>
					      <TableRow>
					        <TableHeaderColumn>Pain point</TableHeaderColumn>
					        <TableHeaderColumn>Reviewer</TableHeaderColumn>
					        <TableHeaderColumn>Score</TableHeaderColumn>
					      </TableRow>
					    </TableHeader>
					    <TableBody displayRowCheckbox={false}>
					      <TableRow>
					        <TableRowColumn>Muddy water inside the packaging</TableRowColumn>
					        <TableRowColumn>吕 文 </TableRowColumn>
					        <TableRowColumn>23</TableRowColumn>
					      </TableRow>
					      <TableRow>
					        <TableRowColumn>Fish has the plastic smell of the packaging</TableRowColumn>
					        <TableRowColumn>吕 文 </TableRowColumn>
					        <TableRowColumn>23</TableRowColumn>
					      </TableRow>
					      <TableRow>
					        <TableRowColumn>Fish are scattered, raw and slightly bitter </TableRowColumn>
					        <TableRowColumn>张 典</TableRowColumn>
					        <TableRowColumn>23</TableRowColumn>
					      </TableRow>
					      <TableRow>
					        <TableRowColumn>Price of meat is a little higher than expected </TableRowColumn>
					        <TableRowColumn>小 泓霓 </TableRowColumn>
					        <TableRowColumn>14</TableRowColumn>
					      </TableRow>
					    </TableBody>
				  </Table>
			  </Card>

		    </div>
		)
	}
});

export default PaintPointReview;
