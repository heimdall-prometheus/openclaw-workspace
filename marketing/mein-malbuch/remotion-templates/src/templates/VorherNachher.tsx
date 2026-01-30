import { AbsoluteFill, Img, interpolate, useCurrentFrame, spring, useVideoConfig, staticFile } from "remotion";

interface VorherNachherProps {
  vorherImage: string;
  nachherImage: string;
  headline: string;
  subline: string;
  accentColor: string;
}

export const VorherNachher: React.FC<VorherNachherProps> = ({
  vorherImage,
  nachherImage,
  headline,
  subline,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation phases
  const vorherIn = spring({ frame, fps, config: { damping: 15 } });
  const nachherIn = spring({ frame: frame - 45, fps, config: { damping: 15 } });
  const textIn = spring({ frame: frame - 90, fps, config: { damping: 12 } });

  // Slider animation (reveals nachher)
  const sliderPosition = interpolate(
    frame,
    [60, 120],
    [100, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${accentColor}22 0%, #ffffff 50%, ${accentColor}22 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          textAlign: "center",
          opacity: textIn,
          transform: `translateY(${(1 - textIn) * 30}px)`,
        }}
      >
        <h1 style={{ fontSize: 64, fontWeight: 800, color: "#1a1a1a", margin: 0 }}>
          {headline}
        </h1>
      </div>

      {/* Image Container */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          borderRadius: 40,
          overflow: "hidden",
          boxShadow: "0 25px 80px rgba(0,0,0,0.15)",
        }}
      >
        {/* Vorher (bottom layer) */}
        {vorherImage && (
          <Img
            src={vorherImage.startsWith('http') ? vorherImage : staticFile(vorherImage)}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${vorherIn})`,
            }}
          />
        )}

        {/* Nachher (top layer with clip) */}
        {nachherImage && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              clipPath: `inset(0 ${sliderPosition}% 0 0)`,
            }}
          >
            <Img
              src={nachherImage.startsWith('http') ? nachherImage : staticFile(nachherImage)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${nachherIn})`,
              }}
            />
          </div>
        )}

        {/* Slider Line */}
        <div
          style={{
            position: "absolute",
            left: `${100 - sliderPosition}%`,
            top: 0,
            bottom: 0,
            width: 6,
            background: "#fff",
            boxShadow: "0 0 20px rgba(0,0,0,0.3)",
            transform: "translateX(-50%)",
          }}
        >
          {/* Slider Handle */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            ↔️
          </div>
        </div>

        {/* Labels */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 30,
            padding: "12px 24px",
            background: "rgba(0,0,0,0.7)",
            borderRadius: 20,
            color: "#fff",
            fontSize: 28,
            fontWeight: 600,
            opacity: vorherIn,
          }}
        >
          VORHER
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            padding: "12px 24px",
            background: accentColor,
            borderRadius: 20,
            color: "#fff",
            fontSize: 28,
            fontWeight: 600,
            opacity: nachherIn,
          }}
        >
          NACHHER
        </div>
      </div>

      {/* Footer / CTA */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: "100%",
          textAlign: "center",
          opacity: textIn,
          transform: `translateY(${(1 - textIn) * 30}px)`,
        }}
      >
        <p style={{ fontSize: 36, color: accentColor, fontWeight: 700, margin: 0 }}>
          {subline}
        </p>
      </div>
    </AbsoluteFill>
  );
};
