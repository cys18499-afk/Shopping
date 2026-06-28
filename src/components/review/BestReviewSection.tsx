// import { Review } from "@/src/types/review";
// import Image from "next/image";
// import SectionHeader from "../SectionHeader";

// const reviews: Review[] = [
//   {
//     id: 1,
//     productName: "오픈 엣지스트레이 볼캡 뉴욕양기스",
//     productImage: "/images/products/cap-1.jpg",
//     // userImage: "/images/reviews/review-1.jpg",
//     reviewCount: 7,
//     rating: 5.0,
//     content: "요즘 잘 쓰고 다니는 모자인데 퀄리티가 너무 좋아요.",
//     reviewer: "장미우",
//     date: "2026-03-31",
//   },
//   // ...
// ];

// export default function BestReviewSection() {
//   return (
//     <section className="py-12">
//       <div className="flex items-end justify-between mb-7">
//         <SectionHeader title="Best Item" subtitle="사용자리뷰" />
//         <div className="flex items-center gap-3">
//           <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
//             ‹
//           </button>
//           <span className="text-sm text-gray-500">1 / 3</span>
//           <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
//             ›
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-5 gap-4">
//         {reviews.map((review) => (
//           <div key={review.id} className="cursor-pointer group">
//             <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-gray-100 mb-2.5">
//               {/* <Image
//                 // src={review.userImage}
//                 alt={review.reviewer}
//                 fill
//                 className="object-cover group-hover:opacity-90 transition-opacity"
//               /> */}
//             </div>
//             <div className="flex items-center gap-1.5 mb-1.5">
//               <div className="relative w-7 h-7 rounded border border-gray-100 overflow-hidden flex-shrink-0">
//                 <Image
//                   src={review.productImage}
//                   alt={review.productName}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <span className="text-xs text-gray-500 truncate">
//                 {review.productName}
//               </span>
//             </div>
//             <div className="flex items-center gap-1 mb-1">
//               <span className="text-xs text-gray-400">
//                 리뷰 {review.reviewCount}
//               </span>
//               <span className="text-xs text-amber-400">★</span>
//               <span className="text-xs text-gray-500">
//                 {review.rating.toFixed(1)}
//               </span>
//             </div>
//             <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-1">
//               {review.content}
//             </p>
//             <div className="flex justify-between">
//               <span className="text-xs text-gray-400">{review.reviewer}</span>
//               <span className="text-xs text-gray-400">{review.date}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
