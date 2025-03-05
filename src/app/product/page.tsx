'use client';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useActionGetChartProducts } from '@/services/products/products.function';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const BarChart = dynamic(() => import('@/components/Chart/BarChart'), {
  ssr: false,
});

const Product: NextPage = () => {
  const { data, isLoading } = useActionGetChartProducts();
  const filterData = data?.data?.map((val)=> val?.id)
  const uniqData = [...new Set(filterData)]


  const result = uniqData?.map((val)=> {
    const datas = data?.data?.filter((e)=> e.id === val)
    const totalAmount = datas?.reduce((a,b)=> a + b.amount, 0)
    return ({
      name: datas?.at(0)?.name,
      id: val,
      amount: totalAmount
    })
  }) ?? []
  
  
  const chartData: number[] = result?.map((val) => val?.amount ?? 0) ?? []
  const chartLabel:string[] = result?.map((val) => val.name ?? "") ?? []
  const totalItem = result?.reduce((a,b)=> a + (b?.amount ?? 0), 0)
  
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
