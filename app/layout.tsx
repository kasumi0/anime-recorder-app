import type { Metadata } from "next";
import { Montserrat, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header/Header";
import { ParticleBG } from "./components/particle/ParticleBG";
import { NextAuthProvider } from "./lib/next-auth/provider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku-gothic-new",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Anime Recorder",
  description: "鑑賞したアニメを記録していくアプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${montserrat.variable} ${zenKakuGothicNew.variable}`}>
        <NextAuthProvider>
          <Header />
          <main>
            <ParticleBG />
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
