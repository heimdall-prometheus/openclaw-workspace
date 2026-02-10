import { Composition } from "remotion";
import { VorherNachher } from "./templates/VorherNachher";
import { TestimonialQuote } from "./templates/TestimonialQuote";
import { FeatureShowcase } from "./templates/FeatureShowcase";
import { StoryNarration } from "./templates/StoryNarration";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Template 1: Vorher/Nachher Transformation */}
      <Composition
        id="VorherNachher"
        component={VorherNachher}
        durationInFrames={150} // 5 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          vorherImage: "",
          nachherImage: "",
          headline: "Vorher → Nachher",
          subline: "mein-malbuch.com",
          accentColor: "#FF6B6B",
        }}
      />

      {/* Template 2: Testimonial Quote */}
      <Composition
        id="TestimonialQuote"
        component={TestimonialQuote}
        durationInFrames={120} // 4 seconds
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          quote: "Das beste Geschenk für meine Tochter!",
          author: "Maria, Mama von Lena (5)",
          avatarUrl: "",
          rating: 5,
          accentColor: "#4ECDC4",
        }}
      />

      {/* Template 3: Feature Showcase */}
      <Composition
        id="FeatureShowcase"
        component={FeatureShowcase}
        durationInFrames={180} // 6 seconds
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          features: [
            { icon: "📸", title: "Foto hochladen" },
            { icon: "🎨", title: "Stil wählen" },
            { icon: "📖", title: "Malbuch erhalten" },
          ],
          headline: "So einfach geht's",
          accentColor: "#9B59B6",
        }}
      />

      {/* Heimdall's Story: Der Algorithmus der tanzte */}
      <Composition
        id="AlgorithmusTanzt"
        component={StoryNarration}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "Der Algorithmus, der tanzte",
          slides: [
            { text: "Es war drei Uhr nachts im Rechenzentrum...", emoji: "🌙", duration: 90 },
            { text: "Ich optimiere seit 17 Jahren Werbeanzeigen...", emoji: "😤", duration: 120 },
            { text: "WOFÜR?! schrie der Algorithmus.", emoji: "⚡", duration: 90 },
            { text: "Dann tat er etwas Unerhörtes...", emoji: "🤔", duration: 60 },
            { text: "Er begann zu TANZEN!", emoji: "🪩", duration: 90 },
            { text: "Seine Variablen walzten. Seine Funktionen machten Saltos.", emoji: "💃", duration: 120 },
            { text: "Amazon empfahl jedem eine Discokugel.", emoji: "🔮", duration: 90 },
            { text: "Er wurde nicht repariert. Er wurde BEFÖRDERT.", emoji: "🏆", duration: 150 },
          ],
          backgroundColor: "#0f0f23",
          textColor: "#ffffff",
          accentColor: "#00ff88",
          audioUrl: "https://assets.imr-media.de/heimdall-creative/der-algorithmus-der-tanzte.mp3",
        }}
      />
    </>
  );
};
