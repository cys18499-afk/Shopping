import "./globals.css";

import Header from "../components/header/Header";
import { getWishIds } from "../lib/data/wish";
import WishInitializer from "../components/providers/WishInitializer";
import ScrollToTop from "../components/common/ScrollToTop";
import CartInitializer from "../components/providers/CartInitializer";
import { getCartItem } from "../lib/data/cart";
import Footer from "../components/Footer";
import AuthInitializer from "../components/providers/AuthInitializer";
import { getAuthUser } from "../lib/data/user";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wishedIds = await getWishIds();
  const cartItems = await getCartItem();
  const user = await getAuthUser();

  return (
    <html lang="ko">
      <body className="text-black antialiased min-h-screen flex flex-col">
        <Header />
        <main className="inner flex-1">
          <ScrollToTop />
          <WishInitializer wishedIds={wishedIds} />
          <CartInitializer cartItems={cartItems} />
          <AuthInitializer initialUser={user} />
          {children}
        </main>
        <Footer />
        <div id="portal-root" />
      </body>
    </html>
  );
}
