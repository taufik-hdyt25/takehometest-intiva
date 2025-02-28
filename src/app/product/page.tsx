'use client';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useActionGetChartProducts } from '@/services/products/products.function';
import { IProduct } from '@/services/products/products.types';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const BarChart = dynamic(() => import('@/components/Chart/BarChart'), {
  ssr: false,
});

const Product: NextPage = () => {
  const { data, isLoading } = useActionGetChartProducts();
  const chartData = data?.data?.map((val: IProduct) => val?.amount);
  const chartLabel = data?.data?.map((val: IProduct) => val.name);
  const totalItem = data?.data?.length || 0;

  return (
    <div className="mt-[57px] px-[41px]">
      <div className="text-[28px] font-semibold">Product</div>
      <Card className="w-[299px] p-[16px] h-[107px] rounded-none flex flex-col justify-between mt-[24px]">
        <div>Total Items</div>
        <div className="flex items-center gap-[8px]">
          <Image
            width={30}
            height={30}
            src="./svg/ic-total-revenue.svg"
            alt="total"
          />
          <span className="text-[24px] font-semibold">{totalItem}</span>
        </div>
      </Card>

      {isLoading ? (
        <Skeleton className="w-full h-[400px] rounded-lg mt-5" />
      ) : (
        <div className="p-3 shadow-lg rounded-md">
          <BarChart
            data={chartData || []}
            categories={chartLabel || []}
            type="bar"
            radius={6}
          />
        </div>
      )}
    </div>
  );
};

export default Product;
