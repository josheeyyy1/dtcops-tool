import "./globals.css";
import { Bricolage_Grotesque, Hanken_Grotesk, Spline_Sans_Mono } from "next/font/google";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Joshua Adams",
    default: "Joshua Adams: Ops automation for multi-region supplement brands",
  },
  description:
    "One accurate view of stock in every warehouse, reorder points that fire before you run out, and the spreadsheet work automated away. For DTC supplement brands on Shopify selling across UK, EU and US.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <div className="site">
          <Nav />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
