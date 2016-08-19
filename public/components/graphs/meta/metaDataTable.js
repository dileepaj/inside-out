import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MetaDataTable = React.createClass({

  renderTable: function() {
    return this.props.data.map(function(amount, index) {
      return (
        <TableRow>
          <TableRowColumn>{days[index]}</TableRowColumn>
          <TableRowColumn>{ amount }</TableRowColumn>
        </TableRow>
      );
    });
  },

  render: function() {
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Day</TableHeaderColumn>
            <TableHeaderColumn>Purchases</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.renderTable()}
        </TableBody>
      </Table>
    );
  }

});

export default MetaDataTable;