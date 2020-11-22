import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { finnhub } from '../../../axiosInstance';
import { format, subDays } from 'date-fns';

import IpoCard from './IpoCard';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';

const fetcher = async (currentDate: string, rangeDate: string) => {
  const { data } = await finnhub.get(
    `/calendar/ipo?from=${rangeDate}&to=${currentDate}`
  );
  return data;
};

const DATE_LOOKBEHIND: number = 3;

const IpoCalendar = () => {
  const currentDate = useCallback(() => format(new Date(), 'yyyy-MM-dd'), []);
  const rangeDate = useCallback(() => {
    const subDate = subDays(new Date(), DATE_LOOKBEHIND);
    return format(subDate, 'yyyy-MM-dd');
  }, []);

  const { data, status, error } = useQuery(
    [currentDate(), rangeDate()],
    fetcher
  );

  if (status === 'loading') {
    return (
      <Paper variant="outlined">
        <Toolbar>
          <Typography variant="h5">Recent IPO</Typography>
        </Toolbar>
        <Box padding={3} paddingTop={0}>
          {new Array(3).fill(undefined).map((_: undefined, index: number) => {
            return <IpoCard ipo={undefined} key={index} />;
          })}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined">
      <Toolbar>
        <Typography variant="h5">Recent IPO</Typography>
      </Toolbar>
      <Box padding={3} paddingTop={0}>
        {data.ipoCalendar.map((ipo: any) => {
          return <IpoCard ipo={ipo} key={ipo.name} />;
        })}
      </Box>
    </Paper>
  );
};

export default IpoCalendar;
