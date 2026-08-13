import type { Metadata } from "next";
import { ReaderSettingsProvider } from "@/lib/reader-settings";
import { AnnotationsProvider } from "@/lib/annotations";
import "./globals.css";

export const metadata: Metadata = {
  title: "עלייתה של קיושי",
  description: "קורא ספרים - עלייתה של קיושי",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ReaderSettingsProvider>
          <AnnotationsProvider>{children}</AnnotationsProvider>
        </ReaderSettingsProvider>
      </body>
    </html>
  );
}
