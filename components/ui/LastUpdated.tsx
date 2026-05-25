export default function LastUpdated({ date = "Mayıs 2026" }: { date?: string }) {
  return (
    <p
      style={{
        fontSize: 11,
        color: "var(--koz-muted, #6B6A8E)",
        letterSpacing: "0.08em",
        marginTop: 4,
        marginBottom: 0,
      }}
    >
      Son güncelleme: {date}
    </p>
  );
}