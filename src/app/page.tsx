'use client';
import { BarChart } from '@/components/Chart';
import { Card } from '@/components/ui/card';
import { useActionGetChartUser } from '@/services/transaction/transaction.function';

import Image from 'next/image';

const Transaction = () => {
  const { data } = useActionGetChartUser();

  const chartData = data?.data?.map((val) => val.count_transactions);
  const chartLabel = data?.data?.map((val) => val.username);

  return (
    <div className="mt-[20px] px-[20px]">
      <div className="text-[28px] font-semibold">Transaction</div>
      <Card className="w-[299px] p-[16px] h-[107px] rounded-none flex flex-col justify-between mt-[24px]">
        <div>Total Revenue</div>
        <div className="flex items-center gap-[8px]">
          <img src="./svg/ic-total-revenue.svg" alt="total" />
          <span className="text-[24px] font-semibold">Rp 896.876.000</span>
        </div>
      </Card>

      <BarChart
        data={chartData || []}
        categories={chartLabel || []}
        type="line"
      />
    </div>
  );
};

export default Transaction;
