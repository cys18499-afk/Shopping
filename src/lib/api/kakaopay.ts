// const KAKAOPAY_HOST = "https://open-api.kakaopay.com/online/v1/payment";

// const getHeaders = () => ({
//   Authorization: `SECRET_KEY ${process.env.KAKAOPAY_SECRET_KEY}`,
//   "Content-Type": "application/json",
// });

// export const kakaopayApi = {
//   ready: async (params: {
//     orderId: string;
//     userId: string;
//     itemName: string;
//     quantity: number;
//     totalAmount: number;
//   }) => {
//     const res = await fetch(`${KAKAOPAY_HOST}/ready`, {
//       method: "POST",
//       headers: getHeaders(),
//       body: JSON.stringify({
//         cid: "TC0ONETIME",
//         partner_order_id: params.orderId,
//         partner_user_id: params.userId,
//         item_name: params.itemName,
//         quantity: params.quantity,
//         total_amount: params.totalAmount,
//         tax_free_amount: 0,
//         approval_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/approve?order_id=${params.orderId}`,
//         fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/fail`,
//         cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/cancel`,
//       }),
//     });
//     return res.json();
//   },

//   approve: async (params: {
//     tid: string;
//     orderId: string;
//     userId: string;
//     pgToken: string;
//   }) => {
//     const res = await fetch(`${KAKAOPAY_HOST}/approve`, {
//       method: "POST",
//       headers: getHeaders(),
//       body: JSON.stringify({
//         cid: "TC0ONETIME",
//         tid: params.tid,
//         partner_order_id: params.orderId,
//         partner_user_id: params.userId,
//         pg_token: params.pgToken,
//       }),
//     });
//     return res.ok;
//   },
// };
