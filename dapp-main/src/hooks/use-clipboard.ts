"use client";

import { showToast } from "@/lib/toast";
import { useState } from "react";

/**
 * Custom hook for copying text to clipboard, with optional toast notification.
 * @param successMessage Message to show in a toast on success (optional)
 * @returns [copy, { copied, error }]
 */
export default function useClipboard(
  successMessage?: string,
): [
  (text: string) => Promise<void>,
  { copied: boolean; error: string | null },
] {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      setError("Clipboard API not supported");
      showToast("Clipboard API not supported", "error");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (successMessage) showToast(successMessage, "success");
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setError("Failed to copy");
      showToast("Failed to copy", "error");
    }
  };

  return [copy, { copied, error }];
}
