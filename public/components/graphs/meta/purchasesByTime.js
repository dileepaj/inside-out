import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const TableExampleSimple = () => (
  <Table selectable={false} >
    <TableHeader displaySelectAll={false}>
      <TableRow>
        <TableHeaderColumn>Day</TableHeaderColumn>
        <TableHeaderColumn>Purchases</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn>Monday</TableRowColumn>
        <TableRowColumn>50000</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
);

export default TableExampleSimple;