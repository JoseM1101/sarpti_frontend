import React from "react";
import { twMerge } from "tailwind-merge";

interface GlobalLoaderProps {
  visible: boolean;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className={twMerge(
      "fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40 z-50"
    )}>
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default GlobalLoader;
