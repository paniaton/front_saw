import React, { useEffect, useState } from "react";

const useInterval = (callback: () => void, time: number) => {
  useEffect(() => {
    const interval = setInterval(callback, time);
    return () => clearInterval(interval);
  }, []);
};

export default useInterval;
