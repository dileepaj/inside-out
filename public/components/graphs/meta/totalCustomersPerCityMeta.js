import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const TotalCustomerPerCityMeta = React.createClass({

  renderTable: function() {
    return this.props.data.map(function(data) {
      return (
        <TableRow>
          <TableRowColumn>{ data.label }</TableRowColumn>
          <TableRowColumn>{ data.value }%</TableRowColumn>
        </TableRow>
      );
    });
  },

  render: function() {
    return (
      <Table selectable={false} >
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>City</TableHeaderColumn>
            <TableHeaderColumn>Value</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.renderTable()}
        </TableBody>
      </Table>
    );
  }

});

export default TotalCustomerPerCityMeta;