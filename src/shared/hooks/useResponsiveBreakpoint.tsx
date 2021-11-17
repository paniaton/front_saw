import { useState, useEffect } from "react";
import useWindowSize from "./useWindowSize";

const useResponsiveBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<
    "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  >("sm");
  const size = useWindowSize();

  useEffect(() => {
    if (size.width < 640) {
      setBreakpoint("xs");
      return;
    }
    if (size.width < 768) {
      setBreakpoint("sm");
      return;
    }
    if (size.width < 1024) {
      setBreakpoint("md");
      return;
    }
    if (size.width < 1280) {
      setBreakpoint("lg");
      return;
    }
    if (size.width < 1536) {
      setBreakpoint("xl");
      return;
    }
    setBreakpoint("2xl");
  }, [size]);

  return breakpoint;
};

export default useResponsiveBreakpoint;
