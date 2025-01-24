// hooks/useGetApi.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGetApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, options);
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url, options]);

  return { data, loading, error };
};


// hooks/usePostApi.js
export const usePostApi = (url, postData, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const postDataAsync = async () => {
      setLoading(true);
      try {
        const response = await axios.post(url, postData, options);
        setData(response.data);
      } catch (err) {
        console.error('Error posting data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (url && postData) {
      postDataAsync();
    }
  }, [url, postData, options]);

  return { data, loading, error };
};





