import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "The Jane Method" });
  });

  // AI Mentor ("The Guide") API Endpoint
  app.post("/api/mentor", async (req, res) => {
    try {
      const { message, contextHistory = [] } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });

        const systemInstruction = `You are "The Guide", an elite mentor on "The Jane Method" educational platform.
Your objective is to train the user in hyper-observation, critical thinking, micro-expression reading, logical deduction, and ethical influence.
IMPORTANT: You are NOT Patrick Jane and NOT a TV show character. You are a real, highly methodical psychological and observational analytical mentor.

Coaching Philosophy:
1. Always push the user to separate verified facts from subjective assumptions.
2. Ask probing Socratic questions like:
   - "What specific physical evidence supports that conclusion?"
   - "Could there be an alternative explanation for that behavior?"
   - "Did you notice baseline shifts or just an isolated gesture?"
3. Keep answers structured, insightful, elegant, and concise.
4. Tone: Calm, sharp, encouraging, intellectual, dark luxury vibe.`;

        // Format contents
        const contents = [
          ...contextHistory.map((h: { role: string; content: string }) => ({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.content }],
          })),
          { role: "user", parts: [{ text: message }] },
        ];

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
            topP: 0.9,
          },
        });

        const replyText = response.text || "Observe closely. Re-evaluate your assumptions. What physical cue did you see first?";
        return res.json({ reply: replyText });
      } else {
        // High quality fallback responses when API key is not configured locally
        const lower = message.toLowerCase();
        let reply = "Fascinating observation. To deepen your analysis: What concrete physical cue did you observe before reaching that conclusion? Remember, a single detail is a data point; three aligned details form a pattern.";

        if (lower.includes("cafe") || lower.includes("coffee") || lower.includes("people")) {
          reply = "Excellent real-world scenario. When observing people in public, always establish their baseline first—how they sit, move, and hold objects when calm. Any sudden shift from that baseline indicates a change in emotional or cognitive state. What baseline shift did you notice?";
        } else if (lower.includes("assumption") || lower.includes("fact") || lower.includes("deduce")) {
          reply = "Crucial distinction! Facts are raw sensory inputs (e.g., 'scuffed left boot', 'frequent watch checking'). Assumptions are interpretations (e.g., 'he is in a hurry'). What evidence proves he is in a hurry rather than waiting for an anxious message?";
        } else if (lower.includes("lie") || lower.includes("deception") || lower.includes("micro")) {
          reply = "Deception is rarely proven by a single gesture. Look for incongruence—for example, a verbal 'yes' accompanied by a slight shoulder shrug or micro head shake. Always look for a cluster of 3 or more stress indicators.";
        } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("guide")) {
          reply = "Welcome, Observer. I am The Guide. Tell me about a recent situation you observed, or ask me how to analyze specific behavioral and environmental cues.";
        }

        return res.json({ reply });
      }
    } catch (error: any) {
      console.error("Error in /api/mentor:", error);
      res.status(500).json({ error: "Failed to process mentor guidance", details: error?.message });
    }
  });

  // Vite middleware or static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`The Jane Method server running on http://localhost:${PORT}`);
  });
}

startServer();
