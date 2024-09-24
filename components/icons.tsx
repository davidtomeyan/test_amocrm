import React, { useEffect } from "react";
import clsx from "clsx";

export const Indicator = ({ i }: { i: number | null }) => {
  const [color, setColor] = React.useState<string>("bg-gray-500");

  useEffect(() => {
    switch (i) {
      case -1: {
        setColor("bg-red-600");
        break;
      }
      case 0: {
        setColor("bg-green-700");
        break;
      }
      case 1: {
        setColor("bg-yellow-500");
        break;
      }
      default:
        setColor("bg-gray-500");
    }
  }, [i]);

  return (
    <svg
      className={clsx([color, " rounded-full"])}
      fill="currentColor"
      height="12"
      viewBox="0 0 16 16"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    />
  );
};
