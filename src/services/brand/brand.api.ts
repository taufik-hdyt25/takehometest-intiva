import callAPI from '@/utils/fetcher';

export const getChartBrand = async () => {
  const response = await callAPI({
    uri: '/brands',
    method: 'GET',
  });
  return response;
};
