import React from 'react';
import { AxiosResponse } from 'axios';
import { QueryStatus } from 'react-query';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Skeleton from '@material-ui/lab/Skeleton';

interface StatsProps {
  data:
    | {
        companyInfo: AxiosResponse<any>;
        stats: AxiosResponse<any>;
        quote: AxiosResponse<any>;
        chartData: AxiosResponse<any>;
      }
    | undefined;
  status: QueryStatus;
}

const Stats: React.FC<StatsProps> = ({ data, status }) => {
  return (
    <Paper>
      <Toolbar>
        <Typography variant="h5">About</Typography>
      </Toolbar>
      <Box padding={3}>
        <Typography variant="body1">
          {status === 'success' ? (
            data?.stats.data['Description']
          ) : (
            <>
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" width={'60%'} />
            </>
          )}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Stats;
