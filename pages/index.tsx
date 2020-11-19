import { NextPage } from 'next';
import { useQuery } from 'react-query';
import { iex } from '../axiosInstance';

import Appbar from '../src/components/Appbar';
import HomepageTable from '../src/components/HomepageTable';
import News from '../src/components/News/News';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const dataFetcher = async () => {
  const { data } = await iex.get(
    `/stock/market/collection/list?collectionName=mostactive`
  );
  return data;
};

const Home: NextPage = () => {
  const { status, data } = useQuery('popular', dataFetcher);
  return (
    <>
      <Appbar />
      <Container maxWidth="xl">
        <Box paddingY={3}>
          <Grid container spacing={3}>
            <Grid container item xs={12} md={9}>
              <Grid item xs={12}>
                <HomepageTable companies={data} status={status} />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={3}
              style={
                {
                  // position: 'fixed',
                  // right: 5,
                }
              }
            >
              <Grid item xs={12}>
                <News />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;
