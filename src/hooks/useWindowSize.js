import { useEffect, useState, useCallback } from "react";

const useWindowSize = () => {
  const getSize = useCallback(
    () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }),
    []
  );

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const handleResize = () => setWindowSize(getSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getSize]);

  return windowSize;
};

export default useWindowSize;