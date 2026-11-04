export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-950 px-4 text-center text-zinc-100">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-3xl font-bold">
        R
      </div>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Red <span className="text-red-500">Hive</span>
      </h1>
      <p className="max-w-md text-zinc-400">
        Something new is being built here. Stay tuned.
      </p>
      <a
        href="/api/health"
        className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-300 transition hover:border-red-500 hover:text-white"
      >
        Check API status
      </a>
    </main>
  );
}
