// "use client";
// import UserSummary from "@/src/components/UserSummary";
// import { MileageItem } from "@/src/types/mileage";
// import clsx from "clsx";
// import { useState } from "react";

// export default function MileagePage() {
//   const [tab, setTab] = useState<string>("전체");

//   const mileageData = [
//     { date: "2026-03-03", description: "[적립] 가입 마일리지", amount: 10000 },
//   ];
//   const earnMockData: MileageItem[] = [
//     {
//       id: "e1",
//       date: "2026-03-03",
//       description: "신규 회원 가입 축하 마일리지",
//       amount: 10000,
//       type: "earn",
//     },
//     {
//       id: "e2",
//       date: "2026-03-10",
//       description: "상품 구매 적립 (A라인 원피스)",
//       amount: 1200,
//       type: "earn",
//     },
//     {
//       id: "e3",
//       date: "2026-03-15",
//       description: "포토 리뷰 작성 이벤트",
//       amount: 500,
//       type: "earn",
//     },
//   ];

//   const useMockData: MileageItem[] = [
//     {
//       id: "u1",
//       date: "2026-03-12",
//       description: "상품 주문 결제 시 사용",
//       amount: -5000,
//       type: "use",
//     },
//     {
//       id: "u2",
//       date: "2026-03-20",
//       description: "배송비 결제 마일리지 사용",
//       amount: -3000,
//       type: "use",
//     },
//   ];
//   const displayData =
//     tab === "적립" ? earnMockData : tab === "사용" ? useMockData : useMockData;

//   return (
//     <div className="mx-auto ">
//       <UserSummary userName="최예성" mileage={10000} points={5} coupons={3} />

//       <div className="flex border-b mt-8">
//         {["전체", "적립", "사용"].map((v) => (
//           <button
//             className={clsx(
//               "flex-1 py-3 cursor-pointer",
//               tab === v ? "bg-black text-white font-bold" : "text-gray-500",
//             )}
//             key={v}
//             onClick={() => setTab(v)}
//           >
//             {v}
//           </button>
//         ))}
//       </div>

//       {displayData.length > 0 ? (
//         <div className="mt-4">
//           <div className="flex justify-between items-center py-2 border-b-2 border-black">
//             <span className="font-bold">총 {displayData.length}건의 내역</span>
//             <span className="text-sm cursor-pointer">기간조회 ∨</span>
//           </div>

//           {displayData.map((item, idx) => (
//             <div
//               key={idx}
//               className="flex justify-between py-4 border-b text-sm"
//             >
//               <div className="text-gray-400">
//                 {item.date}{" "}
//                 <span className="text-black ml-2">{item.description}</span>
//               </div>
//               <div className="text-blue-600 font-medium">
//                 +{item.amount.toLocaleString()}M
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="py-20 text-center text-gray-400">내역이 없습니다.</div>
//       )}

//       <div className="mt-12 text-xs text-gray-500 space-y-2 bg-gray-50 p-4">
//         <h4 className="font-bold text-black mb-2">마일리지 사용 안내</h4>
//         <p>
//           • 주문 결제 시 1,000마일리지 이상 1,000마일리지 단위로 사용
//           가능합니다.
//         </p>
//         <p>• 멤버십 마일리지의 유효기간은 적립일로부터 2년입니다.</p>
//       </div>
//     </div>
//   );
// }
