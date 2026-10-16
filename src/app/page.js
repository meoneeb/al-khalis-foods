export const metadata = {
  title: "Temporarily Unavailable",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-stone-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.10),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(24,24,27,0.05),_transparent_45%)]"
      />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <img
          src="/images/alkhalis/logo.webp"
          alt="Al-Khalis Prime Foods"
          className="mb-8 h-20 w-auto object-contain"
        />

        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-brand uppercase">
          Service paused
        </p>

        <h1 className="max-w-xl text-3xl tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
          This website is temporarily unavailable
        </h1>

        <span aria-hidden className="mt-5 h-1 w-16 rounded-full bg-brand" />

        <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-600 sm:text-lg">
          Al-Khalis Prime Foods is offline because an outstanding invoice has
          not been paid. The site will be restored as soon as that payment is
          received.
        </p>

        <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-500 sm:text-base">
          If you are the account owner, please settle the balance to bring the
          website back online.
        </p>
      </main>
    </div>
  );
}
