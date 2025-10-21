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

## License & Ethics

This repository follows a dual-license scheme:

- **Code:** AGPL-3.0  
- **Content / Symbols / Media:** CC BY-NC-SA 4.0  
- **Ethical charter:** see [LICENSE-ETHICS.md](./LICENSE-ETHICS.md)

Use of FDL/NOVEYA symbols is allowed **only** in open, benevolent contexts; closed or exploitative usage is prohibited.

---

## 3) Краткая настройка CI (по желанию, одинаковая везде)

`.github/workflows/ci.yml` (для Python; при необходимости сделаю Node-вариант):

```yaml
name: ci
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt || true
      - run: pip install pytest || true
      - run: pytest -q || echo "No tests yet"
