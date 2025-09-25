import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.dataset.theme || "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}
type RouteType = string[] | null | undefined;
export function useRoute() {
  const [route, setRoute] = useState<string | null | undefined>(
    document.body.dataset.route
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setRoute(document.body.dataset.route);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-route"],
    });

    return () => observer.disconnect();
  }, []);

  const route_array : RouteType = route?.split("/")

  

  return route_array
}
