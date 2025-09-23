{
  "manifest_version": 3,
  "name": "Σ‑FDL Agents for Chrome",
  "version": "0.1.0",
  "description": "On‑device dialectical analysis (Thesis→Antithesis→Synthesis) using Chrome built‑in AI.",
  "action": {
    "default_popup": "popup/popup.html"
  },
  "background": {
    "service_worker": "background/ai.js",
    "type": "module"
  },
  "icons": {
    "16": "assets/icons/16.png",
    "48": "assets/icons/48.png",
    "128": "assets/icons/128.png"
  },
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "host_permissions": [
    "<all_urls>"
  ],
  "content_scripts": [
    {
      "matches": [
        "<all_urls>"
      ],
      "js": [
        "content/overlay.js"
      ],
      "css": [
        "content/styles.css"
      ],
      "run_at": "document_idle"
    }
  ],
  "web_accessible_resources": [
    {
      "resources": [
        "content/styles.css",
        "assets/icons/*"
      ],
      "matches": [
        "<all_urls>"
      ]
    }
  ]
}
