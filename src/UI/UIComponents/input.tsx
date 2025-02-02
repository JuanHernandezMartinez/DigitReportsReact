import React from "react";

interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ type, value, onChange, className }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded-md p-2 ${className || ""}`}
    />
  );
};
