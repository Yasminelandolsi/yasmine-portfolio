import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yasmine Landolsi — Software Engineer",
  description: "Full-Stack Engineer specializing in React, Next.js, Java, and cloud-native solutions.",
  keywords: ["Yasmine Landolsi", "Software Engineer", "Full Stack", "React", "Next.js", "Tunisia"],
  authors: [{ name: "Yasmine Landolsi" }],
  openGraph: {
    title: "Yasmine Landolsi — Software Engineer",
    description: "Full-Stack Engineer specializing in React, Next.js, Java, and cloud-native solutions.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
