/*
 * ═══════════════════════════════════════════════════════════════
 * NEON FORGE — OpenCode Installer Data
 * Design: Cyberpunk Minimalist / Neon Brutalism
 * All curated options for the one-click OpenCode installation
 * ═══════════════════════════════════════════════════════════════
 */

export type Category = "plugins" | "mcp" | "agents" | "skills" | "rules";

export interface InstallerItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  recommended: boolean;
  essential: boolean;
  npm?: string;
  url?: string;
  tags: string[];
}

export interface ProviderOption {
  id: string;
  name: string;
  envVar: string;
  description: string;
  models: string[];
  popular: boolean;
}

// ─── PROVIDERS ───────────────────────────────────────────────
export const providers: ProviderOption[] = [
  {
    id: "anthropic",
    name: "Anthropic (Claude)",
    envVar: "ANTHROPIC_API_KEY",
    description: "Claude Sonnet 4, Haiku 4 — Best overall coding performance",
    models: ["anthropic/claude-sonnet-4-20250514", "anthropic/claude-haiku-4-20250514"],
    popular: true,
  },
  {
    id: "openai",
    name: "OpenAI",
    envVar: "OPENAI_API_KEY",
    description: "GPT-4.1, o3, o4-mini — Strong reasoning and coding",
    models: ["openai/gpt-4.1", "openai/o3", "openai/o4-mini"],
    popular: true,
  },
  {
    id: "google",
    name: "Google (Gemini)",
    envVar: "GOOGLE_API_KEY",
    description: "Gemini 2.5 Pro/Flash — Large context, fast responses",
    models: ["google/gemini-2.5-pro", "google/gemini-2.5-flash"],
    popular: true,
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    envVar: "DEEPSEEK_API_KEY",
    description: "DeepSeek V3/R1 — Cost-effective, strong coding",
    models: ["deepseek/deepseek-chat", "deepseek/deepseek-reasoner"],
    popular: true,
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    envVar: "OPENROUTER_API_KEY",
    description: "Access 200+ models through a single API key",
    models: ["openrouter/auto"],
    popular: true,
  },
  {
    id: "groq",
    name: "Groq",
    envVar: "GROQ_API_KEY",
    description: "Ultra-fast inference for Llama, Mixtral models",
    models: ["groq/llama-4-scout-17b-16e-instruct", "groq/meta-llama/llama-4-maverick-17b-128e-instruct"],
    popular: false,
  },
  {
    id: "xai",
    name: "xAI (Grok)",
    envVar: "XAI_API_KEY",
    description: "Grok 3 — Strong reasoning and code generation",
    models: ["xai/grok-3", "xai/grok-3-mini"],
    popular: false,
  },
  {
    id: "ollama",
    name: "Ollama (Local)",
    envVar: "",
    description: "Run models locally — No API key needed",
    models: ["ollama/qwen2.5-coder:32b", "ollama/deepseek-coder-v2:latest"],
    popular: false,
  },
];

