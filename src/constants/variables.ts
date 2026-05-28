import kakaopayIcon from "@/src/icons/payment/payment_icon_yellow_small.png";
import selectossIcon from "@/src/icons/payment/TossPay_Logo_Primary_White.png";
import tossIcon from "@/src/icons/payment/TossPay_Logo_Primary.png";

export const paymentMethods = [
  // {
  //   value: "kakaopay",
  //   label: "카카오페이",
  //   width: 58,
  //   height: 24,
  //   icon: kakaopayIcon,
  //   selectedIcon: undefined,
  // },
  {
    value: "toss",
    label: "토스페이",
    width: 180,
    height: 30,
    icon: tossIcon,
    selectedIcon: selectossIcon,
  },
  // {
  //   value: "bank_transfer",
  //   label: "계좌이체",
  //   width: null,
  //   height: null,
  //   icon: null,
  //   selectedIcon: undefined,
  // },
] as const;

// kakao
// 색상
// 컨테이너	#FEE500
// 심볼	#000000, 90%
// 레이블	#191919

// Toss Blue
// #0064FF
// R0 G100 B255
// C100 M60 Y0 K0
// PANTONE 2175 C

// Toss Gray
// #202632
// R32  G38  B50
// C87  M80  Y70  K52
// PANTONE 433 C
// export const paymentMethodSelectedIcons: Partial<
//   Record<PaymentMethod, StaticImageData>
// > = {
//   toss: selectossIcon, // 이미지처럼 배경이 어두워질 때 사용할 흰색 로고
// };
