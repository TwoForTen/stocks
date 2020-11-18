import { useQuery } from 'react-query';

import { iex } from '../../axiosInstance';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const dataFetcher = async () => {
  const { data } = await iex.get(
    `/stock/market/collection/list?collectionName=mostactive`
  );
  return data;
};

export default function BasicTable() {
  const classes = useStyles();

  const { status, data } = useQuery('popular', dataFetcher);

  if (status === 'loading') {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Current Price</TableCell>
            <TableCell>52 Week High</TableCell>
            <TableCell>52 Week Low</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((company: any) => (
            <TableRow key={company.symbol}>
              <TableCell component="th" scope="row">
                {company.symbol}
              </TableCell>
              <TableCell>{company.companyName}</TableCell>
              <TableCell>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(company.latestPrice)}
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(company.week52High)}
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(company.week52Low)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
