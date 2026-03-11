/*
 * ═══════════════════════════════════════════════════════════════
 * NEON FORGE — Home Page
 * Design: Cyberpunk Minimalist / Neon Brutalism
 * Dark background, cyan/magenta neon accents, glow effects
 * ═══════════════════════════════════════════════════════════════
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Puzzle,
  Server,
  Bot,
  ScrollText,
  Zap,
  Copy,
  Check,
  Download,
  ChevronDown,
  Sparkles,
  Star,
  Terminal,
  ArrowDown,
  ExternalLink,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { useInstaller } from "@/hooks/useInstaller";
import {
  plugins,
  mcpServers,
  agents,
  rules,
  providers,
  categories,
  type Category,
} from "@/lib/installer-data";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663304144987/3V6H6F3yiXbZsc7SAgEvYz/hero-bg-c3GQbFvUWNUYhrVMXWnoGW.webp";
const FORGE_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310519663304144987/3V6H6F3yiXbZsc7SAgEvYz/forge-icon-Jgkx5R7jS5X6ohAuvheYro.webp";
const TERMINAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663304144987/3V6H6F3yiXbZsc7SAgEvYz/opencode-terminal-Vc3zdLuLGnxrSUVjKJQyBS.webp";

const categoryIcons: Record<Category, typeof Puzzle> = {
  plugins: Puzzle,
  mcp: Server,
  agents: Bot,
  rules: ScrollText,
  skills: Sparkles,
};

function getCategoryItems(cat: Category) {
  switch (cat) {
    case "plugins": return plugins;
    case "mcp": return mcpServers;
    case "agents": return agents;
    case "rules": return rules;
    default: return [];
  }
}

// Simple syntax highlighting for bash
function highlightBash(code: string): React.ReactNode[] {
  return code.split("\n").map((line, i) => {
    // Comments
    if (line.trimStart().startsWith("#")) {
      return <span key={i} className="text-muted-foreground/60">{line}{"\n"}</span>;
    }
    // Keywords
    const isKeyword = /^(if|else|fi|then|for|do|done|cat|echo|mkdir|set|export)\b/.test(line.trimStart());
    if (isKeyword) {
      return <span key={i} className="text-cyan/90">{line}{"\n"}</span>;
    }
    // Functions
    if (line.includes("()") || line.includes("function ")) {
      return <span key={i} className="text-magenta/90">{line}{"\n"}</span>;
    }
    // Success/info/error/step calls
    if (/^\s*(info|success|warn|error|step)\s/.test(line)) {
      return <span key={i} className="text-neon-cyan/80">{line}{"\n"}</span>;
    }
    return <span key={i}>{line}{"\n"}</span>;
  });
}

export default function Home() {
  const installer = useInstaller();
  const [showScript, setShowScript] = useState(false);
  const [copied, setCopied] = useState(false);
  const [providerOpen, setProviderOpen] = useState(false);
  const scriptRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installer.script);
      setCopied(true);
      toast.success("Script copiado al portapapeles");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for non-HTTPS
      const textarea = document.createElement("textarea");
      textarea.value = installer.script;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      toast.success("Script copiado al portapapeles");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([installer.script], { type: "text/x-shellscript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "opencode-forge-install.sh";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Script descargado como opencode-forge-install.sh");
  };

  const handleViewScript = () => {
    setShowScript(!showScript);
    if (!showScript) {
      setTimeout(() => {
        scriptRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  // Close provider dropdown on outside click
  useEffect(() => {
    if (!providerOpen) return;
    const handler = (e: MouseEvent) => {
      setProviderOpen(false);
    };
    const timer = setTimeout(() => {
      document.addEventListener("click", handler);
    }, 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handler);
    };
  }, [providerOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── HERO SECTION ─────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/75 to-background" />

        <div className="relative container py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center gap-6"
          >
            <motion.img
              src={FORGE_ICON}
              alt="OpenCode Forge"
              className="w-20 h-20 md:w-24 md:h-24"
              style={{ filter: "drop-shadow(0 0 20px oklch(0.75 0.15 195 / 0.4))" }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="text-cyan text-glow-cyan">OpenCode</span>{" "}
                <span className="text-foreground">Forge</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                Configura e instala{" "}
                <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">
                  OpenCode
                </a>{" "}
                con las mejores skills, plugins, agentes y MCP servers.{" "}
                <span className="text-cyan font-medium">Un solo script. Todo listo.</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-2 justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  document.getElementById("configurator")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 bg-cyan text-background font-semibold rounded-lg glow-cyan transition-all hover:brightness-110"
              >
                <Zap className="inline w-4 h-4 mr-2 -mt-0.5" />
                Configurar Ahora
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  installer.selectRecommended();
                  toast.success("Configuracion recomendada aplicada");
                }}
                className="px-6 py-3 border border-border bg-secondary/50 text-foreground font-medium rounded-lg transition-all hover:border-cyan/30"
              >
                <Star className="inline w-4 h-4 mr-2 -mt-0.5 text-magenta" />
                Usar Recomendados
              </motion.button>
            </div>

            <motion.div
              className="mt-6 text-muted-foreground/50"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────────── */}
      <section className="border-b border-border bg-card/50 sticky top-0 z-40 backdrop-blur-md">
        <div className="container py-3 flex flex-wrap justify-center gap-4 md:gap-10 text-sm">
          {[
            { label: "Plugins", value: installer.counts.plugins, color: "text-cyan" },
            { label: "MCP Servers", value: installer.counts.mcp, color: "text-cyan" },
            { label: "Agents", value: installer.counts.agents, color: "text-magenta" },
            { label: "Rules", value: installer.counts.rules, color: "text-magenta" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className={`text-xl md:text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</span>
              <span className="text-muted-foreground text-xs md:text-sm">{stat.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 pl-4 border-l border-border">
            <span className="text-xl md:text-2xl font-bold font-mono text-foreground">{installer.counts.total}</span>
            <span className="text-muted-foreground text-xs md:text-sm">Total</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCopy}
            className="ml-2 px-4 py-1.5 bg-cyan text-background text-xs font-semibold rounded-md glow-cyan transition-all hover:brightness-110 hidden md:flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copiado" : "Copiar Script"}
          </motion.button>
        </div>
      </section>

      {/* ─── CONFIGURATOR ─────────────────────────────────── */}
      <section id="configurator" className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* ─── LEFT SIDEBAR ───────────────────────────────── */}
          <div className="lg:sticky lg:top-20 lg:self-start space-y-5">
            {/* Provider Selector */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Proveedor de IA
              </h3>
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setProviderOpen(!providerOpen); }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-secondary/50 hover:border-cyan/30 transition-colors"
                >
                  <span className="font-medium text-sm">
                    {providers.find((p) => p.id === installer.selectedProvider)?.name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${providerOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {providerOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute z-50 mt-2 w-full rounded-lg border border-border bg-popover shadow-2xl overflow-hidden max-h-[400px] overflow-y-auto"
                    >
                      {providers.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            installer.setSelectedProvider(p.id);
                            setProviderOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-secondary/80 transition-colors border-b border-border/30 last:border-0 ${
                            installer.selectedProvider === p.id ? "bg-cyan/5 border-l-2 border-l-cyan" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{p.name}</span>
                            {p.popular && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan/10 text-cyan border border-cyan/20">
                                POPULAR
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Install Method */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Metodo de Instalacion
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {(["curl", "npm", "bun", "go"] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => installer.setInstallMethod(method)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-mono font-medium transition-all ${
                      installer.installMethod === method
                        ? "bg-cyan/15 text-cyan border border-cyan/30 glow-cyan"
                        : "bg-secondary/50 text-muted-foreground border border-border hover:border-cyan/20"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Tabs */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Categorias
              </h3>
              <div className="space-y-1.5">
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat.id];
                  const isActive = installer.activeCategory === cat.id;
                  const count = getCategoryItems(cat.id).filter((i) =>
                    installer.selectedIds.has(i.id),
                  ).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => installer.setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        isActive
                          ? "bg-cyan/10 border border-cyan/25 text-foreground"
                          : "hover:bg-secondary/60 text-muted-foreground border border-transparent"
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-cyan" : ""}`} />
                      <span className="flex-1 text-sm font-medium">{cat.name}</span>
                      <span
                        className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-cyan/20 text-cyan"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {count}/{cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => installer.selectAll(installer.activeCategory)}
                className="flex-1 px-3 py-2.5 text-xs font-medium rounded-lg border border-border bg-secondary/50 hover:border-cyan/30 hover:bg-cyan/5 transition-colors"
              >
                Seleccionar Todo
              </button>
              <button
                onClick={() => installer.deselectAll(installer.activeCategory)}
                className="flex-1 px-3 py-2.5 text-xs font-medium rounded-lg border border-border bg-secondary/50 hover:border-magenta/30 hover:bg-magenta/5 transition-colors"
              >
                Deseleccionar
              </button>
            </div>
          </div>

          {/* ─── RIGHT CONTENT ──────────────────────────────── */}
          <div className="space-y-6">
            {/* Category Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  {(() => {
                    const Icon = categoryIcons[installer.activeCategory];
                    return <Icon className="w-6 h-6 text-cyan" />;
                  })()}
                  {categories.find((c) => c.id === installer.activeCategory)?.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {categories.find((c) => c.id === installer.activeCategory)?.description}
                </p>
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {getCategoryItems(installer.activeCategory).map((item, idx) => {
                  const isSelected = installer.selectedIds.has(item.id);
                  const isEssential = installer.essentialIds.has(item.id);

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.04, duration: 0.3 }}
                    >
                      <button
                        onClick={() => installer.toggleItem(item.id)}
                        disabled={isEssential}
                        className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                          isSelected
                            ? "border-cyan/40 bg-cyan/[0.04]"
                            : "border-border bg-card hover:border-border hover:bg-card/80"
                        } ${isEssential ? "cursor-default" : ""}`}
                        style={isSelected ? {
                          boxShadow: "0 0 15px oklch(0.75 0.15 195 / 0.12), inset 0 0 30px oklch(0.75 0.15 195 / 0.03)"
                        } : undefined}
                      >
                        {/* Subtle glow line at top when selected */}
                        {isSelected && (
                          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
                        )}

                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className={`font-semibold text-sm ${isSelected ? "text-foreground" : "text-foreground/80"}`}>
                                {item.name}
                              </h3>
                              {isEssential && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-magenta/15 text-magenta border border-magenta/25 font-medium uppercase tracking-wider">
                                  Essential
                                </span>
                              )}
                              {item.recommended && !isEssential && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan/10 text-cyan border border-cyan/20 font-medium uppercase tracking-wider">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                              {item.description}
                            </p>
                            <div className="flex gap-1.5 mt-3 flex-wrap">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/80 text-muted-foreground/80"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${
                              isSelected
                                ? "bg-cyan border-cyan shadow-[0_0_8px_oklch(0.75_0.15_195_/_0.4)]"
                                : "border-border/60 group-hover:border-cyan/40"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-background" />}
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GENERATE SECTION ─────────────────────────────── */}
      <section className="border-t border-border bg-card/30" ref={scriptRef}>
        <div className="container py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              <Zap className="inline w-7 h-7 text-cyan mr-2 -mt-1" />
              Genera tu Script
            </h2>
            <p className="text-muted-foreground mt-2">
              <span className="text-cyan font-mono font-bold">{installer.counts.total}</span> componentes seleccionados. Un solo comando para instalar todo.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleViewScript}
                className="px-6 py-3 bg-cyan text-background font-semibold rounded-lg glow-cyan transition-all hover:brightness-110"
              >
                <Terminal className="inline w-4 h-4 mr-2 -mt-0.5" />
                {showScript ? "Ocultar Script" : "Ver Script"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCopy}
                className="px-6 py-3 border border-cyan/30 text-cyan font-semibold rounded-lg transition-all hover:bg-cyan/10"
              >
                {copied ? (
                  <Check className="inline w-4 h-4 mr-2 -mt-0.5" />
                ) : (
                  <Copy className="inline w-4 h-4 mr-2 -mt-0.5" />
                )}
                {copied ? "Copiado!" : "Copiar Script"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownload}
                className="px-6 py-3 border border-magenta/30 text-magenta font-semibold rounded-lg transition-all hover:bg-magenta/10"
              >
                <Download className="inline w-4 h-4 mr-2 -mt-0.5" />
                Descargar .sh
              </motion.button>
            </div>

            {/* Quick Install Command */}
            <div className="mb-6 p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-cyan" />
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Como usar el script
                </p>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">1. Descarga o copia el script, luego ejecuta:</p>
                  <div className="flex items-center gap-3 bg-background rounded-lg p-3 border border-border">
                    <code className="flex-1 text-sm font-mono text-cyan overflow-x-auto whitespace-nowrap">
                      chmod +x opencode-forge-install.sh && ./opencode-forge-install.sh
                    </code>
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-md hover:bg-secondary transition-colors flex-shrink-0"
                    >
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">2. O ejecuta directamente con bash:</p>
                  <div className="flex items-center gap-3 bg-background rounded-lg p-3 border border-border">
                    <code className="flex-1 text-sm font-mono text-cyan overflow-x-auto whitespace-nowrap">
                      bash opencode-forge-install.sh
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Script Preview */}
            <AnimatePresence>
              {showScript && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="rounded-xl border border-cyan/20 bg-background overflow-hidden"
                    style={{ boxShadow: "0 0 30px oklch(0.75 0.15 195 / 0.08)" }}
                  >
                    <div className="flex items-center justify-between px-4 py-2.5 bg-card border-b border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/70" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                        <div className="w-3 h-3 rounded-full bg-green-500/70" />
                        <span className="ml-3 text-xs text-muted-foreground font-mono">
                          opencode-forge-install.sh
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-muted-foreground/50 font-mono">
                          {installer.script.split("\n").length} lines
                        </span>
                        <button
                          onClick={handleCopy}
                          className="text-xs text-muted-foreground hover:text-cyan transition-colors flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" /> {copied ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>
                    <pre className="p-4 overflow-x-auto text-xs leading-relaxed font-mono max-h-[600px] overflow-y-auto">
                      <code className="text-foreground/85">{highlightBash(installer.script)}</code>
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="container py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Como Funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Configura",
                desc: "Selecciona tu proveedor de IA, plugins, MCP servers, agentes y reglas desde el panel interactivo.",
                color: "text-cyan",
                icon: Puzzle,
              },
              {
                step: "02",
                title: "Genera",
                desc: "El script bash se genera automaticamente con toda tu configuracion personalizada.",
                color: "text-magenta",
                icon: Terminal,
              },
              {
                step: "03",
                title: "Ejecuta",
                desc: "Descarga el script, ejecutalo en tu terminal y OpenCode queda listo para usar.",
                color: "text-cyan",
                icon: Zap,
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="text-center p-6 rounded-xl border border-border bg-card/50 hover:border-cyan/20 transition-colors"
              >
                <div className="flex justify-center mb-3">
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <span className={`text-3xl font-bold font-mono ${item.color}`}>
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <img
              src={TERMINAL_IMG}
              alt="Terminal preview"
              className="rounded-xl border border-border max-w-2xl w-full opacity-75"
              style={{ filter: "drop-shadow(0 0 30px oklch(0.75 0.15 195 / 0.12))" }}
            />
          </div>
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED ──────────────────────────────── */}
      <section className="border-t border-border bg-card/20">
        <div className="container py-16">
          <h2 className="text-3xl font-bold text-center mb-4">
            Que Incluye
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Todo lo que el script configura automaticamente en tu sistema.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Puzzle,
                title: "Plugins",
                items: ["Shell Strategy", "Context Pruning", "VibeGuard", "SuperMemory", "Morph Plugin"],
                color: "text-cyan",
              },
              {
                icon: Server,
                title: "MCP Servers",
                items: ["Context7 (Docs)", "Sequential Thinking", "GitHub Integration", "Fetch", "Memory"],
                color: "text-cyan",
              },
              {
                icon: Bot,
                title: "Agentes",
                items: ["Code Reviewer", "Architect", "Debugger", "Docs Writer", "Security Auditor"],
                color: "text-magenta",
              },
              {
                icon: ScrollText,
                title: "Reglas",
                items: ["Code Quality", "Git Workflow", "Security First", "Project Structure", "Documentation"],
                color: "text-magenta",
              },
            ].map((section) => (
              <div key={section.title} className="p-5 rounded-xl border border-border bg-card/50">
                <section.icon className={`w-5 h-5 ${section.color} mb-3`} />
                <h3 className="font-semibold text-sm mb-3">{section.title}</h3>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                      <div className={`w-1 h-1 rounded-full ${section.color === "text-cyan" ? "bg-cyan" : "bg-magenta"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────── */}
      <footer className="border-t border-border bg-card/30">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={FORGE_ICON} alt="" className="w-7 h-7 opacity-60" />
            <span className="text-sm text-muted-foreground">
              OpenCode Forge — Instalador no oficial para{" "}
              <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">
                opencode.ai
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="https://opencode.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan transition-colors flex items-center gap-1"
            >
              opencode.ai <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://opencode.ai/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan transition-colors"
            >
              Docs
            </a>
            <a
              href="https://github.com/anomalyco/opencode"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
