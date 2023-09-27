import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "@sweetalert2/theme-dark/dark.scss";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import fb from "@/public/fb.png";
import ogImage from "@/public/opendraph.jpg";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sender Bot",
  description: "Sender Bot",
  icons: {
    icon: fb,
    shortcut: fb,
    apple: fb,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  generator: "Next.js",
  applicationName: "ONFT Bridge",
  referrer: "origin-when-cross-origin",
  keywords: ["Sender Bot", "Sender", "Bot"],
  authors: [
    { name: "SenderBot" },
    { name: "Josh", url: "https://x.com/LayerSync" },
  ],
  colorScheme: "dark",
  creator: "Dev Farhan",
  publisher: "LayerSync",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Sender Bot",
    description: "Sender Bot",
    publishedTime: "2023-09-10T00:00:00.000Z",
    authors: ["Dev Farhan"],
    images: [ogImage],
  },
  twitter: {
    card: "Sender Bot",
    title: "Sender Bot",
    description: "Sender Bot",
    images: [ogImage],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
