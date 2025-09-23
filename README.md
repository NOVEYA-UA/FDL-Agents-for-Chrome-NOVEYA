# FDL Agents for Chrome NOVEYA
FDL Overlay. One click overlays a side panel that extracts page text and renders: Thesis / Antithesis / Synthesis Key claims vs. contradictions (“RICO‑check”) Actionable summary (bullets; TL;DR) Authorship cues (bylines, dates) and inline quote capture

# Σ‑FDL Agents for Chrome

On‑device dialectical analysis for the open web using Chrome’s Built‑in AI.

## Demo
- 3‑min YouTube: <link>
- Live: load unpacked extension → open any article → click the FDL icon

## Requirements
- Chrome ≥ 138 on desktop; Gemini Nano will auto‑download on first use
- Sufficient disk/VRAM per Chrome docs

## How it works
- Summarizer API → TL;DR
- Prompt API → JSON‑constrained Thesis/Antithesis/Synthesis
- Translator/Proofreader/Writer/Rewriter → multilingual clarity

## Dev
1. Load unpacked: `chrome://extensions` → *Load unpacked* → `extension/`
2. Click the Σ‑FDL button on any article
3. First run: allow model download (on‑device).

## Privacy
- By default no network calls; all processing is on‑device.
- Optional hybrid escalation (Gemini API / Firebase) is off by default and clearly labeled.

## License
MIT
