import site from "@/data/site.json";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-brand-line/30 py-8 text-center text-sm text-brand-muted">
      <div className="mx-auto max-w-6xl space-y-2 px-4 sm:px-6 lg:px-8">
        <p className="font-medium text-brand-ink">
          © {new Date().getFullYear()} {site.brand.displayName}
        </p>
        <p className="text-xs sm:text-sm">{site.footer.legalLine}</p>
        <p className="text-xs opacity-90">{site.footer.note}</p>
        <p className="text-xs opacity-90">{site.brand.scopeNote}</p>
      </div>
    </footer>
  );
}
