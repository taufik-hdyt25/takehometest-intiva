'use-client';

import { IBaseResponse } from '@/interfaces/IBaseResponse ';
import { useQuery } from '@tanstack/react-query';
import { getChartTransaction } from './transaction.api';
import { ITransaction } from './transaction.types';

export const useActionGetChartTransactions = () => {
  return useQuery({
    queryKey: ['tranasactions'],
    queryFn: getChartTransaction,
    select: (res) => (res as IBaseResponse<ITransaction[]>) ?? null,
  });
};
