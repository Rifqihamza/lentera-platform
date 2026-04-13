import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/components/providers/session-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- SEO & METADATA OPTIMIZATION ---
export const metadata: Metadata = {
  title: {
    default: "Lentera - Navigasi Belajar Terstruktur",
    template: "%s | Lentera"
  },
  description: "Platform kurasi roadmap belajar untuk meningkatkan inklusivitas pendidikan dan skill masa depan.",
  keywords: ["roadmap belajar", "kurasi materi", "pendidikan inklusif", "learning path", "IOFest 2026"],
  authors: [{ name: "Muhammad Rifqi Hamza" }],
  openGraph: {
    title: "Lentera - Navigasi Belajar Terstruktur",
    description: "Temukan jalan belajarmu dengan materi terbaik yang sudah dikurasi.",
    url: "https://lentera-platform.vercel.app", // Ganti sesuai domain nanti
    siteName: "Lentera",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lentera",
    description: "Navigasi belajar terstruktur untuk semua.",
  },
  icons: {
    icon: "/favicon.ico", // Pastikan file ini ada di folder /public
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id" // Ubah ke "id" jika target utamanya Indonesia
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable
      )}
      suppressHydrationWarning // Menghindari mismatch error pada dark mode/extension browser
    >
      <body className={cn(
        "min-h-full flex flex-col font-sans bg-background text-foreground",
        inter.className
      )}>
        {/* AuthProvider membungkus seluruh aplikasi agar session bisa diakses di mana saja */}
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}