"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "@/components/commonComponents/SiteHeader";
import SiteFooter from "@/components/commonComponents/SiteFooter";

export default function SiteFrame({ children }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return children;
  }

  return (
    <div className="relative flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