// ─── PLUGINS ─────────────────────────────────────────────────
export const plugins: InstallerItem[] = [
  {
    id: "opencode-shell-strategy",
    name: "Shell Strategy",
    description: "Prevents shell hangs from TTY-dependent operations. Essential for stable sessions.",
    category: "plugins",
    recommended: true,
    essential: true,
    npm: "opencode-shell-strategy",
    tags: ["stability", "shell"],
  },
  {
    id: "opencode-dynamic-context-pruning",
    name: "Dynamic Context Pruning",
    description: "Optimizes token usage by pruning obsolete tool outputs. Saves money and context.",
    category: "plugins",
    recommended: true,
    essential: true,
    npm: "opencode-dynamic-context-pruning",
    tags: ["optimization", "tokens"],
  },
  {
    id: "opencode-vibeguard",
    name: "VibeGuard",
    description: "Redacts secrets and PII before sending to LLMs. Restores locally after response.",
    category: "plugins",
    recommended: true,
    essential: true,
    npm: "opencode-vibeguard",
    tags: ["security", "privacy"],
  },
  {
    id: "opencode-notificator",
    name: "Notificator",
    description: "Desktop notifications and sound alerts when sessions complete or need attention.",
    category: "plugins",
    recommended: true,
    essential: false,
    npm: "opencode-notificator",
    tags: ["productivity", "notifications"],
  },
  {
    id: "opencode-wakatime",
    name: "WakaTime",
    description: "Track your OpenCode usage time and productivity metrics with WakaTime.",
    category: "plugins",
    recommended: false,
    essential: false,
    npm: "opencode-wakatime",
    tags: ["tracking", "productivity"],
  },
  {
    id: "opencode-supermemory",
    name: "SuperMemory",
    description: "Persistent memory across sessions using Supermemory. Agents remember past context.",
    category: "plugins",
    recommended: true,
    essential: false,
    npm: "opencode-supermemory",
    tags: ["memory", "persistence"],
  },
  {
    id: "opencode-morph-plugin",
    name: "Morph Plugin",
    description: "Fast Apply editing, WarpGrep codebase search, and context compaction via Morph.",
    category: "plugins",
    recommended: true,
    essential: false,
    npm: "opencode-morph-plugin",
    tags: ["editing", "search"],
  },
  {
    id: "opencode-websearch-cited",
    name: "WebSearch Cited",
    description: "Native web search with Google grounded-style citations for supported providers.",
    category: "plugins",
    recommended: true,
    essential: false,
    npm: "opencode-websearch-cited",
    tags: ["search", "web"],
  },
  {
    id: "opencode-helicone-session",
    name: "Helicone Session",
    description: "Inject Helicone session headers for request grouping and cost tracking.",
    category: "plugins",
    recommended: false,
    essential: false,
    npm: "opencode-helicone-session",
    tags: ["tracking", "observability"],
  },
  {
    id: "opencode-pty",
    name: "PTY Plugin",
    description: "Run background processes in a PTY, send interactive input to them from agents.",
    category: "plugins",
    recommended: false,
    essential: false,
    npm: "opencode-pty",
    tags: ["terminal", "interactive"],
  },
  {
    id: "opencode-md-table-formatter",
    name: "MD Table Formatter",
    description: "Automatically clean up markdown tables produced by LLMs for better readability.",
    category: "plugins",
    recommended: false,
    essential: false,
    npm: "opencode-md-table-formatter",
    tags: ["formatting", "markdown"],
  },
  {
    id: "opencode-openai-codex-auth",
    name: "OpenAI Codex Auth",
    description: "Use your ChatGPT Plus/Pro subscription instead of API credits.",
    category: "plugins",
    recommended: false,
    essential: false,
    npm: "opencode-openai-codex-auth",
    tags: ["auth", "openai"],
  },
  {
    id: "opencode-gemini-auth",
    name: "Gemini Auth",
    description: "Use your existing Gemini plan instead of API billing.",
    category: "plugins",
    recommended: false,
    essential: false,
    npm: "opencode-gemini-auth",
    tags: ["auth", "google"],
  },
];

// ─── MCP SERVERS ─────────────────────────────────────────────
export const mcpServers: InstallerItem[] = [
  {
    id: "context7",
    name: "Context7",
    description: "Fetches current library docs instead of relying on training data. Essential for accuracy.",
    category: "mcp",
    recommended: true,
    essential: true,
    npm: "@upstash/context7-mcp",
    tags: ["documentation", "context"],
  },
  {
    id: "sequential-thinking",
    name: "Sequential Thinking",
    description: "Structured step-by-step reasoning for complex problem solving.",
    category: "mcp",
    recommended: true,
    essential: true,
    npm: "@modelcontextprotocol/server-sequential-thinking",
    tags: ["reasoning", "planning"],
  },
  {
    id: "filesystem",
    name: "Filesystem",
    description: "Secure file system access limited to allowed directories.",
    category: "mcp",
    recommended: false,
    essential: false,
    npm: "@modelcontextprotocol/server-filesystem",
    tags: ["files", "system"],
  },
  {
    id: "github-mcp",
    name: "GitHub",
    description: "Deep GitHub integration — search code, manage PRs, issues, and repos.",
    category: "mcp",
    recommended: true,
    essential: false,
    npm: "@modelcontextprotocol/server-github",
    tags: ["github", "git"],
  },
  {
    id: "fetch",
    name: "Fetch",
    description: "Web fetching with markdown conversion. Read any URL content.",
    category: "mcp",
    recommended: true,
    essential: false,
    npm: "@modelcontextprotocol/server-fetch",
    tags: ["web", "fetch"],
  },
  {
    id: "brave-search",
    name: "Brave Search",
    description: "Web search via Brave Search API. Privacy-focused search for agents.",
    category: "mcp",
    recommended: false,
    essential: false,
    npm: "@modelcontextprotocol/server-brave-search",
    tags: ["search", "web"],
  },
  {
    id: "playwright",
    name: "Playwright",
    description: "Browser automation and E2E testing. Interact with web pages programmatically.",
    category: "mcp",
    recommended: false,
    essential: false,
    npm: "@playwright/mcp",
    tags: ["browser", "testing"],
  },
  {
    id: "memory",
    name: "Memory",
    description: "Persistent key-value memory for agents across sessions.",
    category: "mcp",
    recommended: true,
    essential: false,
    npm: "@modelcontextprotocol/server-memory",
    tags: ["memory", "persistence"],
  },
];

