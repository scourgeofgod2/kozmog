export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl pb-6 pt-10" aria-label="Sayıların hesaplanıyor" role="status">
      <div className="koz-skeleton mb-8 h-12 w-2/3 rounded-full" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="koz-skeleton col-span-2 row-span-2 min-h-[300px] rounded-[var(--radius-card)]" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="koz-skeleton min-h-[132px] rounded-[var(--radius-tile)]" />
        ))}
      </div>
    </div>
  );
}
