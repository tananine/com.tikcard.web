import { useCallback, useState } from 'react';
import axios from 'axios';

const useFetchData = (path) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const action = useCallback(
    async (param) => {
      setLoading(true);
      const p = param ? `/${param}` : '';
      const promise = await axios
        .get(path + p)
        .then((response) => {
          setTimeout(() => {
            setData(response);
            setLoading(false);
          }, 100);
          return Promise.resolve(response);
        })
        .catch((error) => {
          setLoading(false);
          throw error;
        });
      return promise;
    },
    [path]
  );

  return [action, loading, data];
};

export default useFetchData;