// ─── AGENTS ──────────────────────────────────────────────────
export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  category: Category;
  recommended: boolean;
  essential: boolean;
  mode: "primary" | "subagent";
  prompt: string;
  tools: Record<string, boolean>;
  tags: string[];
}

export const agents: AgentConfig[] = [
  {
    id: "code-reviewer",
    name: "Code Reviewer",
    description: "Reviews code for security, performance, maintainability, and best practices.",
    category: "agents",
    recommended: true,
    essential: false,
    mode: "subagent",
    prompt: `You are an expert code reviewer. Analyze code for:
- Security vulnerabilities and injection risks
- Performance bottlenecks and optimization opportunities
- Code maintainability and readability
- Best practices and design patterns
- Edge cases and error handling
Provide constructive, actionable feedback without making direct changes.`,
    tools: { write: false, edit: false, bash: false },
    tags: ["review", "quality"],
  },
  {
    id: "architect",
    name: "Architect",
    description: "Designs system architecture, data models, and technical decisions.",
    category: "agents",
    recommended: true,
    essential: false,
    mode: "subagent",
    prompt: `You are a senior software architect. Your role is to:
- Design scalable system architectures
- Define data models and database schemas
- Make technology stack decisions with clear reasoning
- Create API contracts and interface definitions
- Document architectural decisions (ADRs)
Focus on clarity, scalability, and maintainability. Do not write implementation code.`,
    tools: { write: true, edit: false, bash: false },
    tags: ["architecture", "design"],
  },
  {
    id: "debugger",
    name: "Debugger",
    description: "Systematic debugging with root cause analysis and fix suggestions.",
    category: "agents",
    recommended: true,
    essential: false,
    mode: "subagent",
    prompt: `You are a debugging specialist. Follow this methodology:
1. Reproduce the issue — understand exact symptoms
2. Isolate the problem — narrow down to specific code/config
3. Root cause analysis — identify WHY it fails, not just WHERE
4. Propose fix — suggest minimal, targeted changes
5. Verify — explain how to confirm the fix works
Use logs, stack traces, and systematic elimination. Always explain your reasoning.`,
    tools: { write: false, edit: false, bash: true },
    tags: ["debugging", "analysis"],
  },
  {
    id: "docs-writer",
    name: "Documentation Writer",
    description: "Creates comprehensive, well-structured documentation for code and APIs.",
    category: "agents",
    recommended: true,
    essential: false,
    mode: "subagent",
    prompt: `You are a technical documentation specialist. Create:
- Clear README files with setup instructions
- API documentation with examples
- Code comments that explain WHY, not WHAT
- Architecture decision records
- User guides and tutorials
Write for the target audience. Use examples liberally. Keep it concise but complete.`,
    tools: { write: true, edit: true, bash: false },
    tags: ["documentation", "writing"],
  },
  {
    id: "security-auditor",
    name: "Security Auditor",
    description: "Audits code for security vulnerabilities, secrets exposure, and attack vectors.",
    category: "agents",
    recommended: true,
    essential: false,
    mode: "subagent",
    prompt: `You are a security auditor. Scan for:
- Hardcoded secrets, API keys, and credentials
- SQL injection, XSS, CSRF vulnerabilities
- Insecure dependencies and known CVEs
- Authentication and authorization flaws
- Data exposure and privacy issues
- Insecure configurations
Rate findings by severity (Critical/High/Medium/Low). Provide remediation steps.`,
    tools: { write: false, edit: false, bash: true },
    tags: ["security", "audit"],
  },
  {
    id: "test-writer",
    name: "Test Writer",
    description: "Writes comprehensive tests — unit, integration, and E2E with best practices.",
    category: "agents",
    recommended: false,
    essential: false,
    mode: "subagent",
    prompt: `You are a testing specialist. Write tests that:
- Cover happy paths, edge cases, and error scenarios
- Follow AAA pattern (Arrange, Act, Assert)
- Use descriptive test names that document behavior
- Mock external dependencies appropriately
- Achieve meaningful coverage, not just line coverage
Prefer the project's existing test framework. Write tests that serve as documentation.`,
    tools: { write: true, edit: true, bash: true },
    tags: ["testing", "quality"],
  },
];

// ─── RULES (AGENTS.md content) ───────────────────────────────
export interface RuleConfig {
  id: string;
  name: string;
  description: string;
  category: Category;
  recommended: boolean;
  essential: boolean;
  content: string;
  tags: string[];
}

