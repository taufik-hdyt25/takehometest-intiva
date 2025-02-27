import { IBaseResponse } from '@/interfaces/IBaseResponse ';
import { useQuery } from '@tanstack/react-query';
import { getChartProducts } from './products.api';
import { IProduct } from './products.types';

export const useActionGetChartProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getChartProducts,
    select: (res) => (res as IBaseResponse<IProduct[]>) ?? null,
  });
};
