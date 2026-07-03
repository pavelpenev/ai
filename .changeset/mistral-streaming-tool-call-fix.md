---
'@ai-sdk/mistral': patch
---

Fix streaming tool calls being corrupted when Mistral splits a tool call's arguments across multiple SSE chunks. `doStream()` now correlates `tool_calls` delta fragments by their `index` field and accumulates `arguments` across chunks instead of treating every delta fragment as a complete, standalone tool call (which produced duplicated/garbled `tool-call` events, especially with parallel tool calls).
