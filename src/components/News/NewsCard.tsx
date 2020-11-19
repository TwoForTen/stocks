import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import OpenInNew from '@material-ui/icons/OpenInNew';

import { News } from './News';

interface NewsCardProps {
  news: News | undefined;
}

const useStyles = makeStyles((theme) => ({
  card: {
    overflow: 'visible',
  },
  media: {
    height: 200,
  },
  content: {
    padding: `${theme.spacing(2)}px 0`,
  },
  category: {
    textTransform: 'capitalize',
    padding: '0 5px',
    boxShadow: '0px 4px 9px rgba(180,90,255, 0.35)',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  actions: {
    padding: 0,
  },
}));

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const classes = useStyles();

  return (
    <Box marginTop={3}>
      <Card elevation={0} className={classes.card}>
        {news ? (
          <CardMedia
            className={classes.media}
            image={news.image}
            title="News Image"
          />
        ) : (
          <Skeleton variant="rect" height={200} animation="wave" />
        )}
        <CardContent className={classes.content}>
          <Box marginBottom={1}>
            {news ? (
              <Chip
                color="primary"
                className={classes.category}
                label={news.category}
                size="small"
              />
            ) : (
              <Skeleton animation="wave" height={25} width="15%" />
            )}
          </Box>
          <Typography gutterBottom variant="h5" component="h2">
            {news ? (
              news.headline
            ) : (
              <Skeleton variant="text" animation="wave" height={20} />
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {news ? (
              news?.summary
            ) : (
              <>
                <Skeleton variant="text" animation="wave" height={15} />
                <Skeleton
                  variant="text"
                  animation="wave"
                  height={15}
                  width="80%"
                />
              </>
            )}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          {news && (
            <a href={news?.url} className={classes.link} target="_blank">
              <Button size="small" color="primary" startIcon={<OpenInNew />}>
                See Full Article
              </Button>
            </a>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default NewsCard;
