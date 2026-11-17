# Playwright MCP Guide & Browser Automation Architecture

> **Course:** Course 4 — The Modern AI Software Developer (ADLC01) | FPT University  
> **Slot:** Slot 3 — Agent Automations, Subagents, MCP & Rapid AI UI Development  
> **Slide Reference:** `SLOT 3` Slides 13–17 ("MCP Connects AI Applications to Tools", "Playwright MCP Live Demo", "A Tool Connection Is a Permission Decision")

---

## 1. What is Model Context Protocol (MCP)?

Model Context Protocol (MCP) is an open protocol created by Anthropic that standardizes how AI applications and coding agents connect to external tools, databases, and environments over JSON-RPC.

```text
┌─────────────────────────────────┐
│     AI Coding Agent (Host)      │
│  (Claude Code / Antigravity)   │
└───────────────┬─────────────────┘
                │ JSON-RPC (stdio / SSE)
                ▼
┌─────────────────────────────────┐
│      Playwright MCP Server      │
│  (@modelcontextprotocol/server) │
└───────────────┬─────────────────┘
                │ Browser DevTools Protocol
                ▼
┌─────────────────────────────────┐
│        Chromium Browser         │
│  (Interacts with Task Manager)  │
└─────────────────────────────────┘
```

### The Permission Boundary Concept (Slide 14 & 17)
Without tools, an LLM only sees static text files. Connecting an MCP tool:
1. **Expands agent capabilities:** The agent can navigate web pages, click elements, fill inputs, take screenshots, and inspect DOM trees.
2. **Requires conscious permission:** Granting browser access gives the agent the authority to interact with web apps on the local network (`http://localhost:5173`). Instructors must emphasize that every tool connection is a security and safety decision.

---

## 2. Host Configuration & Compatibility

The repository includes a standard [.mcp.json](file:///D:/FPT/project/Course4_ModernAISoftwareDeveloper_Materials1/SRC-GUIDE/.mcp.json) configuration:

### 2.1. Claude Code CLI Setup
```powershell
# Add Playwright MCP server to Claude Code:
claude mcp add playwright npx -y @modelcontextprotocol/server-playwright

# Or place .mcp.json in the repository root (auto-discovered):
# Verify active MCP servers:
claude mcp list
```

### 2.2. Claude Desktop Setup
In `%APPDATA%\Claude\claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"]
    }
  }
}
```

### 2.3. Host Differences & Environment Prerequisites
| Host Environment | MCP Discovery Mechanism | Prerequisites | Operational Behavior |
|---|---|---|---|
| **Claude Code CLI** | Project root `.mcp.json` or `claude mcp add` | Node.js >= 20, npx on PATH | Runs headless or headed Chromium; prompts user for tool execution approval. |
| **Claude Desktop** | Global `claude_desktop_config.json` | Node.js >= 20 | Launches server via stdio sub-process; visual tools integrated into chat. |
| **Cursor / Windsurf** | Global/Workspace settings JSON | Node.js >= 20 | Supports stdio MCP clients; exposes tools in Agent mode. |
| **Antigravity IDE** | Built-in MCP Server Registry / Browser Subagent | Built-in Chrome DevTools & Puppeteer | Native browser subagent with real-time DOM accessibility and inspection. |

---

## 3. Actually Executed vs Documented Setup (Audit Boundary)

To ensure academic rigor and avoid false claims:

- **Documented Setup:** `.mcp.json` provides the sanctioned configuration file for instructors and students running external MCP-compatible hosts (Claude Code, Claude Desktop, Cursor).
- **Actually Executed Browser Verification:** In this CI and verification environment, actual browser interactions are directly executed through Chromium using Playwright (`scripts/demo-browser-interaction.mjs` and `e2e/task-manager.spec.ts`). This guarantees that every DOM assertion, click event, and accessibility check is empirically validated against the running Task Manager app.

---

## 4. Live Browser Interaction Script

Instructors or agents can run the standalone browser interaction script to demonstrate browser automation end-to-end:

```powershell
# 1. Start application backend and frontend:
npm run dev

# 2. In a second terminal, execute the browser interaction script:
node scripts/demo-browser-interaction.mjs
```

### Observable Script Actions:
1. Launches Chromium browser in isolated mode.
2. Navigates to `http://localhost:5173`.
3. Asserts header `"Task Manager"` is present in the DOM.
4. Enters new task `"Verify MCP Browser Automation"` and clicks **Add Task**.
5. Toggles task completed checkbox and verifies reactive strikethrough styling and count changes.
6. Captures and logs the live DOM snapshot.
