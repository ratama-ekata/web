import React, { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FFFDF0] dark:bg-[#000000]">
      <Suspense fallback={<header className="h-16 w-full border-b border-zinc-200 bg-white" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1 bg-[#FFFDF0] dark:bg-[#000000]">{children}</main>
      <Footer />
    </div>
  );
}
