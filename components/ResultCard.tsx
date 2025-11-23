
import React from 'react';

interface ResultCardProps {
  title: string;
  children: React.ReactNode;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, children }) => {
  return (
    <div className="bg-slate-700/50 p-6 rounded-xl mt-6">
      <h3 className="text-xl font-bold text-teal-300 mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default ResultCard;
