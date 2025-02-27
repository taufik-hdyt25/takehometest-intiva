import callAPI from '@/utils/fetcher';

export const getChartProducts = async () => {
  const response = await callAPI({
    uri: '/products',
    method: 'GET',
  });
  return response;
};
