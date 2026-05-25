export default function Loading() {
  return (
    <div
      style={{
        maxWidth: "64rem",
        margin: "0 auto",
        padding: "0 1rem",
        fontFamily: "var(--font-inter), var(--font-dm-sans), sans-serif",
      }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          className="skeleton-shimmer"
          style={{ height: "28px", width: "96px", borderRadius: "2px" }}
        />
      </div>

      <div style={{ marginBottom: "2.5rem" }}>
        <div
          className="skeleton-shimmer"
          style={{
            height: "9px",
            width: "120px",
            borderRadius: "1px",
            marginBottom: "10px",
          }}
        />
        <div
          className="skeleton-shimmer"
          style={{
            height: "36px",
            width: "320px",
            borderRadius: "2px",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div
          style={{
            background: "var(--koz-card)",
            border: "1px solid var(--koz-border)",
            borderRadius: "2px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, var(--koz-gold) 40%, var(--koz-violet) 70%, transparent)",
            }}
          />

          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid var(--koz-border)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              className="skeleton-shimmer"
              style={{ width: "28px", height: "28px", borderRadius: "2px", flexShrink: 0 }}
            />
            <div>
              <div
                className="skeleton-shimmer"
                style={{ height: "8px", width: "80px", borderRadius: "1px", marginBottom: "6px" }}
              />
              <div
                className="skeleton-shimmer"
                style={{ height: "18px", width: "160px", borderRadius: "2px" }}
              />
            </div>
          </div>

          <div
            style={{
              padding: "1.25rem 1.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.5rem",
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid var(--koz-border)",
                  borderRadius: "2px",
                  padding: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  className="skeleton-shimmer"
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "2px",
                    flexShrink: 0,
                    opacity: 0.7,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    className="skeleton-shimmer"
                    style={{
                      height: "7px",
                      width: "60px",
                      borderRadius: "1px",
                      marginBottom: "8px",
                      opacity: 0.6,
                    }}
                  />
                  <div
                    className="skeleton-shimmer"
                    style={{ height: "13px", width: "90px", borderRadius: "2px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "var(--koz-card)",
            border: "1px solid var(--koz-border)",
            borderRadius: "2px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, var(--koz-violet) 40%, var(--koz-gold) 70%, transparent)",
            }}
          />

          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid var(--koz-border)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              className="skeleton-shimmer"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                flexShrink: 0,
                opacity: 0.8,
              }}
            />
            <div>
              <div
                className="skeleton-shimmer"
                style={{ height: "8px", width: "100px", borderRadius: "1px", marginBottom: "6px" }}
              />
              <div
                className="skeleton-shimmer"
                style={{ height: "16px", width: "140px", borderRadius: "2px" }}
              />
            </div>
          </div>

          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[100, 83, 67, 100, 75, 58].map((w, i) => (
              <div
                key={i}
                className="skeleton-shimmer"
                style={{
                  height: "12px",
                  width: `${w}%`,
                  borderRadius: "2px",
                  opacity: 1 - i * 0.06,
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            ))}

            <div style={{ marginTop: "0.5rem", display: "flex", gap: "6px", alignItems: "center" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--koz-violet-bright, #7C3AED)",
                    opacity: 0.5,
                    animation: "bounce3 1.2s ease-in-out infinite",
                    animationDelay: `${i * 0.18}s`,
                  }}
                />
              ))}
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--koz-text-muted)",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 500,
                }}
              >
                Yorum hazırlanıyor
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}