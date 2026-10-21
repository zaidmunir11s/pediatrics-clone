import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// The exact Poppins v24 (latin) files the reference site serves. Only 400–700 exist there,
// so its 800-weight text renders at 700 — matching that requires the same file set.
const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "./fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Pediatrics Board Review | PBR",
  description:
    "Thousands of pediatricians have passed their board exams with the proven Pediatrics Board Review® system.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
