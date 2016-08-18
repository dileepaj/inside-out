import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const PurchasesByTimeMeta = React.createClass({

  renderTable: function() {
    return this.props.data.map(function(data) {
      console.log(data);
      return (
        <TableRow>
          <TableRowColumn>{ data.Day }</TableRowColumn>
          <TableRowColumn>{ data.Period }</TableRowColumn>
          <TableRowColumn>{ data.Amount }</TableRowColumn>
        </TableRow>
      );
    });
  },

  render: function() {
    return (
      <Table selectable={false} >
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Day</TableHeaderColumn>
            <TableHeaderColumn>Period</TableHeaderColumn>
            <TableHeaderColumn>Amount</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.renderTable()}
        </TableBody>
      </Table>
    );
  }

});

export default PurchasesByTimeMeta;