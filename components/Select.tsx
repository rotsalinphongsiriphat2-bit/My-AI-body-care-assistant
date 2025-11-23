
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, children, ...props }) => {
  return (
    <div>
      <label className="block text-slate-400 text-sm font-bold mb-2" htmlFor={props.id}>
        {label}
      </label>
      <div className="relative">
        <select
          className="shadow appearance-none border-2 border-slate-700 rounded-lg w-full py-3 px-4 bg-slate-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-teal-500 transition-colors"
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
