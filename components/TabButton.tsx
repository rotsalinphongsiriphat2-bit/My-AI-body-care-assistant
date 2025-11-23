
import React from 'react';

interface TabButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ onClick, isActive, children }) => {
  const baseClasses = "flex-grow text-center font-semibold px-4 py-3 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-400 flex items-center justify-center";
  const activeClasses = "bg-teal-500 text-white shadow-lg";
  const inactiveClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600";

  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {children}
    </button>
  );
};

export default TabButton;
