// background/ai.js — MV3 service worker (skeleton)
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

let lmSession = null;

async function ensurePromptSession(){
  const avail = await (self.LanguageModel && self.LanguageModel.availability ? self.LanguageModel.availability() : "unknown");
  if (avail === "unavailable") throw new Error("Prompt API unavailable.");
  if (!lmSession) {
    lmSession = await self.LanguageModel.create({
      monitor(m){
        m.addEventListener("downloadprogress", (e) => {
          console.log(`Gemini Nano download: ${e.loaded*100}%`);
        });
      }
    });
  }
  return lmSession;
}

async function runFDL(text, langHint){
  const session = await ensurePromptSession();
  const prompt = "You are an analyst using Formal‑Dialectical Logic. Return JSON only with fields thesis, antithesis, synthesis, contradictions[], summary, lang. Base only on INPUT.\nINPUT:\n" + text;
  const result = await session.prompt(prompt, { responseConstraint: FDL_SCHEMA });
  return JSON.parse(result);
}

async function summarize(text){
  if (!('Summarizer' in self)) return null;
  const availability = await self.Summarizer.availability();
  if (availability === 'unavailable') return null;
  const summarizer = await self.Summarizer.create({ type: 'key-points', length: 'medium', format: 'markdown' });
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
  return true;
});
