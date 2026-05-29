"use client";
import clsx from "clsx";
import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  isPassword?: boolean;
  inputClassName?: string;
  onlyNumber?: boolean;
}

export default function Input({
  error,
  isPassword = false,
  onlyNumber = false,
  inputClassName,
  onChange,
  onBlur,
  name,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isTelType = props.type === "tel";

  const formatTel = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (isTelType) {
      value = formatTel(value);
    } else if (onlyNumber) {
      value = value.replace(/[^0-9]/g, "");
    }
    e.target.value = value;
    onChange?.(e);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={clsx(
          "flex items-center border focus-within:border-gray-500 placeholder:text-gray-400",
          error ? "border-red-500" : "border-gray-200",
        )}
      >
        <input
          className={clsx(
            "border-none focus:outline-none w-full bg-white px-4 py-3 text-[12px] text-gray-900",
            inputClassName,
          )}
          {...props}
          value={props.value}
          name={name}
          onChange={handleChange}
          onBlur={onBlur}
          maxLength={isTelType ? 13 : props.maxLength}
          type={isPassword ? (showPassword ? "text" : "password") : props.type}
        />

        {isPassword &&
          (showPassword ? (
            <button
              type="button"
              className="px-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye className="w-4 h-4 stroke-[0.5]" />
            </button>
          ) : (
            <button
              type="button"
              className="px-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeOff type="button" className="w-4 h-4 stroke-[0.5]" />
            </button>
          ))}
      </div>
    </div>
  );
}
