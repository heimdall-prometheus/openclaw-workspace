import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface Feature {
  icon: string;
  title: string;
}

interface FeatureShowcaseProps {
  features: Feature[];
  headline: string;
  accentColor: string;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  features,
  headline,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineIn = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #ffffff 0%, ${accentColor}15 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: 180,
          width: "100%",
          textAlign: "center",
          opacity: headlineIn,
          transform: `translateY(${(1 - headlineIn) * 30}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#1a1a1a",
            margin: 0,
          }}
        >
          {headline}
        </h1>
      </div>

      {/* Features */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -40%)",
          display: "flex",
          flexDirection: "column",
          gap: 50,
          width: "80%",
        }}
      >
        {features.map((feature, index) => {
          const delay = 30 + index * 25;
          const featureIn = spring({ frame: frame - delay, fps, config: { damping: 12 } });
          
          // Number indicator animation
          const numberPop = spring({ 
            frame: frame - delay - 5, 
            fps, 
            config: { damping: 8, stiffness: 200 } 
          });

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                opacity: featureIn,
                transform: `translateX(${(1 - featureIn) * 100}px)`,
              }}
            >
              {/* Step Number */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#fff",
                  flexShrink: 0,
                  transform: `scale(${numberPop})`,
                  boxShadow: `0 10px 30px ${accentColor}40`,
                }}
              >
                {index + 1}
              </div>

              {/* Feature Card */}
              <div
                style={{
                  flex: 1,
                  background: "#fff",
                  borderRadius: 24,
                  padding: "30px 40px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                }}
              >
                {/* Icon */}
                <span style={{ fontSize: 56 }}>{feature.icon}</span>
                
                {/* Title */}
                <span
                  style={{
                    fontSize: 40,
                    fontWeight: 600,
                    color: "#1a1a1a",
                  }}
                >
                  {feature.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connecting Lines */}
      {features.length > 1 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 140,
            transform: "translateY(-40%)",
            height: (features.length - 1) * 130,
          }}
        >
          {features.slice(0, -1).map((_, index) => {
            const lineProgress = interpolate(
              frame,
              [60 + index * 25, 85 + index * 25],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: 80 + index * 130,
                  left: 37,
                  width: 6,
                  height: 50,
                  background: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}40 100%)`,
                  borderRadius: 3,
                  transform: `scaleY(${lineProgress})`,
                  transformOrigin: "top",
                }}
              />
            );
          })}
        </div>
      )}

      {/* CTA */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          width: "100%",
          textAlign: "center",
        }}
      >
        {(() => {
          const ctaIn = spring({ frame: frame - 120, fps, config: { damping: 12 } });
          return (
            <div
              style={{
                display: "inline-block",
                padding: "24px 60px",
                background: accentColor,
                borderRadius: 40,
                color: "#fff",
                fontSize: 36,
                fontWeight: 700,
                opacity: ctaIn,
                transform: `scale(${ctaIn})`,
                boxShadow: `0 15px 40px ${accentColor}50`,
              }}
            >
              Jetzt erstellen →
            </div>
          );
        })()}
      </div>
    </AbsoluteFill>
  );
};
