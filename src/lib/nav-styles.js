import clsx from "clsx";

export function isNavActive(pathname, href) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function desktopNavLinkClass(active, className) {
  return clsx("nav-link", active && "nav-link-active", className);
}

export function mobileNavLinkClass(active, className) {
  return clsx(
    "nav-link-mobile",
    active ? "nav-link-mobile-active" : "nav-link-mobile-inactive",
    className,
  );
}

export function mobileNavTriggerClass(active, className) {
  return clsx(
    "nav-link-mobile flex w-full items-center justify-between text-left",
    active ? "nav-link-mobile-active" : "nav-link-mobile-inactive",
    className,
  );
}
