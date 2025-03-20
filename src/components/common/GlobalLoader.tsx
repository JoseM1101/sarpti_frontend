import React from "react";
import { twMerge } from "tailwind-merge";
import Card from "./Card";

interface GlobalLoaderProps {
  visible: boolean;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div
      className={twMerge(
        "fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40 z-50"
      )}
    >
      <Card className="p-4">
        <div
          className="w-[50px] h-[50px] border-[4px] border-solid border-[rgba(0,0,0,0.1)] border-t-[#3498db] rounded-full animate-spin"
        ></div>
      </Card>
    </div>
  );
};

export default GlobalLoader;