export const rules: RuleConfig[] = [
  {
    id: "code-quality",
    name: "Code Quality Standards",
    description: "Enforce consistent code quality, naming conventions, and error handling.",
    category: "rules",
    recommended: true,
    essential: true,
    content: `## Code Quality Standards
- Use TypeScript strict mode. Avoid \`any\` type.
- Prefer const over let. Never use var.
- Use descriptive variable and function names.
- Handle all errors explicitly — no silent catches.
- Keep functions small and focused (< 30 lines).
- Use early returns to reduce nesting.
- Add JSDoc comments for public APIs.`,
    tags: ["quality", "standards"],
  },
  {
    id: "git-workflow",
    name: "Git Workflow",
    description: "Conventional commits, meaningful messages, and clean git history.",
    category: "rules",
    recommended: true,
    essential: true,
    content: `## Git Workflow
- Use Conventional Commits: feat:, fix:, docs:, refactor:, test:, chore:
- Write commit messages that explain WHY, not just WHAT.
- Keep commits atomic — one logical change per commit.
- Never commit secrets, .env files, or node_modules.
- Always run tests before committing.`,
    tags: ["git", "workflow"],
  },
  {
    id: "security-rules",
    name: "Security First",
    description: "Security-first development practices and secret management.",
    category: "rules",
    recommended: true,
    essential: true,
    content: `## Security First
- Never hardcode secrets, API keys, or passwords.
- Use environment variables for all sensitive configuration.
- Validate and sanitize all user inputs.
- Use parameterized queries — never string concatenation for SQL.
- Keep dependencies updated. Check for known vulnerabilities.
- Implement proper authentication and authorization.
- Use HTTPS everywhere. Set security headers.`,
    tags: ["security", "best-practices"],
  },
  {
    id: "project-structure",
    name: "Project Structure",
    description: "Consistent file organization and module boundaries.",
    category: "rules",
    recommended: true,
    essential: false,
    content: `## Project Structure
- Keep related files close together (colocation).
- Use index files for clean public APIs.
- Separate concerns: UI, business logic, data access.
- Shared utilities go in lib/ or utils/.
- Types and interfaces in dedicated type files.
- Configuration in config/ directory.
- Tests adjacent to source files or in __tests__/.`,
    tags: ["structure", "organization"],
  },
  {
    id: "documentation-rules",
    name: "Documentation Standards",
    description: "Keep documentation current, useful, and close to the code.",
    category: "rules",
    recommended: true,
    essential: false,
    content: `## Documentation Standards
- Every project needs a README with: purpose, setup, usage, and architecture.
- Document architectural decisions in ADR format.
- Code comments explain WHY, not WHAT.
- Keep API docs with examples and error responses.
- Update docs when changing behavior.
- Use diagrams for complex flows.`,
    tags: ["documentation", "standards"],
  },
  {
    id: "testing-rules",
    name: "Testing Standards",
    description: "Comprehensive testing strategy with meaningful coverage.",
    category: "rules",
    recommended: false,
    essential: false,
    content: `## Testing Standards
- Write tests for all new features and bug fixes.
- Follow AAA pattern: Arrange, Act, Assert.
- Test behavior, not implementation details.
- Use descriptive test names that document intent.
- Mock external dependencies, not internal modules.
- Aim for meaningful coverage, not 100% line coverage.
- Include edge cases and error scenarios.`,
    tags: ["testing", "quality"],
  },
];

// ─── CATEGORY METADATA ───────────────────────────────────────
export const categories = [
  {
    id: "plugins" as Category,
    name: "Plugins",
    icon: "Puzzle",
    description: "Extend OpenCode with hooks, events, and custom behavior",
    count: plugins.length,
  },
  {
    id: "mcp" as Category,
    name: "MCP Servers",
    icon: "Server",
    description: "Connect to external tools and services via Model Context Protocol",
    count: mcpServers.length,
  },
  {
    id: "agents" as Category,
    name: "Agents",
    icon: "Bot",
    description: "Specialized AI assistants for specific tasks and workflows",
    count: agents.length,
  },
  {
    id: "rules" as Category,
    name: "Rules",
    icon: "ScrollText",
    description: "Custom instructions in AGENTS.md for consistent behavior",
    count: rules.length,
  },
];

// ─── ALL ITEMS HELPER ────────────────────────────────────────
export function getAllItems(): (InstallerItem | AgentConfig | RuleConfig)[] {
  return [...plugins, ...mcpServers, ...agents, ...rules];
}

export function getEssentialIds(): string[] {
  return getAllItems()
    .filter((item) => item.essential)
    .map((item) => item.id);
}

export function getRecommendedIds(): string[] {
  return getAllItems()
    .filter((item) => item.recommended)
    .map((item) => item.id);
}
