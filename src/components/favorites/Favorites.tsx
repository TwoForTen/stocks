import { QueryStatus } from 'react-query';
import { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import useLocalStorage from '../../hooks/useLocalStorage';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import FavoriteCard from './FavoriteCard';

interface FavoritesProps {
  status: QueryStatus;
  data:
    | {
        favCompanies: AxiosResponse<any>[];
        quote: AxiosResponse<any>[];
      }
    | undefined;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: theme.spacing(1.5),
  },
}));

const Favorites: React.FC<FavoritesProps> = ({ status, data }) => {
  const classes = useStyles();
  const [favorites] = useLocalStorage('favorites', []);

  if (status === 'loading' && !!favorites && !isEmpty(favorites)) {
    return (
      <Box textAlign="center" marginY={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (isEmpty(data?.favCompanies)) {
    return (
      <Box textAlign="center" marginY={3}>
        <Typography variant="subtitle2" color="textSecondary">
          Your Favorite companies will show here
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={classes.container}>
      {data?.favCompanies.map((company: any, index: number) => {
        return (
          <FavoriteCard
            data={{ favCompanies: company, quote: data.quote[index] }}
            key={index}
          />
        );
      })}
    </Box>
  );
};

export default Favorites;
