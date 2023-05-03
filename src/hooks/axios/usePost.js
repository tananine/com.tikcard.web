import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startFetchQueue, endFetchQueue } from '@/stores/controller';
import axios from 'axios';

const useFetchData = (path, isLoading) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(isLoading);

  const dispatch = useDispatch();

  const startFetch = () => {
    setLoading(true);
    dispatch(startFetchQueue());
  };

  const endFetch = () => {
    setLoading(false);
    dispatch(endFetchQueue());
  };

  const action = useCallback(
    async (body, param) => {
      startFetch();
      const p = param ? `/${param}` : '';
      const promise = await axios
        .post(path + p, body)
        .then((response) => {
          setTimeout(() => {
            setData(response);
            endFetch();
          }, 100);
          return Promise.resolve(response);
        })
        .catch((error) => {
          endFetch();
          throw error;
        });
      return promise;
    },
    [path]
  );

  return [action, loading, data];
};

export default useFetchData;
