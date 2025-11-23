
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div>
      <label className="block text-slate-400 text-sm font-bold mb-2" htmlFor={props.id}>
        {label}
      </label>
      <input
        className="shadow appearance-none border-2 border-slate-700 rounded-lg w-full py-3 px-4 bg-slate-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-teal-500 transition-colors"
        {...props}
      />
    </div>
  );
};

export default Input;
