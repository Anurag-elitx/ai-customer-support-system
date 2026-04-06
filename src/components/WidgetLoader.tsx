"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export function WidgetLoader() {
  const pathname = usePathname();

  // Prevent recursion: don't load the widget script on any widget sub-pages
  if (pathname?.startsWith("/widget")) {
    return null;
  }

  // Replace with your real User ID or make it dynamic from useAuth
  const userId = "u84x4E35vRX5xGtuJW1sJIZDWWi2";

  return (
    <Script
      src="/widget.js"
      data-user-id={userId}
      strategy="afterInteractive"
    />
  );
}
