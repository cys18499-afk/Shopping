import { cva } from "class-variance-authority";

// export const buttonVariants = cva(
//   "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none",
//   {
//     variants: {
//       variant: {
//         primary: "bg-blue-600 text-white hover:bg-blue-700",
//         secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
//         outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
//         ghost: "hover:bg-gray-100 text-gray-700",
//         danger: "bg-red-500 text-white hover:bg-red-600",
//       },
//       state: {
//         default: "",
//         hover: "brightness-90",
//         active: "scale-[0.98]",
//         loading: "opacity-70 cursor-wait",
//         disabled: "opacity-50 cursor-not-allowed",
//       },
//       fullWidth: {
//         true: "w-full",
//         false: "w-auto",
//       },
//     },
//     defaultVariants: {
//       variant: "primary",
//       state: "default",
//       fullWidth: false,
//     },
//   },
// );

export const stepVariants = cva("border", {
  variants: {
    type: {
      dot: "w-3 h-3 border-2 rounded-full",
      line: "flex-1 border-t-2", // 선 두께 조절
    },
    status: {
      current: "", // 현재 위치 (색상 채움)
      completed: "", // 지나온 단계 (테두리만 검정)
      inactive: "", // 아직 안 온 단계 (회색)
    },
  },
  compoundVariants: [
    // 점(Dot) 스타일
    { type: "dot", status: "current", className: "bg-white border-black" },
    { type: "dot", status: "completed", className: "bg-black border-black" },
    { type: "dot", status: "inactive", className: "bg-white border-gray-200" },

    // 선(Line) 스타일
    { type: "line", status: "current", className: "border-black" },
    { type: "line", status: "completed", className: "border-black" },
    { type: "line", status: "inactive", className: "border-gray-200" },
  ],
});
