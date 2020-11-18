import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import OpenInNew from '@material-ui/icons/OpenInNew';

import { News } from './News';

interface NewsCardProps {
  news: News;
}

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
  },
  content: {
    padding: `${theme.spacing(2)}px 0`,
  },
  category: {
    textTransform: 'capitalize',
    padding: '0 5px',
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
  const { image, summary, headline, url, category, datetime } = news;
  const classes = useStyles();

  return (
    <Box marginTop={3}>
      <Card elevation={0}>
        <CardMedia className={classes.media} image={image} title="News Image" />
        <CardContent className={classes.content}>
          <Box marginBottom={1}>
            <Chip
              color="primary"
              className={classes.category}
              label={category}
              size="small"
            />
          </Box>
          <Typography gutterBottom variant="h5" component="h2">
            {headline}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {summary}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <a href={url} className={classes.link} target="_blank">
            <Button size="small" color="primary" startIcon={<OpenInNew />}>
              See Full Article
            </Button>
          </a>
        </CardActions>
      </Card>
    </Box>
  );
};

export default NewsCard;
