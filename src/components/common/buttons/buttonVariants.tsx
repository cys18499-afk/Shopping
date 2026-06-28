// import { cva, type VariantProps } from "class-variance-authority";

// const buttonVariants = cva(
//   "inline-flex items-center justify-center rounded-md font-medium transition-colors",
//   {
//     variants: {
//       variant: {
//         primary: "bg-blue-600 text-white hover:bg-blue-700",
//         secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
//         outline: "border border-input bg-background hover:bg-accent",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         danger: "bg-red-500 text-white hover:bg-red-600",
//       },
//       size: {
//         default: "h-10 px-4 py-2",
//         sm: "h-9 rounded-md px-3",
//         lg: "h-11 rounded-md px-8",
//       },
//     },
//     defaultVariants: {
//       variant: "primary",
//       size: "default",
//     },
//   },
// );

// export interface ButtonProps
//   extends
//     React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   isLoading?: boolean;
//   showIcon?: boolean;
// }

// const Button = ({
//   className,
//   variant,
//   size,
//   isLoading,
//   ...props
// }: ButtonProps) => {
//   return (
//     <button
//       className={buttonVariants({ variant, size, className })}
//       disabled={isLoading || props.disabled}
//       {...props} // onClick, type 등을 자동으로 받음
//     />
//   );
// };
