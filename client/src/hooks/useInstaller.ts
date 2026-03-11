/*
 * ═══════════════════════════════════════════════════════════════
 * NEON FORGE — useInstaller Hook
 * Manages all installer state: selections, provider, method
 * ═══════════════════════════════════════════════════════════════
 */

import { useState, useCallback, useMemo } from "react";
import {
  getRecommendedIds,
  getEssentialIds,
  getAllItems,
  type Category,
} from "@/lib/installer-data";
import { generateScript, countSelected, type GeneratorOptions } from "@/lib/script-generator";

export function useInstaller() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(getRecommendedIds()),
  );
  const [selectedProvider, setSelectedProvider] = useState("anthropic");
  const [installMethod, setInstallMethod] = useState<"curl" | "npm" | "bun" | "go">("curl");
  const [activeCategory, setActiveCategory] = useState<Category>("plugins");

  const essentialIds = useMemo(() => new Set(getEssentialIds()), []);

  const toggleItem = useCallback(
    (id: string) => {
      if (essentialIds.has(id)) return; // Can't deselect essentials
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [essentialIds],
  );

  const selectAll = useCallback(
    (category: Category) => {
      const allItems = getAllItems().filter((i) => i.category === category);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const item of allItems) {
          next.add(item.id);
        }
        return next;
      });
    },
    [],
  );

  const deselectAll = useCallback(
    (category: Category) => {
      const allItems = getAllItems().filter((i) => i.category === category);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const item of allItems) {
          if (!essentialIds.has(item.id)) {
            next.delete(item.id);
          }
        }
        return next;
      });
    },
    [essentialIds],
  );

  const selectRecommended = useCallback(() => {
    setSelectedIds(new Set(getRecommendedIds()));
  }, []);

  const counts = useMemo(() => countSelected(selectedIds), [selectedIds]);

  const script = useMemo(() => {
    const opts: GeneratorOptions = {
      selectedIds,
      selectedProvider,
      installMethod,
    };
    return generateScript(opts);
  }, [selectedIds, selectedProvider, installMethod]);

  return {
    selectedIds,
    selectedProvider,
    setSelectedProvider,
    installMethod,
    setInstallMethod,
    activeCategory,
    setActiveCategory,
    toggleItem,
    selectAll,
    deselectAll,
    selectRecommended,
    essentialIds,
    counts,
    script,
  };
}
