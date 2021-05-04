import React from 'react';
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

function createData(centre, ud, nopv) {
  return { centre, ud, nopv };
}

const rows = [
  createData('Kaveri Hospital', 2000, 23000),
  createData('Ganga Medical Centre', 3300, 44455),
  createData('Kaveri Hospital', 2000, 23000),
  createData('Ganga Medical Centre', 3300, 44455),
 
];

const useStyles = makeStyles({
  table: {
     minWidth: 300,
  },
});

export default function StateTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Centre</StyledTableCell>
            <StyledTableCell align="center">Upcoming Doses</StyledTableCell>
            <StyledTableCell align="center">No of people Vaccinated</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.centre}>
              <StyledTableCell align="center">{row.centre}</StyledTableCell>
              <StyledTableCell align="center">{row.ud}</StyledTableCell>
              <StyledTableCell align="center">{row.nopv}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
