/*
 * ═══════════════════════════════════════════════════════════════
 * NEON FORGE — Script Generator
 * Generates a complete bash installation script for OpenCode
 * ═══════════════════════════════════════════════════════════════
 */

import {
  plugins,
  mcpServers,
  agents,
  rules,
  providers,
  type AgentConfig,
  type RuleConfig,
} from "./installer-data";

export interface GeneratorOptions {
  selectedIds: Set<string>;
  selectedProvider: string;
  installMethod: "curl" | "npm" | "bun" | "go";
}

export function generateScript(options: GeneratorOptions): string {
  const { selectedIds, selectedProvider, installMethod } = options;

  const selectedPlugins = plugins.filter((p) => selectedIds.has(p.id));
  const selectedMcp = mcpServers.filter((m) => selectedIds.has(m.id));
  const selectedAgents = agents.filter((a) => selectedIds.has(a.id));
  const selectedRules = rules.filter((r) => selectedIds.has(r.id));
  const provider = providers.find((p) => p.id === selectedProvider);

  // Separate plugins by install type
  const npmPlugins = selectedPlugins.filter(
    (p) => !p.installType || p.installType === "npm"
  );
  const gitPlugins = selectedPlugins.filter(
    (p) => p.installType === "git"
  );
  const instructionPlugins = selectedPlugins.filter(
    (p) => p.installType === "instructions"
  );

  const lines: string[] = [];

  lines.push("#!/usr/bin/env bash");
  lines.push("#");
  lines.push("# ╔══════════════════════════════════════════════════════════╗");
  lines.push("# ║  OpenCode Forge — One-Click Installer                   ║");
  lines.push("# ║  Generated at: " + new Date().toISOString().slice(0, 19) + "                ║");
  lines.push("# ║  https://opencode.ai                                    ║");
  lines.push("# ╚══════════════════════════════════════════════════════════╝");
  lines.push("#");
  lines.push('set -euo pipefail');
  lines.push("");

  // ─── Colors ────────────────────────────────────────────
  lines.push("# Colors");
  lines.push('CYAN="\\033[0;36m"');
  lines.push('MAGENTA="\\033[0;35m"');
  lines.push('GREEN="\\033[0;32m"');
  lines.push('YELLOW="\\033[0;33m"');
  lines.push('RED="\\033[0;31m"');
  lines.push('BOLD="\\033[1m"');
  lines.push('NC="\\033[0m"');
  lines.push("");

  // ─── Helper functions ──────────────────────────────────
  lines.push("# Helper functions");
  lines.push('info() { echo -e "${CYAN}[INFO]${NC} $1"; }');
  lines.push('success() { echo -e "${GREEN}[OK]${NC} $1"; }');
  lines.push('warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }');
  lines.push('error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }');
  lines.push('step() { echo -e "\\n${MAGENTA}${BOLD}▸ $1${NC}"; }');
  lines.push("");

  // ─── Banner ────────────────────────────────────────────
  lines.push('echo -e "${CYAN}${BOLD}"');
  lines.push("cat << 'BANNER'");
  lines.push("");
  lines.push("   ╔═══════════════════════════════════════════╗");
  lines.push("   ║                                           ║");
  lines.push("   ║   ⚡ OpenCode Forge Installer ⚡          ║");
  lines.push("   ║                                           ║");
  lines.push("   ╚═══════════════════════════════════════════╝");
  lines.push("");
  lines.push("BANNER");
  lines.push('echo -e "${NC}"');
  lines.push("");

  // Count total steps dynamically
  const totalSteps = 6 + (gitPlugins.length > 0 ? 1 : 0) + (instructionPlugins.length > 0 ? 1 : 0);
  let currentStep = 0;

  // ─── Step 1: Install OpenCode ──────────────────────────
  currentStep++;
  lines.push(`step "Step ${currentStep}/${totalSteps}: Installing OpenCode"`);
  lines.push("");
  lines.push("# Check if opencode is already installed");
  lines.push("if command -v opencode &> /dev/null; then");
  lines.push('  success "OpenCode is already installed: $(opencode --version 2>/dev/null || echo unknown)"');
  lines.push("else");

  switch (installMethod) {
    case "curl":
      lines.push('  info "Installing OpenCode via curl..."');
      lines.push("  curl -fsSL https://opencode.ai/install | bash");
      break;
    case "npm":
      lines.push('  info "Installing OpenCode via npm..."');
      lines.push("  npm install -g opencode");
      break;
    case "bun":
      lines.push('  info "Installing OpenCode via bun..."');
      lines.push("  bun install -g opencode");
      break;
    case "go":
      lines.push('  info "Installing OpenCode via go..."');
      lines.push("  go install github.com/anomalyco/opencode@latest");
      break;
  }

  lines.push('  success "OpenCode installed successfully"');
  lines.push("fi");
  lines.push("");

  // ─── Step 2: Create directory structure ────────────────
  currentStep++;
  lines.push(`step "Step ${currentStep}/${totalSteps}: Setting up directory structure"`);
  lines.push("");
  lines.push('GLOBAL_CONFIG_DIR="$HOME/.config/opencode"');
  lines.push('mkdir -p "$GLOBAL_CONFIG_DIR/agents"');
  lines.push('mkdir -p "$GLOBAL_CONFIG_DIR/plugins"');
  lines.push('mkdir -p "$GLOBAL_CONFIG_DIR/skills"');
  lines.push('success "Directory structure created"');
  lines.push("");

  // ─── Step 3: Configure provider ────────────────────────
  currentStep++;
  lines.push(`step "Step ${currentStep}/${totalSteps}: Configuring AI provider"`);
  lines.push("");

  if (provider && provider.envVar) {
    lines.push(`info "Selected provider: ${provider.name}"`);
    lines.push(`if [ -z "\${${provider.envVar}:-}" ]; then`);
    lines.push(`  warn "${provider.envVar} is not set."`);
    lines.push(`  echo -e "\${YELLOW}Please set it before using OpenCode:\${NC}"`);
    lines.push(`  echo -e "  export ${provider.envVar}=your-api-key-here"`);
    lines.push(`  echo ""`);
    lines.push(`  echo "Or run: opencode and use /connect command"`);
    lines.push("else");
    lines.push(`  success "Provider ${provider.name} configured (${provider.envVar} is set)"`);
    lines.push("fi");
  } else if (provider?.id === "ollama") {
    lines.push('info "Selected provider: Ollama (Local)"');
    lines.push("if command -v ollama &> /dev/null; then");
    lines.push('  success "Ollama is installed"');
    lines.push("else");
    lines.push('  warn "Ollama is not installed. Install it from: https://ollama.ai"');
    lines.push("fi");
  }
  lines.push("");

  // ─── Step: Install git-based plugins ───────────────────
  if (gitPlugins.length > 0) {
    currentStep++;
    lines.push(`step "Step ${currentStep}/${totalSteps}: Installing git-based plugins"`);
    lines.push("");

    for (const plugin of gitPlugins) {
      const dirName = plugin.id;
      lines.push(`info "Cloning ${plugin.name}..."`);
      lines.push(`if [ -d "$GLOBAL_CONFIG_DIR/plugins/${dirName}" ]; then`);
      lines.push(`  info "${plugin.name} already cloned, pulling latest..."`);
      lines.push(`  cd "$GLOBAL_CONFIG_DIR/plugins/${dirName}" && git pull --quiet && cd -`);
      lines.push("else");
      lines.push(`  git clone --quiet ${plugin.gitRepo} "$GLOBAL_CONFIG_DIR/plugins/${dirName}"`);
      lines.push("fi");
      lines.push(`success "${plugin.name} installed"`);
      lines.push("");
    }
  }

  // ─── Step: Install instruction-based plugins ───────────
  if (instructionPlugins.length > 0) {
    currentStep++;
    lines.push(`step "Step ${currentStep}/${totalSteps}: Installing instruction-based plugins"`);
    lines.push("");

    for (const plugin of instructionPlugins) {
      const dirName = plugin.id;
      lines.push(`info "Cloning ${plugin.name} instructions..."`);
      lines.push(`if [ -d "$GLOBAL_CONFIG_DIR/plugins/${dirName}" ]; then`);
      lines.push(`  info "${plugin.name} already cloned, pulling latest..."`);
      lines.push(`  cd "$GLOBAL_CONFIG_DIR/plugins/${dirName}" && git pull --quiet && cd -`);
      lines.push("else");
      lines.push(`  git clone --quiet ${plugin.gitRepo} "$GLOBAL_CONFIG_DIR/plugins/${dirName}"`);
      lines.push("fi");
      lines.push(`success "${plugin.name} installed (will be added as instruction in config)"`);
      lines.push("");
    }
  }

  // ─── Step: Generate opencode.json ──────────────────────
  currentStep++;
  lines.push(`step "Step ${currentStep}/${totalSteps}: Generating global configuration"`);
  lines.push("");

  const config: Record<string, unknown> = {
    $schema: "https://opencode.ai/config.json",
  };

  // Provider model
  if (provider && provider.models.length > 0) {
    config.model = provider.models[0];
  }

  // npm plugins only
  if (npmPlugins.length > 0) {
    config.plugin = npmPlugins.map((p) => p.npm).filter(Boolean);
  }

  // Instructions (for instruction-based plugins like shell-strategy)
  const instructionPaths: string[] = [];
  for (const plugin of instructionPlugins) {
    if (plugin.id === "opencode-shell-strategy") {
      instructionPaths.push(
        "~/.config/opencode/plugins/opencode-shell-strategy/shell_strategy.md"
      );
    }
  }
  if (instructionPaths.length > 0) {
    config.instructions = instructionPaths;
  }

  // MCP Servers
  if (selectedMcp.length > 0) {
    const mcpConfig: Record<string, unknown> = {};
    for (const mcp of selectedMcp) {
      if (mcp.id === "context7") {
        mcpConfig["context7"] = {
          type: "stdio",
          command: "npx",
          args: ["-y", "@upstash/context7-mcp@latest"],
        };
      } else if (mcp.id === "sequential-thinking") {
        mcpConfig["sequential-thinking"] = {
          type: "stdio",
          command: "npx",
          args: ["-y", "@modelcontextprotocol/server-sequential-thinking"],
        };
      } else if (mcp.id === "filesystem") {
        mcpConfig["filesystem"] = {
          type: "stdio",
          command: "npx",
          args: [
            "-y",
            "@modelcontextprotocol/server-filesystem",
            "$HOME/projects",
          ],
        };
      } else if (mcp.id === "github-mcp") {
        mcpConfig["github"] = {
          type: "stdio",
          command: "npx",
          args: ["-y", "@modelcontextprotocol/server-github"],
          env: { GITHUB_PERSONAL_ACCESS_TOKEN: "${GITHUB_TOKEN:-}" },
        };
      } else if (mcp.id === "fetch") {
        // Fetch MCP is Python-based, uses uvx
        mcpConfig["fetch"] = {
          type: "stdio",
          command: "uvx",
          args: ["mcp-server-fetch"],
        };
      } else if (mcp.id === "brave-search") {
        mcpConfig["brave-search"] = {
          type: "stdio",
          command: "npx",
          args: ["-y", "@modelcontextprotocol/server-brave-search"],
          env: { BRAVE_API_KEY: "${BRAVE_API_KEY:-}" },
        };
      } else if (mcp.id === "playwright") {
        mcpConfig["playwright"] = {
          type: "stdio",
          command: "npx",
          args: ["-y", "@playwright/mcp@latest"],
        };
      } else if (mcp.id === "memory") {
        mcpConfig["memory"] = {
          type: "stdio",
          command: "npx",
          args: ["-y", "@modelcontextprotocol/server-memory"],
        };
      }
    }
    config.mcp = mcpConfig;
  }

  // Agents in config
  if (selectedAgents.length > 0) {
    const agentConfig: Record<string, unknown> = {};
    for (const agent of selectedAgents) {
      agentConfig[agent.id] = {
        description: agent.description,
        mode: agent.mode,
        model: provider?.models[0] || "anthropic/claude-sonnet-4-20250514",
        tools: agent.tools,
      };
    }
    config.agent = agentConfig;
  }

  const configJson = JSON.stringify(config, null, 2);

  lines.push(`cat > "$GLOBAL_CONFIG_DIR/opencode.json" << 'CONFIGEOF'`);
  lines.push(configJson);
  lines.push("CONFIGEOF");
  lines.push('success "Global opencode.json created"');
  lines.push("");

  // ─── Step: Check dependencies for MCP servers ──────────
  const needsUvx = selectedMcp.some((m) => m.installType === "uvx");
  if (needsUvx) {
    lines.push('# Check uvx dependency for Python-based MCP servers');
    lines.push("if ! command -v uvx &> /dev/null; then");
    lines.push('  warn "uvx not found. The Fetch MCP server requires uvx (Python package runner)."');
    lines.push('  echo -e "${YELLOW}Install uv: curl -LsSf https://astral.sh/uv/install.sh | sh${NC}"');
    lines.push("fi");
    lines.push("");
  }

  // ─── Step: Create agent markdown files ─────────────────
  currentStep++;
  if (selectedAgents.length > 0) {
    lines.push(`step "Step ${currentStep}/${totalSteps}: Creating agent configurations"`);
    lines.push("");

    for (const agent of selectedAgents) {
      const agentFile = generateAgentMarkdown(agent, provider?.models[0]);
      lines.push(
        `cat > "$GLOBAL_CONFIG_DIR/agents/${agent.id}.md" << 'AGENTEOF'`
      );
      lines.push(agentFile);
      lines.push("AGENTEOF");
      lines.push(`success "Agent created: ${agent.name}"`);
      lines.push("");
    }
  } else {
    lines.push(`step "Step ${currentStep}/${totalSteps}: Skipping agents (none selected)"`);
    lines.push("");
  }

  // ─── Step: Create AGENTS.md ────────────────────────────
  currentStep++;
  if (selectedRules.length > 0) {
    lines.push(`step "Step ${currentStep}/${totalSteps}: Creating global AGENTS.md rules"`);
    lines.push("");

    const agentsMd = generateAgentsMd(selectedRules);
    lines.push(`cat > "$GLOBAL_CONFIG_DIR/AGENTS.md" << 'RULESEOF'`);
    lines.push(agentsMd);
    lines.push("RULESEOF");
    lines.push('success "Global AGENTS.md created"');
  } else {
    lines.push(`step "Step ${currentStep}/${totalSteps}: Skipping rules (none selected)"`);
  }
  lines.push("");

  // ─── Summary ───────────────────────────────────────────
  lines.push('echo ""');
  lines.push('echo -e "${GREEN}${BOLD}"');
  lines.push("cat << 'DONE'");
  lines.push("");
  lines.push("   ╔═══════════════════════════════════════════╗");
  lines.push("   ║                                           ║");
  lines.push("   ║   ✅ Installation Complete!               ║");
  lines.push("   ║                                           ║");
  lines.push("   ╚═══════════════════════════════════════════╝");
  lines.push("");
  lines.push("DONE");
  lines.push('echo -e "${NC}"');
  lines.push("");

  lines.push('echo -e "${CYAN}Summary:${NC}"');
  lines.push(
    `echo -e "  Provider:    ${provider?.name || "Not configured"}"`,
  );
  lines.push(`echo -e "  Plugins:     ${selectedPlugins.length} installed (${npmPlugins.length} npm, ${gitPlugins.length + instructionPlugins.length} git)"`);
  lines.push(`echo -e "  MCP Servers: ${selectedMcp.length} configured"`);
  lines.push(`echo -e "  Agents:      ${selectedAgents.length} created"`);
  lines.push(`echo -e "  Rules:       ${selectedRules.length} applied"`);
  lines.push('echo ""');

  // Show config file location
  lines.push('echo -e "${CYAN}Config location:${NC}"');
  lines.push('echo "  $GLOBAL_CONFIG_DIR/opencode.json"');
  lines.push('echo ""');

  lines.push('echo -e "${YELLOW}Next steps:${NC}"');
  lines.push('echo "  1. cd into your project directory"');
  lines.push('echo "  2. Run: opencode"');
  lines.push('echo "  3. Use /models to select your preferred model"');
  if (provider?.envVar) {
    lines.push(
      `echo "  4. If not set, export ${provider.envVar}=your-key"`,
    );
  }
  lines.push('echo ""');
  lines.push('echo -e "${CYAN}Enjoy coding with OpenCode! ⚡${NC}"');

  return lines.join("\n");
}

