"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Search, X } from "lucide-react";
import clsx from "clsx";
import CatalogSearch from "@/components/commonComponents/CatalogSearch";

export function SearchTriggerButton({ onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex h-10 w-10 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-stone-100 hover:text-zinc-900",
        className,
      )}
      aria-label="Search catalog"
    >
      <Search className="h-5 w-5" aria-hidden />
    </button>
  );
}

export default function SearchModal({ className }) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

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
          <DialogPanel className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <DialogTitle className="font-display text-lg font-normal text-zinc-900">
                Search catalog
              </DialogTitle>
              <button
                type="button"
                onClick={close}
                className="rounded-full p-2 text-zinc-500 transition hover:bg-stone-100 hover:text-zinc-900"
                aria-label="Close search"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            {open ? (
              <CatalogSearch
                key="catalog-search-modal"
                theme="light"
                autoFocus
                resultsInline
                maxResults={10}
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
