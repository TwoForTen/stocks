import { useEffect, useState, useContext, useCallback } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { throttle } from 'lodash';
import { useQuery } from 'react-query';
import { finnhub, alphavantage, iex } from '../axiosInstance';

import Box from '@material-ui/core/Box';
// import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { SocketContext } from '../src/context/Socket';
import TopBar from '../src/components/company/TopBar';
import Stats from '../src/components/company/Stats';
import About from '../src/components/company/About';
import CompanyChart from '../src/components/company/CompanyChart';

const fetcher = async (symbol: string) => {
  if (symbol) {
    const getCompanyInfo = () =>
      finnhub.get(`/stock/profile2?symbol=${symbol}`);
    const getStats = () =>
      alphavantage.get(`/query?function=OVERVIEW&symbol=${symbol}`);
    const getQuote = () => finnhub.get(`/quote?symbol=${symbol}`);
    const getChartData = () => iex.get(`/stock/${symbol}/chart/1m`);

    const [companyInfo, stats, quote, chartData] = await Promise.all([
      getCompanyInfo(),
      getStats(),
      getQuote(),
      getChartData(),
    ]);

    return { companyInfo, stats, quote, chartData };
  } else return;
};

const CompanyPage: NextPage = () => {
  const router = useRouter();
  const { company } = router.query;
  const { socket } = useContext(SocketContext);

  const [wsData, setWsData] = useState<any>([]);

  const { status, data } = useQuery([company], fetcher, {
    refetchOnWindowFocus: false,
  });

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
    socket.emit('unsubscribe');
    setWsData([]);
    if (company) socket.emit('subscribe', company);
  }, [company]);

  return (
    <>
      <TopBar wsData={wsData} data={data} status={status} />
      {/* <Container maxWidth="lg" style={{ padding: 0 }}> */}
      <Box marginY={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={9}>
            <Paper>
              <Toolbar>
                <Typography variant="h5">Overview</Typography>
              </Toolbar>
              <Box padding={3}>
                <Grid container>
                  <Grid item md={5} xs={12}>
                    <Stats data={data} status={status} />
                  </Grid>
                  <Grid item md={7} xs={12}>
                    <CompanyChart data={data} status={status} />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={3}>
            <About data={data} status={status} />
          </Grid>
        </Grid>
      </Box>
      {/* </Container> */}
    </>
  );
};

export default CompanyPage;
