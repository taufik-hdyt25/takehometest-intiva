import callAPI from '@/utils/fetcher';

export const getChartTransaction = async () => {
  const response = await callAPI({
    uri: '/users',
    method: 'GET',
  });
  return response;
};
