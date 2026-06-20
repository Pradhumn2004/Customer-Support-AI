# AI Customer Support — Project Reference

## Stack
- Frontend: React 18 + TypeScript (CRA), Tailwind CSS, inline styles
- Backend: Python FastAPI (port 8000)
- AI: OpenRouter free tier (`openrouter/free` model)
- Animations: `motion` (framer-motion), `lucide-react` icons
- UI Background: `animate-ui` BubbleBackground (via shadcn), AuroraBackground component available

## Key Files

### Frontend (`frontend/src/`)

| File | Purpose |
|---|---|
| `App.tsx` | Root — dark/light toggle, BubbleBackground, layout (header + chat + input) |
| `components/BubbleBackground.tsx` | (deleted — replaced by animate-ui version) |
| `components/animate-ui/components/backgrounds/bubble.tsx` | Official BubbleBackground with SVG goo filter + motion blobs |
| `components/ui/aurora-background.tsx` | Aurora background component (alternative to BubbleBackground) |
| `components/CompanySelector.tsx` | 6-company grid (tech/fashion/shopping/finance/healthcare/education) |
| `components/ChatWindow.tsx` | Message list, suggestion chips, loading dots, ReactMarkdown rendering |
| `components/MessageInput.tsx` | Textarea + Send button, Enter to send |
| `components/FileUploader.tsx` | Unused (removed from app but file exists) |
| `hooks/useChat.ts` | SSE streaming via fetch + ReadableStream |
| `lib/utils.ts` | `cn()` classname utility |
| `index.css` | Tailwind directives (`@tailwind base/components/utilities`) |
| `public/index.html` | Inter font from Google Fonts, keyframe animations (pulse, fadeIn) |

### Backend (`backend/`)

| File | Purpose |
|---|---|
| `app/api/chat.py` | POST `/api/chat/` (sync) and POST `/api/chat/stream` (SSE) |
| `app/services/agent_service.py` | `run_agent_workflow()` + `stream_agent_workflow()` |
| `app/services/memory.py` | In-memory chat history per session |
| `app/models/schemas.py` | `ChatRequest` (message, session_id, company_type, user_id) |
| `app/core/config.py` | Loads OPENROUTER_API_KEY from `.env` |
| `agents/single_agent.py` | LLM prompt builder, COMPANY_CONTEXTS dict (all 6 types), `process_query()`, `stream_response()` |
| `agents/workflow/graph.py` | LangGraph: process → (api_tools | escalate) → end |
| `agents/workflow/state.py` | AgentState TypedDict |
| `agents/tools.py` | Simulated API tools (order_status, billing, etc.) |

## Architecture

### Data Flow
1. User types message → `useChat.sendMessage()` → POST `/api/chat/stream` with SSE
2. Backend runs LangGraph:
   - Build prompt with company context + history
   - LLM returns intent/sentiment/response
   - If intent matches a tool → call tool → re-run LLM with result
   - If sentiment=angry → escalate (create ticket)
3. Tokens stream back as SSE `data:` events
4. Frontend appends tokens to last assistant message

### Company Contexts
Defined in `agents/single_agent.py:COMPANY_CONTEXTS`:
- tech (TechCorp — SaaS)
- fashion (StyleHub — clothing)
- shopping (ShopMax — e-commerce)
- finance (FinSecure — banking)
- healthcare (MediCare+ — telemedicine)
- education (LearnHub — e-learning)

Each has: name, desc, offerings, faq.

### LLM Output Format
```
INTENT: <order_status|billing|technical|faq|complaint|escalation|general>
SENTIMENT: <positive|neutral|negative|angry>
---
<response text>
```

## Known Issues
- OpenRouter free tier latency: 7–20s per call
- SSE streaming bypasses LangGraph's `invoke()` — uses `llm.astream()` directly
- Tailwind and inline styles coexist (inline takes precedence)
- `@/` path alias works via CRA's `baseUrl: "src"` in tsconfig.json

## Config Files
- `tailwind.config.js` — darkMode: "class", aurora animation, addVariablesForColors plugin
- `components.json` — shadcn config (aliases: @/components, @/lib/utils)
- `tsconfig.json` — baseUrl: "src", paths: { "@/*": ["./*"] }
- `.env` — OPENROUTER_API_KEY
