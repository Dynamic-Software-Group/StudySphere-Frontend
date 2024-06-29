import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
export const metadata = {
  title: "StudySphere",
  description: "StudySphere is a platform for students to learn and grow.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
