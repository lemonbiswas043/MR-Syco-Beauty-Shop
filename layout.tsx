import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "MR Syco | Beauty & Skincare Store", description: "Beauty & skincare essentials" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
