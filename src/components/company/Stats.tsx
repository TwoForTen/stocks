import React from 'react';
import { AxiosResponse } from 'axios';
import { QueryStatus } from 'react-query';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
    <Grid container item xs={12}>
      <Grid item xs={6}>
        <Stat
          title="52 Week High"
          value={data?.stats.data['52WeekHigh']}
          status={status}
        />
        <Stat
          title="52 Week Low"
          value={data?.stats.data['52WeekLow']}
          status={status}
        />
        <Stat title="EPS" value={data?.stats.data['EPS']} status={status} />
        <Stat
          title="Payout Ratio"
          value={data?.stats.data['PayoutRatio']}
          status={status}
        />
        <Stat
          title="Profit Margin"
          value={data?.stats.data['ProfitMargin']}
          status={status}
        />
        <Stat title="Beta" value={data?.stats.data['Beta']} status={status} />
      </Grid>
      <Grid item xs={6}>
        <Stat
          title="Employees"
          value={data?.stats.data['FullTimeEmployees']}
          status={status}
        />
        <Stat
          title="P/E Ratio"
          value={data?.stats.data['PERatio']}
          status={status}
        />
        <Stat
          title="Short Ratio"
          value={data?.stats.data['ShortRatio']}
          status={status}
        />
        <Stat
          title="Dividend Per Share"
          value={data?.stats.data['DividendPerShare']}
          status={status}
        />
        <Stat
          title="Dividend Yield"
          value={data?.stats.data['DividendYield']}
          status={status}
        />
      </Grid>
    </Grid>
  );
};

interface StatProps {
  title: string;
  value: string;
  status: QueryStatus;
}

const Stat: React.FC<StatProps> = ({ title, value, status }) => {
  return (
    <Box marginBottom={3}>
      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
        {status === 'success' ? (
          title
        ) : (
          <Skeleton variant="text" animation="wave" width="20%" />
        )}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {status === 'success' ? (
          value
        ) : (
          <Skeleton variant="text" animation="wave" width="30%" />
        )}
      </Typography>
    </Box>
  );
};

export default Stats;
