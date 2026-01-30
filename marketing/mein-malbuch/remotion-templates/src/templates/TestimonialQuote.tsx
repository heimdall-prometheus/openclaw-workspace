import { AbsoluteFill, Img, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface TestimonialQuoteProps {
  quote: string;
  author: string;
  avatarUrl?: string;
  rating: number;
  accentColor: string;
}

export const TestimonialQuote: React.FC<TestimonialQuoteProps> = ({
  quote,
  author,
  avatarUrl,
  rating,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgIn = spring({ frame, fps, config: { damping: 20 } });
  const quoteIn = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const authorIn = spring({ frame: frame - 45, fps, config: { damping: 12 } });
  const starsIn = spring({ frame: frame - 30, fps, config: { damping: 15 } });

  const stars = "⭐".repeat(rating);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Decorative Quote Marks */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 60,
          fontSize: 300,
          color: "rgba(255,255,255,0.1)",
          fontFamily: "Georgia, serif",
          lineHeight: 1,
          opacity: bgIn,
        }}
      >
        "
      </div>

      {/* Main Content Container */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "85%",
          textAlign: "center",
        }}
      >
        {/* Stars */}
        <div
          style={{
            fontSize: 48,
            marginBottom: 40,
            opacity: starsIn,
            transform: `scale(${starsIn})`,
          }}
        >
          {stars}
        </div>

        {/* Quote */}
        <blockquote
          style={{
            fontSize: 52,
            fontWeight: 600,
            color: "#fff",
            lineHeight: 1.4,
            margin: 0,
            marginBottom: 60,
            opacity: quoteIn,
            transform: `translateY(${(1 - quoteIn) * 40}px)`,
          }}
        >
          "{quote}"
        </blockquote>

        {/* Author */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            opacity: authorIn,
            transform: `translateY(${(1 - authorIn) * 30}px)`,
          }}
        >
          {avatarUrl && (
            <Img
              src={avatarUrl}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: "4px solid rgba(255,255,255,0.3)",
                objectFit: "cover",
              }}
            />
          )}
          <span
            style={{
              fontSize: 32,
              color: "rgba(255,255,255,0.9)",
              fontWeight: 500,
            }}
          >
            — {author}
          </span>
        </div>
      </div>

      {/* Bottom Logo/CTA */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: "100%",
          textAlign: "center",
          opacity: authorIn,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 40px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: 30,
            color: "#fff",
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          mein-malbuch.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
