import React from "react";

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  error?: string;
}

function InputField({
  label,
  required,
  icon,
  error,
  className,
  ...inputProps
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1B1918]">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
          {icon}
        </span>

        <input
          {...inputProps}
          className={`
            w-full border border-[#E5E5E5]
            px-12 py-4
            text-sm
            focus:outline-none focus:border-[#094745]
            ${error ? "border-red-500" : ""}
            ${className ?? ""}
          `}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

export default InputField;
