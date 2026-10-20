import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { VercelToolbar } from "@vercel/toolbar/next";
import MotionProvider from "@/components/commonComponents/MotionProvider";
import { homepageDown } from "@/flags";
import SiteFrame from "./site-frame";
import site from "@/data/site.json";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const harper = localFont({
  src: [
    {
      path: "../fonts/harper/harper-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/harper/harper-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/harper/harper-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: site.seo.title,
  description: site.seo.description,
};

export default async function RootLayout({ children }) {
  const showDownPage = await homepageDown();
  const shouldInjectToolbar = process.env.NODE_ENV === "development";

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${harper.variable} h-full bg-white antialiased`}
    >
      <body className="relative min-h-full font-sans text-zinc-900">
        <MotionProvider>
          <SiteFrame showDownPage={showDownPage}>{children}</SiteFrame>
        </MotionProvider>
        {shouldInjectToolbar ? <VercelToolbar /> : null}
      </body>
    </html>
  );
}
