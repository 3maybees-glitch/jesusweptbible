export default function OfflinePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-[#f5f0e8] px-6 text-center text-[#3d3429]">
      <p className="font-[family-name:var(--font-lexend)] text-sm uppercase tracking-[0.18em] text-[#8b7355]">
        Jesus Wept
      </p>
      <h1 className="mt-4 max-w-md font-serif text-3xl leading-snug text-[#2a241c]">
        You&apos;re offline
      </h1>
      <p className="mt-3 max-w-sm text-base leading-relaxed text-[#5c5348]">
        Chapters you&apos;ve already opened stay available. Reconnect to browse
        new books or use Reflect.
      </p>
    </main>
  )
}
