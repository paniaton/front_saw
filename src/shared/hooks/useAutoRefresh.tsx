import React, { useState } from "react";
import useInterval from "./useInterval";

const useAutoRefresh = function <T>(callback: () => Promise<T>, time: number) {
  const [data, setData] = useState<T | undefined>(undefined);

  useInterval(() => callback().then((res) => setData(res)), time);

  return data;
};

export default useAutoRefresh;
