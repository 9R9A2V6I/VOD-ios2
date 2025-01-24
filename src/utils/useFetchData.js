import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiURL } from '../config';

const fetchData = async ({ queryKey }) => {
  const [action, params, method] = queryKey;
  const url = `${apiURL}admin-ajax.php`;

  if (method === 'POST') {
    const response = await axios.post(url, params);
    return response.data.data;
  } else {
    const response = await axios.get(url, { params });
    return response.data.data;
  }
};

const useFetchData = (action, params, method = 'GET') => {
  return useQuery({
    queryKey: [action, params, method],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export default useFetchData;
