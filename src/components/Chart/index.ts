import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./BarChart'), { ssr: true });

export default Chart;