function generateAgentMarkdown(
  agent: AgentConfig,
  model?: string,
): string {
  const lines: string[] = [];
  lines.push("---");
  lines.push(`description: ${agent.description}`);
  lines.push(`mode: ${agent.mode}`);
  lines.push(`model: ${model || "anthropic/claude-sonnet-4-20250514"}`);
  lines.push("temperature: 0.1");
  lines.push("tools:");
  for (const [tool, enabled] of Object.entries(agent.tools)) {
    lines.push(`  ${tool}: ${enabled}`);
  }
  lines.push("---");
  lines.push("");
  lines.push(agent.prompt);
  return lines.join("\n");
}

function generateAgentsMd(selectedRules: RuleConfig[]): string {
  const lines: string[] = [];
  lines.push("# OpenCode Global Rules");
  lines.push("");
  lines.push("> Generated by OpenCode Forge — https://opencode.ai");
  lines.push("> These rules apply to all OpenCode sessions globally.");
  lines.push("");

  for (const rule of selectedRules) {
    lines.push(rule.content);
    lines.push("");
  }

  return lines.join("\n");
}

export function countSelected(selectedIds: Set<string>): {
  plugins: number;
  mcp: number;
  agents: number;
  rules: number;
  total: number;
} {
  const p = plugins.filter((i) => selectedIds.has(i.id)).length;
  const m = mcpServers.filter((i) => selectedIds.has(i.id)).length;
  const a = agents.filter((i) => selectedIds.has(i.id)).length;
  const r = rules.filter((i) => selectedIds.has(i.id)).length;
  return { plugins: p, mcp: m, agents: a, rules: r, total: p + m + a + r };
}
