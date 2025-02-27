import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

type ChartType =
  | 'line'
  | 'area'
  | 'bar'
  | 'pie'
  | 'donut'
  | 'radialBar'
  | 'scatter'
  | 'bubble'
  | 'heatmap'
  | 'candlestick'
  | 'boxPlot'
  | 'radar'
  | 'polarArea'
  | 'rangeBar'
  | 'rangeArea'
  | 'treemap'
  | undefined;

interface IBarProps {
  type: ChartType;
  categories: string[] | null | undefined;
  data: number[] | null | undefined;
  radius?: number;
}

const BarChart: React.FC<IBarProps> = ({ type, categories, data, radius }) => {
  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {show:false}
    },
    stroke: {
      curve: 'straight',
    },
    xaxis: {
      categories: categories,
    },
    plotOptions: {
      bar: {
        borderRadius: radius ? radius : 0,
        columnWidth: 20,
      },
    },
    dataLabels: {
      enabled:false
    }
  };

  const series = [
    {
      name: '',
      data: data || [],
    },
  ];
  return (
    <div>
      <Chart options={options} series={series} type={type} height={350} />
    </div>
  );
};

export default BarChart;
