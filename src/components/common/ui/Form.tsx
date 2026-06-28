import clsx from "clsx";

export default function Form({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<"form">) {
  return (
    <form
      className={clsx("overflow-hidden text-[1.4rem]", className)}
      {...props}
    >
      {children}
    </form>
  );
}
