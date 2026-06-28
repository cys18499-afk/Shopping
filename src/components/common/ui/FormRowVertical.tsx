import clsx from "clsx";
import React, { ReactElement } from "react";

interface FormRowVerticalProps {
  label?: string;
  error?: string;
  children: ReactElement;
  required?: boolean;
}

export default function FormRowVertical({
  label,
  error,
  children,
  required = false,
}: FormRowVerticalProps) {
  const childId = React.isValidElement(children)
    ? (children.props as { id?: string }).id
    : undefined;

  return (
    <div className={clsx("flex flex-col gap-[7px] py-[7px] w-full")}>
      {label && (
        <div className="flex items-center">
          <label htmlFor={childId} className="text-sm text-black">
            {label}
          </label>
          {required && (
            <span className="w-[4px] h-[4px] rounded-sm bg-red-500 ml-[2px] mb-2" />
          )}
        </div>
      )}
      {children}
      {error && <span className="text-[10px] text-red-500">{error}</span>}
    </div>
  );
}
