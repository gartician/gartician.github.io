import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: "page_view",
      parameters: { page_location: string },
    ) => void;
  }
}

export function GoogleAnalyticsPageViews() {
  const location = useLocation();
  const lastPageLocation = useRef<string | null>(null);

  useEffect(() => {
    const pageLocation = window.location.href;
    if (pageLocation !== lastPageLocation.current) {
      lastPageLocation.current = pageLocation;
      window.gtag?.("event", "page_view", { page_location: pageLocation });
    }
  }, [location]);

  return null;
}
