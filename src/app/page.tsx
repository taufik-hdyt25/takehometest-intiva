'use client';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MONTHS } from '@/constants';
import { useActionGetChartTransactions } from '@/services/transaction/transaction.function';
import { formatRupiah } from '@/utils/format-rupiah';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const BarChart = dynamic(() => import('@/components/Chart/BarChart'), {
  ssr: false,
});

const Transaction: NextPage = () => {
  const { data, isLoading } = useActionGetChartTransactions();
  const totalTransaction =
    (data?.data && data?.data?.reduce((a, b) => a + b.amount, 0)) || 0;

  const chartData = data?.data?.map((val) => val.amount);
  const transactions = data?.data?.length || 0;
  const mean = totalTransaction / transactions;

  return (
    <div className="mt-[57px] px-[41px]">
      <div className="text-[28px] font-semibold">Transaction</div>
      <div className="flex gap-5 items-center mt-[24px]">
        <Card className="w-[299px] p-[16px] h-[107px] rounded-none flex flex-col justify-evenly gap-2">
          <div>Total</div>
          <div className="flex items-center gap-[8px]">
            <Image
              width={30}
              height={30}
              src="./svg/ic-total-revenue.svg"
              alt="total"
            />
            <span className="text-[16px] font-semibold">
              {formatRupiah(totalTransaction || 0)}
            </span>
          </div>
        </Card>
        <Card className="w-[299px] p-[16px] h-[107px] rounded-none flex flex-col justify-evenly gap-2">
          <div>Mean</div>
          <div className="flex items-center gap-[8px]">
            <Image
              width={30}
              height={30}
              src="./svg/ic-total-revenue.svg"
              alt="total"
            />
            <span className="text-[16px] font-semibold">
              {formatRupiah(mean || 0)}
            </span>
          </div>
        </Card>
      </div>

      {isLoading ? (
        <Skeleton className="w-full h-[400px] rounded-lg mt-5" />
      ) : (
        <div className="p-3 shadow-lg rounded-md">
          <BarChart data={chartData || []} categories={MONTHS} type="line" />
        </div>
      )}
    </div>
  );
};

export default Transaction;
