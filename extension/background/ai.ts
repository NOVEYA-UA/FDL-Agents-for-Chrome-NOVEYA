// background/ai.ts — TypeScript reference version
const FDL_SCHEMA = {
  type: "object",
  properties: {
    thesis: { type: "string" },
    antithesis: { type: "string" },
    synthesis: { type: "string" },
    contradictions: { type: "array", items: { type: "string" } },
    summary: { type: "string" },
    lang: { type: "string" }
  },
  required: ["thesis", "antithesis", "synthesis", "summary"],
  additionalProperties: false
};

let lmSession: any = null;

async function ensurePromptSession(): Promise<any> {
  // Availability may differ by Chrome version; this is a skeleton
  const avail = await (self as any).LanguageModel?.availability?.() ?? "unknown";
  if (avail === "unavailable") throw new Error("Prompt API unavailable.");
  if (!lmSession) {
    lmSession = await (self as any).LanguageModel.create({
      monitor(m: any){
        m.addEventListener("downloadprogress", (e: any) => {
          console.log(`Gemini Nano download: ${e.loaded*100}%`);
        });
      }
    });
  }
  return lmSession;
}

async function runFDL(text: string, langHint?: string){
  const session = await ensurePromptSession();
  const prompt = `You are an analyst using Formal‑Dialectical Logic. Return JSON only with fields thesis, antithesis, synthesis, contradictions[], summary, lang. Base only on INPUT.\nINPUT:\n${text}`;
  const result = await session.prompt(prompt, { responseConstraint: FDL_SCHEMA });
  return JSON.parse(result);
}

async function summarize(text: string){
  if (!('Summarizer' in self)) return null;
  const availability = await (self as any).Summarizer.availability();
  if (availability === 'unavailable') return null;
  const summarizer = await (self as any).Summarizer.create({ type: 'key-points', length: 'medium', format: 'markdown' });
  return await summarizer.summarize(text);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    if (msg.type === 'FDL_ANALYZE') {
      const fdl = await runFDL(msg.text, msg.lang);
      const tldr = await summarize(msg.text);
      sendResponse({ fdl, tldr });
    }
  })().catch(err => sendResponse({ error: String(err) }));
  return true; // async reply
});
