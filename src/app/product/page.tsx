'use client';
import { BarChart } from '@/components/Chart';
import { Card } from '@/components/ui/card';
import { useActionGetChartBrands } from '@/services/brand/brand.function';
import Image from 'next/image';

const Product = () => {
  const { data } = useActionGetChartBrands();

  const chartData = data?.data?.map((val) => val.count_sold);
  const chartLabel = data?.data?.map((val) => val.name);

  return (
    <div className="mt-[20px] px-[20px]">
      <div className="text-[28px] font-semibold">Product</div>
      <Card className="w-[299px] p-[16px] h-[107px] rounded-none flex flex-col justify-between mt-[24px]">
        <div>Total Item</div>
        <div className="flex items-center gap-[8px]">
          <img src="./svg/ic-total-revenue.svg" alt="total" />
          <span className="text-[24px] font-semibold">
            {data?.data?.length || 0}
          </span>
        </div>
      </Card>

      <BarChart
        data={chartData || []}
        categories={chartLabel || []}
        type="bar"
        radius={6}
      />
    </div>
  );
};

export default Product;
