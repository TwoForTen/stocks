import { QueryStatus } from 'react-query';
import Link from 'next/link';

import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

export interface CompanyTable {
  symbol: string;
  companyName: string;
  latestPrice: number;
  week52High: number;
  week52Low: number;
}

interface HomepageTableProps {
  companies: CompanyTable[];
  status: QueryStatus;
  title: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `0 ${theme.spacing(2)}px`,
  },
  table: {
    minWidth: 650,
  },
  avatar: {
    padding: theme.spacing(2),
    background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    transform: 'rotate(45deg)',
    boxShadow: '4px 4px 9px rgba(180,90,255, 0.3)',
    marginLeft: theme.spacing(1.5),
  },
  symbol: {
    transform: 'rotate(-45deg)',
  },
  name: {
    textDecoration: 'underline',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  high: {
    color: theme.palette.success.main,
  },
  low: {
    color: theme.palette.error.main,
  },
}));

const HomepageTable: React.FC<HomepageTableProps> = ({
  companies,
  status,
  title,
}) => {
  const classes = useStyles();

  if (status === 'loading') {
    return null;
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Toolbar>
        <Typography variant="h5">{title}</Typography>
      </Toolbar>
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
          {companies.map((company: any) => (
            <TableRow key={company.symbol} hover>
              <TableCell component="th" scope="row">
                <Avatar className={classes.avatar} variant="rounded">
                  <Typography className={classes.symbol} variant="button">
                    {company.symbol}
                  </Typography>
                </Avatar>
              </TableCell>
              <TableCell>
                <Link href="/[company]" as={`/${company.symbol}`}>
                  <a>
                    <Typography variant="subtitle1" className={classes.name}>
                      {company.companyName}
                    </Typography>
                  </a>
                </Link>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(company.latestPrice)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" className={classes.high}>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(company.week52High)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" className={classes.low}>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(company.week52Low)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HomepageTable;
