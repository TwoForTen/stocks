import { useEffect, useState, useContext, useCallback } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { throttle } from 'lodash';
import { useQuery } from 'react-query';
import { finnhub } from '../axiosInstance';

import { SocketContext } from '../src/context/Socket';
import Category from '../src/components/Category';

import percentageCalculator from '../src/utils/percentageCalculator';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ArrowBack from '@material-ui/icons/ArrowBack';
import Favorite from '@material-ui/icons/GradeOutlined';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: theme.spacing(8),
    width: theme.spacing(8),
  },
  categorySkeleton: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const fetcher = async (symbol: string) => {
  const getCompanyInfo = () => finnhub.get(`/stock/profile2?symbol=${symbol}`);
  const getQuote = () => finnhub.get(`/quote?symbol=${symbol}`);

  const [companyInfo, quote] = await Promise.all([
    getCompanyInfo(),
    getQuote(),
  ]);

  return { companyInfo, quote };
};

const CompanyPage: NextPage = () => {
  const router = useRouter();
  const { company } = router.query;
  const { socket } = useContext(SocketContext);
  const classes = useStyles();
  const theme = useTheme();

  const [wsData, setWsData] = useState<any>();

  const { status, data } = useQuery([company], fetcher, {
    refetchOnWindowFocus: false,
  });

  const percentage = useCallback(
    () =>
      percentageCalculator(
        wsData && wsData?.type === 'trade'
          ? wsData.data[0].p
          : data?.quote.data.c,
        data?.quote.data.pc
      ),
    [wsData, data?.quote]
  );

  useEffect(() => {
    socket.on(
      'data',
      throttle((data: any) => setWsData(JSON.parse(data)), 5000, {
        leading: true,
        trailing: false,
      })
    );

    return () => {
      socket.emit('unsubscribe');
    };
  }, []);

  useEffect(() => {
    if (company) socket.emit('subscribe', company);
  }, [company]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Box
              paddingY={3}
              paddingX={1}
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <Box display="flex" alignItems="center">
                <Box marginRight={1}>
                  <IconButton onClick={() => router.push('/')}>
                    <ArrowBack fontSize="large" />
                  </IconButton>
                </Box>
                <Avatar
                  src={data?.companyInfo.data.logo}
                  alt="Company Image"
                  className={classes.avatar}
                  variant="rounded"
                />
                <Box marginX={3}>
                  <Box marginBottom={1}>
                    {status !== 'loading' ? (
                      <Category
                        label={data?.companyInfo.data.finnhubIndustry}
                      />
                    ) : (
                      <Skeleton
                        animation="wave"
                        height={30}
                        width={90}
                        className={classes.categorySkeleton}
                      />
                    )}
                  </Box>
                  <Box display="flex" alignItems="baseline">
                    <Typography variant="h6" component="h1">
                      {status !== 'loading' ? (
                        data?.companyInfo.data.ticker
                      ) : (
                        <Skeleton variant="text" width={50} animation="wave" />
                      )}
                    </Typography>
                    <Box marginLeft={1}>
                      <Typography variant="body1" component="h2">
                        {status !== 'loading' ? (
                          data?.companyInfo.data.name
                        ) : (
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={120}
                          />
                        )}
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
                        {status !== 'loading' ? (
                          `(${percentage().toFixed(2)}%)`
                        ) : (
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width={60}
                          />
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Box marginRight={3}>
                      <Typography variant="h4">
                        {new Intl.NumberFormat('en', {
                          style: 'currency',
                          currency: data?.companyInfo.data.currency || 'USD',
                        }).format(
                          wsData && wsData?.type === 'trade'
                            ? wsData.data[0].p
                            : data?.quote.data.c
                        )}
                      </Typography>
                      <Typography variant="overline">Current Price</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4">
                        {new Intl.NumberFormat('en', {
                          style: 'currency',
                          currency: data?.companyInfo.data.currency || 'USD',
                        }).format(data?.quote.data.pc)}
                      </Typography>
                      <Typography variant="overline">Previous Close</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box paddingX={3}>
                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<Favorite />}
                >
                  Add to Favorites
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CompanyPage;
