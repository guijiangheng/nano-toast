import "./globals.css";

export const metadata = {
  title: "Nano Toast",
  description: "An opinionated toast component for React.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
