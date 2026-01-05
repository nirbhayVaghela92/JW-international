import React, { HTMLInputTypeAttribute } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: HTMLInputTypeAttribute | "phoneNumber";
  name?: string;
}

function InputField({
  label,
  required,
  icon,
  error,
  className,
  onChange,
  type,
  name,
  ...inputProps
}: InputFieldProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "phoneNumber") {
      const char = e.key;

      // Allow control keys (backspace, delete, tab, escape, enter, etc.)
      if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "Tab" ||
        e.key === "Escape" ||
        e.key === "Enter" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.ctrlKey ||
        e.metaKey
        // (e.key === "a" && e.ctrlKey) || // Allow Ctrl+A
        // (e.key === "c" && e.ctrlKey) || // Allow Ctrl+C
        // (e.key === "v" && e.ctrlKey) || // Allow Ctrl+V
        // (e.key === "x" && e.ctrlKey) // Allow Ctrl+X
      ) {
        return;
      }

      // Allow only numeric characters (0-9)
      const numericPattern = /^[0-9]$/;
      if (!numericPattern.test(char)) {
        e.preventDefault();
      }
    }
  };

  // Handle paste events for phone number fields
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (type === "phoneNumber") {
      const pastedText = e.clipboardData.getData("text").trim();

      // Allow: +, digits, space, -, (, )
      const phonePastePattern = /^[+\d\s()-]+$/;

      if (!phonePastePattern.test(pastedText)) {
        e.preventDefault();
      }
    }
  };

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
          type={type}
          name={name}
          className={`
            w-full border border-[#E5E5E5]
            px-12 py-4
            text-sm
            focus:outline-none focus:border-[#094745]
            ${error ? "border-red-500" : ""}
            ${className ?? ""}
          `}
          onKeyDown={handleKeyPress}
          onPaste={handlePaste}
          onChange={(e) => {
            if (type === "phoneNumber") {
              const allowedChars = /^[\d\s()+-]*$/; // only allow common phone number chars
              if (!allowedChars.test(e.target.value)) return;
            } else if (type === "number") {
              const val = e.target.value;
              if (val === "" || parseFloat(val) <= 0) {
                e.preventDefault();
              }
            }
            onChange?.(e);
          }}
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default InputField;
