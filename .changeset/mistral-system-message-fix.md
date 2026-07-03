---
'@ai-sdk/mistral': patch
---

Fix Mistral provider rejecting system messages by passing them via the `instructions` parameter instead of in the `messages` array, as required by Mistral's API.
