import React from "react";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLockClosed,
} from "react-icons/hi";

interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  show: boolean;
  toggle: () => void;
  error?: string;
}

function PasswordField({
  label,
  required,
  show,
  toggle,
  error,
  className,
  ...inputProps
}: PasswordFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1B1918]">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

        <input
          {...inputProps}
          type={show ? "text" : "password"}
          className={`
            w-full border border-[#E5E5E5]
            px-12 py-4 pr-12
            text-sm
            focus:outline-none focus:border-[#094745]
            ${error ? "border-red-500" : ""}
            ${className ?? ""}
          `}
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
        >
          {show ? <HiOutlineEyeOff /> : <HiOutlineEye />}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

export default PasswordField;
