"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Search, X } from "lucide-react";
import clsx from "clsx";
import CatalogSearch from "@/components/commonComponents/CatalogSearch";

function getShortcutLabel() {
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? "⌘K" : "Ctrl+K";
}

function SearchShortcutHint() {
  const label = useSyncExternalStore(
    () => () => {},
    getShortcutLabel,
    () => "Ctrl+K",
  );

  return (
    <kbd
      className="hidden rounded-md border border-border bg-surface-stone px-1.5 py-0.5 text-[10px] font-medium text-muted sm:inline"
    >
      {label}
    </kbd>
  );
}

export function SearchTriggerButton({ onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx("icon-btn icon-btn-sm gap-1.5 sm:w-auto sm:px-3", className)}
      aria-label="Search catalog (Ctrl+K)"
    >
      <Search className="h-5 w-5 shrink-0" aria-hidden />
      <SearchShortcutHint />
    </button>
  );
}

export default function SearchModal({ className }) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "k") return;

      const target = e.target;
      const isEditable =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT");

      if (isEditable && !open) return;

      e.preventDefault();
      setOpen((prev) => !prev);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <SearchTriggerButton
        onClick={() => setOpen(true)}
        className={className}
      />

      <Dialog open={open} onClose={close} className="relative z-[70]">
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-start justify-center overflow-y-auto p-4 pt-[10vh] sm:p-6 sm:pt-[12vh]">
          <DialogPanel className="w-full max-w-2xl rounded-2xl border border-border bg-white p-5 shadow-2xl sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <DialogTitle className="font-display text-lg font-normal text-zinc-900">
                  Search catalog
                </DialogTitle>
                <SearchShortcutHint />
              </div>
              <button
                type="button"
                onClick={close}
                className="icon-btn icon-btn-round"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {open ? (
              <CatalogSearch
                key="catalog-search-modal"
                theme="light"
                autoFocus
                resultsInline
                maxResults={10}
                submitBehavior="redirect"
                initialType="all"
                onResultSelect={close}
                onDismiss={close}
              />
            ) : null}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
