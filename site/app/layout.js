import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

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
    <html lang="en-GB">
      <body>
        <div className="site">
          <Nav />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
