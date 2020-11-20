import { useState } from 'react';
import { useQuery } from 'react-query';

import { finnhub } from '../../../axiosInstance';
import NewsCard from './NewsCard';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export interface News {
  id: number;
  datetime: number;
  image: string;
  headline: string;
  url: string;
  summary: string;
  category: string;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    maxHeight: '88vh',
    overflow: 'auto',
  },
  button: {
    overflowAnchor: 'none',
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(5),
    },
  },
  toolbar: {
    position: 'sticky',
    left: '0',
  },
}));

const newsFetcher = async () => {
  const { data } = await finnhub.get('/news?category=general');
  return data;
};

const NEWS_INCREMENT: number = 15;

const News = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mediaMd = useMediaQuery(theme.breakpoints.down('md'));

  const [newsAmount, setNewsAmount] = useState<number>(NEWS_INCREMENT);

  const { status, data, error } = useQuery('news', newsFetcher);

  const loadMoreNews = () => setNewsAmount((prev) => prev + NEWS_INCREMENT);

  if (status === 'loading') {
    return (
      <Box width="100%">
        <Paper className={classes.paper} variant="outlined">
          <Typography variant="h5">Latest market news</Typography>
          {new Array(3).fill(undefined).map((_: undefined, index: number) => {
            return <NewsCard news={undefined} key={index} />;
          })}
        </Paper>
      </Box>
    );
  }

  if (status === 'error') {
    console.log(error);
    return (
      <Box>
        <Paper className={classes.paper} variant="outlined">
          <Typography variant="h5">Something went wrong...</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      <Paper className={classes.paper} variant="outlined">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5">Latest market news</Typography>
        </Toolbar>
        <Box display={mediaMd ? 'flex' : 'block'}>
          {data
            .filter((item: any, index: number) => index < newsAmount)
            .map((news: News) => {
              return <NewsCard news={news} key={news.id} />;
            })}
          <Box padding={3} textAlign="center" alignSelf="center">
            {newsAmount < data.length ? (
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={loadMoreNews}
                className={classes.button}
              >
                Load more
              </Button>
            ) : (
              <Typography variant="overline" color="primary">
                No more posts to show
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default News;
