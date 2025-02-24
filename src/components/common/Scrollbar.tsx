import React from "react";
import { cn } from "../../utils";

interface ScrollbarProps {
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
}

const Scrollbar: React.FC<ScrollbarProps> = ({ children, maxHeight = "400px", className }) => {
  return (
    <div
      style={{ maxHeight }}
      className={cn("custom-scrollbar overflow-y-auto relative", className)}
    >
      {children}
      <style>{`
        /* WebKit browsers */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #367AC9;
          border-radius: 9999px;
        }
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #367AC9 #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default Scrollbar;
