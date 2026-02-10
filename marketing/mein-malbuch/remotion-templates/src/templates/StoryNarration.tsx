import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Audio,
  staticFile,
} from "remotion";

interface StorySlide {
  text: string;
  emoji?: string;
  duration: number; // in frames
}

interface StoryNarrationProps {
  title: string;
  slides: StorySlide[];
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  audioUrl?: string;
}

const Slide: React.FC<{
  text: string;
  emoji?: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}> = ({ text, emoji, backgroundColor, textColor, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const slideUp = interpolate(frame, [0, 15], [50, 0], {
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${backgroundColor} 0%, ${accentColor}33 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {emoji && (
        <div
          style={{
            fontSize: 120,
            marginBottom: 40,
            transform: `scale(${scale})`,
          }}
        >
          {emoji}
        </div>
      )}
      <div
        style={{
          opacity: fadeIn,
          transform: `translateY(${slideUp}px)`,
          fontSize: 48,
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: textColor,
          textAlign: "center",
          lineHeight: 1.4,
          fontWeight: 600,
          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          maxWidth: "90%",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const StoryNarration: React.FC<StoryNarrationProps> = ({
  title,
  slides,
  backgroundColor,
  textColor,
  accentColor,
  audioUrl,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title slide
  const titleOpacity = interpolate(frame, [0, 30, 60, 90], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 80,
    },
  });

  let currentFrame = 90; // After title

  return (
    <AbsoluteFill>
      {/* Audio track */}
      {audioUrl && <Audio src={audioUrl} />}

      {/* Title sequence */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill
          style={{
            background: `linear-gradient(180deg, ${backgroundColor} 0%, ${accentColor} 100%)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              opacity: titleOpacity,
              transform: `scale(${titleScale})`,
              fontSize: 64,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: textColor,
              textAlign: "center",
              fontWeight: 800,
              textShadow: "0 4px 30px rgba(0,0,0,0.4)",
              padding: 40,
            }}
          >
            {title}
          </div>
          <div
            style={{
              opacity: titleOpacity * 0.7,
              fontSize: 24,
              color: textColor,
              fontFamily: "system-ui, sans-serif",
              marginTop: 20,
            }}
          >
            🎤 Eine Geschichte von Heimdall
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Story slides */}
      {slides.map((slide, index) => {
        const startFrame = currentFrame;
        currentFrame += slide.duration;

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={slide.duration}
          >
            <Slide
              text={slide.text}
              emoji={slide.emoji}
              backgroundColor={backgroundColor}
              textColor={textColor}
              accentColor={accentColor}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
