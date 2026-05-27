import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "@/components/commonComponents/SiteHeader";
import SiteFooter from "@/components/commonComponents/SiteFooter";
import MotionProvider from "@/components/commonComponents/MotionProvider";
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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${harper.variable} h-full antialiased`}
    >
      <body className="relative min-h-full font-sans text-brand-cream">
        <MotionProvider>
          <div className="relative flex min-h-full flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
