import callAPI from '@/utils/fetcher';

export const getChartTransaction = async () => {
  const response = await callAPI({
    uri: '/transactions',
    method: 'GET',
  });
  return response;
};
