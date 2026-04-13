import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider"; // Pastikan file ini sudah dibuat

// --- FONT OPTIMIZATION ---
const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-sans'
});

const geistHeading = Geist({
  subsets: ['latin'],
  variable: '--font-heading'
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- SEO & METADATA ---
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
    url: "https://lentera-platform.vercel.app",
    siteName: "Lentera",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lentera",
    description: "Navigasi belajar terstruktur untuk semua.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      // suppressHydrationWarning wajib ada untuk library tema
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        publicSans.variable,
        geistHeading.variable,
        geistMono.variable
      )}
    >
      <body className={cn(
        "min-h-screen bg-background text-foreground font-sans selection:bg-primary/20",
        publicSans.className
      )}>
        {/* Force dark mode via ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Provider>
            {/* Wrapper utama agar konten tidak terlalu mentok layar tapi background tetap full */}
            <main className="relative flex min-h-screen flex-col items-center">
              <div className="w-full max-w-7xl px-4 md:px-6">
                {children}
              </div>
            </main>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}