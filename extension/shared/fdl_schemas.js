// shared/fdl_schemas.js
export const FDL_SCHEMA = {
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
