import { NextPage } from 'next';
import { useQuery } from 'react-query';
import { iex } from '../axiosInstance';
import { useEffect } from 'react';

import HomepageTable from '../src/components/HomepageTable';
import News from '../src/components/news/News';
import IpoCalendar from '../src/components/ipo/IpoCalendar';

import Grid from '@material-ui/core/Grid';

const fetcher = async () => {
  const getMostActive = () =>
    iex.get(`/stock/market/collection/list?collectionName=mostactive`);
  const getGainers = () =>
    iex.get(`/stock/market/collection/list?collectionName=gainers`);
  const getLosers = () =>
    iex.get(`/stock/market/collection/list?collectionName=losers`);

  const [mostActive, gainers, losers] = await Promise.all([
    getMostActive(),
    getGainers(),
    getLosers(),
  ]);
  return { mostActive, gainers, losers };
};

const Home: NextPage = () => {
  const { status, data } = useQuery('homepage', fetcher);

  return (
    <Grid container spacing={3} alignItems="flex-start">
      <Grid container item xs={12} lg={9} spacing={3}>
        <Grid item xs={12}>
          <HomepageTable
            companies={data?.mostActive.data}
            status={status}
            title="Most Active"
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <HomepageTable
            companies={data?.gainers.data}
            status={status}
            title="Top Gainers"
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <HomepageTable
            companies={data?.losers.data}
            status={status}
            title="Top Losers"
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} lg={3} spacing={3}>
        <Grid item xs={12}>
          <News />
        </Grid>
        <Grid item xs={12}>
          <IpoCalendar />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
