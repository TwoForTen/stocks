import { NextPage } from 'next';
import { useQuery } from 'react-query';
import { iex, finnhub } from '../axiosInstance';

import HomepageTable from '../src/components/HomepageTable';
import News from '../src/components/news/News';
import IpoCalendar from '../src/components/ipo/IpoCalendar';
import Favorites from '../src/components/favorites/Favorites';
import useLocalStorage from '../src/hooks/useLocalStorage';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridSpacing: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0 !important',
      padding: '0 !important',
    },
  },
}));

const homepageFetcher = async () => {
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

const favoritesFetcher = async (favorites: string[]) => {
  const profiles = [];
  const quotes = [];
  try {
    for (let i = 0; i < favorites.length; i++) {
      const quote = await finnhub.get(`/quote?symbol=${favorites[i]}`);
      const profile = await finnhub.get(
        `/stock/profile2?symbol=${favorites[i]}`
      );
      profiles.push(profile);
      quotes.push(quote);
    }
  } catch (err) {
    console.log(err);
  }

  return { favCompanies: profiles, quote: quotes };
};

const Home: NextPage = () => {
  const classes = useStyles();
  const [favorites] = useLocalStorage('favorites', []);

  const { status, data } = useQuery('homepage', homepageFetcher);
  const { status: favStatus, data: favData } = useQuery(
    [favorites],
    favoritesFetcher,
    { refetchOnWindowFocus: false }
  );

  return (
    <main>
      <Grid container spacing={3} alignItems="flex-start">
        <Grid
          container
          item
          xs={12}
          lg={9}
          spacing={3}
          className={classes.gridSpacing}
        >
          <Grid item xs={12}>
            <Box>
              <Favorites status={favStatus} data={favData} />
            </Box>
          </Grid>
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
        <Grid
          container
          item
          xs={12}
          lg={3}
          spacing={3}
          className={classes.gridSpacing}
        >
          <Grid item xs={12}>
            <News />
          </Grid>
          <Grid item xs={12}>
            <IpoCalendar />
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
};

export default Home;
