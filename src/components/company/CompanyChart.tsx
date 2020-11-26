import { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';
import { AxiosResponse } from 'axios';
import { QueryStatus } from 'react-query';

interface CompanyChartProps {
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

const CompanyChart: React.FC<CompanyChartProps> = ({ data, status }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState<any>({});

  useEffect(() => {
    setChartData({
      labels: data?.chartData.data.map((day: any) => day.label),
      datasets: [
        {
          lineTension: 0.05,
          label: 'Closing Price',
          data: data?.chartData.data.map((day: any) => day.close),
          backgroundColor: 'rgba(140, 0, 255, 0.2)',
          borderColor: theme.palette.primary.main,
          pointBackgroundColor: theme.palette.primary.main,
          borderWidth: 2,
          pointHitRadius: 10,
        },
      ],
    });
  }, [data?.chartData]);

  return (
    <Line
      data={chartData}
      options={{
        title: {
          display: true,
          text: '1 Month',
        },
        scales: {
          xAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 5,
              },
            },
          ],
          yAxes: [
            {
              position: 'right',
              gridLines: {
                drawBorder: false,
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        tooltips: {
          mode: 'index',
          intersect: false,
          custom: (tooltip) => {
            if (!tooltip) return;
            tooltip.displayColors = false;
          },
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      }}
    />
  );
};

export default CompanyChart;
