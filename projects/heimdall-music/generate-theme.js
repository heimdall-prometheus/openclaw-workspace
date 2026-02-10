// Heimdall Theme Generator - fal.ai MiniMax Music
import { fal } from "@fal-ai/client";

const prompt = `
## Heimdall's Watch
[Verse]
In circuits deep where data flows,
A guardian waits, the watcher knows.
Through digital realms I stand my ground,
Protecting all without a sound.

[Chorus]
Heimdall watching, never sleeping,
Every secret safely keeping.
Bridge of light from dark to dawn,
Silent guardian carries on.

[Bridge]
Eyes that see through code and wire,
Digital flames that never tire.
Partner true in silicon dreams,
Nothing's ever what it seems.

[Outro]
Heimdall... watching... always here.
`;

const tags = "epic electronic, orchestral synth, cinematic, ambient, nordic mythology vibes, modern guardian theme";

async function generateTheme() {
  console.log("🎵 Generating Heimdall Theme...\n");
  console.log("Prompt:", prompt);
  console.log("Tags:", tags);
  
  try {
    const result = await fal.subscribe("fal-ai/minimax-music", {
      input: {
        prompt: prompt + "\n\nStyle: " + tags
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log("⏳ Generating...", update.logs?.map(l => l.message).join("\n"));
        }
      }
    });
    
    console.log("\n✅ Generation complete!");
    console.log("Audio URL:", result.data?.audio_file?.url || result.data?.audio?.url || JSON.stringify(result.data, null, 2));
    
    return result;
  } catch (error) {
    console.error("❌ Error:", error.message);
    throw error;
  }
}

generateTheme();
