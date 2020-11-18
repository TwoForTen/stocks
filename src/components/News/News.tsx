import { useQuery } from 'react-query';

import { finnhub } from '../../../axiosInstance';
import NewsCard from './NewsCard';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
    padding: '2em',
    maxHeight: '88vh',
    overflow: 'auto',
  },
}));

const newsFetcher = async () => {
  const { data } = await finnhub.get('/news?category=general');
  return data;
};

const News = () => {
  const classes = useStyles();
  const { status, data } = useQuery('news', newsFetcher);

  if (status === 'loading') return null;

  return (
    <Box>
      <Paper className={classes.paper}>
        <Typography variant="h5">Latest market news</Typography>
        {data
          .filter((item: any, index: number) => index < 15)
          .map((news: News) => {
            return <NewsCard news={news} key={news.id} />;
          })}
      </Paper>
    </Box>
  );
};

export default News;
