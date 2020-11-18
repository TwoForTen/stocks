import { NextPage } from 'next';

import Appbar from '../src/components/Appbar';
import TempTable from '../src/components/TempTable';
import News from '../src/components/News/News';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const Home: NextPage = () => {
  return (
    <>
      <Appbar />
      <Container maxWidth="xl">
        <Box paddingY={3}>
          <Grid container spacing={3}>
            <Grid container item xs={12} md={9}>
              <Grid item xs={12}>
                <TempTable />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={3}
              style={{
                position: 'fixed',
                right: 5,
              }}
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
