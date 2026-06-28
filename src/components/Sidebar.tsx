"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const menuGroups = [
    {
      title: "나의 쇼핑정보",
      items: [{ name: "주문/배송 조회", href: "/mypage/order/list" }],
    },
    {
      title: "나의 활동정보",
      items: [
        { name: "위시리스트", href: "/mypage/wishlist" },
        // { name: "최근 본 상품", href: "/mypage/recent-view" },
        { name: "상품 리뷰", href: "/mypage/reviews" },
        // { name: "1:1 문의 내역", href: "/mypage/inquiry" },
      ],
    },
    // {
    //   title: "나의 혜택정보",
    //   items: [
    //     // { name: "마일리지", href: "/mypage/mileage", active: true },
    //     { name: "쿠폰함", href: "/mypage/coupons" },
    //   ],
    // },
    {
      title: "나의 계정설정",
      items: [
        { name: "배송지 관리", href: "/mypage/address" },
        { name: "내정보 관리", href: "/mypage/user-info-management" },
        // { name: "간편로그인 계정관리", href: "/mypage/sns-login" },
        // { name: "회원 탈퇴", href: "/mypage/withdraw" },
      ],
    },
  ];

  return (
    <aside className="w-full flex-shrink-0">
      <nav className="flex flex-col gap-10">
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-[12px] font-bold text-gray-400 mb-3">
              {group.title}
            </h3>
            <ul className="flex flex-col">
              {group.items.map((item, itemIdx) => {
                const isActive = pathname === item.href;

                return (
                  <li key={itemIdx}>
                    <Link
                      href={item.href}
                      className={clsx(
                        "text-[14px] w-full block hover:bg-gray-100 py-1 tracking-[-1.5px]",
                        isActive
                          ? "font-bold text-black text-[14px]"
                          : "text-black",
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
