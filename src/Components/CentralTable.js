import React , { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
     minWidth: 300,
  },
});


class CentralTable extends Component {

  CentralTable() {
    //const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <TableHead>
          <TableRow>
            <StyledTableCell align="center">State</StyledTableCell>
            <StyledTableCell align="center">Vaccine Manufacturer</StyledTableCell>
            <StyledTableCell align="center">Supply</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.manufactures.map((row,key) => {
            return(
            <StyledTableRow key={row.state}>
              <StyledTableCell align="center">{row.name.toString()}</StyledTableCell>
              <StyledTableCell align="center">{row.company_add.toString()}</StyledTableCell>
              <StyledTableCell align="center">{row.company_id.toString()}</StyledTableCell>
            </StyledTableRow>
            )
          })}
        </TableBody>
    </TableContainer>
    );
  } 
}

export default CentralTable;