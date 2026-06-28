import "./globals.css";

import Header from "../components/header/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import { getWishIds } from "../lib/data/wish";
import { getCartItem } from "../lib/data/cart";
import { getAuthUser } from "../lib/data/user";
import WishInitializer from "../components/providers/WishInitializer";
import AuthInitializer from "../components/providers/AuthInitializer";
import CartInitializer from "../components/providers/CartInitializer";
import Providers from "./providers";

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
        <Providers>
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
        </Providers>
      </body>
    </html>
  );
}
