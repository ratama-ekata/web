"use client";

import React, { useRef, useState } from "react";
import { Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";

function UploadDocumentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-11 h-11 text-zinc-900 dark:text-zinc-100", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Upload Arrow */}
      <path d="M7 11V3.5" />
      <path d="M3.5 7L7 3.5 10.5 7" />
      {/* Document outline */}
      <path d="M13 5h4a3 3 0 0 1 3 3v7a2.5 2.5 0 0 1-.73 1.77l-3.5 3.5A2.5 2.5 0 0 1 14 21H8a3 3 0 0 1-3-3v-3" />
      {/* Corner fold flap */}
      <path d="M14 21v-3.5a1.5 1.5 0 0 1 1.5-1.5H19" />
    </svg>
  );
}

export interface FileUploadProps {
  id: string;
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMb?: number;
  accept?: string;
  labels: {
    drop: string;
    hint: string;
    browse: string;
    remove: string;
    sizeError: string;
    countError: string;
    maxSize?: string;
  };
}

export function FileUpload({
  id,
  files,
  onChange,
  maxFiles = 3,
  maxSizeMb = 10,
  accept = ".png,.jpg,.jpeg,.pdf,.docx,image/png,image/jpeg,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  labels,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    setError("");
    const incoming = Array.from(list);
    if (incoming.some((f) => f.size > maxSizeMb * 1024 * 1024)) {
      setError(labels.sizeError);
      return;
    }
    const merged = [...files, ...incoming];
    if (merged.length > maxFiles) {
      setError(labels.countError);
      return;
    }
    onChange(merged);
    if (inputRef.current) inputRef.current.value = "";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-8 sm:py-10 text-center transition-all",
          dragging
            ? "border-[#882637] bg-[#FDF2F4] dark:border-red-400 dark:bg-red-950/20"
            : "border-zinc-300 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:border-zinc-600"
        )}
      >
        <UploadDocumentIcon className="transition-transform group-hover:scale-105" />

        <p className="mt-3.5 text-base sm:text-lg font-medium text-zinc-800 dark:text-zinc-100">
          {labels.drop}
        </p>

        <p className="mt-1 text-xs sm:text-[13px] text-zinc-400 dark:text-zinc-500">
          {labels.hint}
        </p>

        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple
          accept={accept}
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
          className="mt-4.5 inline-flex items-center justify-center rounded-xl bg-[#D4D4D8] px-7 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-[#C4C4C8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          {labels.browse}
        </button>

        {labels.maxSize && (
          <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
            {labels.maxSize}
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <Paperclip className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                <span className="truncate font-medium text-zinc-800 dark:text-zinc-200">{file.name}</span>
                <span className="shrink-0 text-xs text-zinc-400">({formatFileSize(file.size)})</span>
              </span>
              <button
                type="button"
                aria-label={`${labels.remove} ${file.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(files.filter((_, idx) => idx !== i));
                }}
                className="cursor-pointer rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-red-600 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

