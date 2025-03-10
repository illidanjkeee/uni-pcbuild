import { Inter } from "next/font/google";
import "./globals.css";
import { dark } from "@clerk/themes";
import Nav from "@/components/nav";
import { Footer } from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import NextTopLoaderProvider from "@/providers/next-top-loader-provider";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    template: "%s - custom PC builder",
    default: "custom PC builder",
  },
  description:
    "Design, customize, and build PC: Your journey to crafting the perfect machine starts here.Unlock the potential of your imagination with BuildPC, the gateway to personalized computing excellence",
  keywords: ["PC builder", "Computers", "building PC", "Custom PC"],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://custom-computers.vercel.ap",
    title: "custom PC builder",
    description:
      "Design, customize, and build PC: Your journey to crafting the perfect machine starts here.Unlock the potential of your imagination with BuildPC, the gateway to personalized computing excellence",
    siteName: "custom PC builder",
  },

  twitter: {
    card: "summary_large_image",
    title: "custom PC builder",
    description:
      "Design, customize, and build PC: Your journey to crafting the perfect machine starts here.Unlock the potential of your imagination with BuildPC, the gateway to personalized computing excellence",
    creator: "@bAaron",
  },
  icons: {
    icon: "/favicon.ico",
    // shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-icon.png",
  },
  // manifest: `${siteConfig.url}/site.webmanifest`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} outline-none bg-slate-950 text-white flex justify-center w-full relative overflow-x-hidden`}
      >
        <div className="w-full">
          <NextTopLoaderProvider>
            <ClerkProvider
              appearance={{
                baseTheme: dark,
                variables: { colorPrimary: "#7Ed348" },
              }}
            >
              {children}
              <Toaster></Toaster>
            </ClerkProvider>
          </NextTopLoaderProvider>
        </div>
      </body>
    </html>
  );
}
