import { useQuery } from '@tanstack/react-query';
import { getChartBrand } from './brand.api';
import { IBaseResponse } from '@/interfaces/IBaseResponse ';
import { IBrand } from './brand.types';

export const useActionGetChartBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: getChartBrand,
    select: (res) => (res as IBaseResponse<IBrand[]>) ?? null,
  });
};
