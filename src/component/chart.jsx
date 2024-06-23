import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicLabel() {
  return (
    <BarChart
      {...props}
      series={[
        {
          data: [2100, 1398, 900, 970, 790, 800, 1230, 1050, 1902, 1450, 1620, 1340],
          label: 'Monthly Sales Comparasion',
        },
      ]}
    />
  );
}

const props = {
  width: 600,
  height: 300,
  xAxis: [{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nub', 'Dec'], scaleType: 'band'}],
};
