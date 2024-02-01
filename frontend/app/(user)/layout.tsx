"use client";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";


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
