"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import SideBar from "../components/sidebar/sidebar";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname: string = usePathname();

  return (
        <div>
          {children}
        </div>
  );
}
