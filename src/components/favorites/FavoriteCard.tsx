import { useCallback } from 'react';
import Link from 'next/link';
import { AxiosResponse } from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import percentageCalculator from '../../utils/percentageCalculator';

interface FavoriteCardProps {
  data:
    | {
        favCompanies: AxiosResponse<any>;
        quote: AxiosResponse<any>;
      }
    | undefined;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: theme.spacing(8),
    width: theme.spacing(8),
  },
  categorySkeleton: {
    backgroundColor: theme.palette.primary.main,
  },
  link: {
    textDecoration: 'underline',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
}));

const FavoriteCard: React.FC<FavoriteCardProps> = ({ data }) => {
  const theme = useTheme();
  const classes = useStyles();

  const percentage = useCallback(
    () => percentageCalculator(data?.quote.data.c, data?.quote.data.pc),
    [data?.quote]
  );

  return (
    <Paper>
      <Box
        paddingY={3}
        paddingX={3}
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box display="flex" alignItems="center">
          <Avatar
            src={data?.favCompanies.data.logo}
            alt="Company Image"
            className={classes.avatar}
            variant="rounded"
          />
          <Box marginX={3}>
            <Box display="flex" alignItems="baseline">
              <Link href="/[company]" as={`/${data?.favCompanies.data.ticker}`}>
                <a>
                  <Typography
                    variant="h6"
                    component="h1"
                    className={classes.link}
                  >
                    {data?.favCompanies.data.ticker}
                  </Typography>
                </a>
              </Link>
              <Box
                marginLeft={1}
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  maxWidth: '150px',
                }}
              >
                <Typography
                  variant="body1"
                  component="h2"
                  style={{ textOverflow: 'ellipsis' }}
                >
                  {data?.favCompanies.data.name}
                </Typography>
              </Box>
              <Box marginLeft={1}>
                <Typography
                  variant="body1"
                  component="h2"
                  style={{
                    color:
                      Math.sign(percentage()) === 1
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                  }}
                >
                  {`(${percentage().toFixed(2)}%)`}
                </Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Box marginRight={3}>
                <Typography variant="h4">
                  {new Intl.NumberFormat('en', {
                    style: 'currency',
                    currency: data?.favCompanies.data.currency || 'USD',
                  }).format(data?.quote.data.c)}
                </Typography>
                <Typography variant="overline">Current Price</Typography>
              </Box>
              <Box>
                <Typography variant="h4">
                  {new Intl.NumberFormat('en', {
                    style: 'currency',
                    currency: data?.favCompanies.data.currency || 'USD',
                  }).format(data?.quote.data.pc)}
                </Typography>
                <Typography variant="overline">Previous Close</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default FavoriteCard;
