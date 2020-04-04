import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url, initialData = null, changeDataCallback) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let didCancel = false;
    
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        let { data } = await axios(url);
        if (changeDataCallback) data = changeDataCallback(data);
        if (!didCancel) setData(data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    return () => (didCancel = true);
  }, [changeDataCallback, url]);

  return { data, setData, isLoading, isError };
};

export default useFetch;
