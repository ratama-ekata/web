"use client";

import React, { useState, useRef, useEffect, useMemo, useId } from "react";
import { Check, ChevronDown, Search, X, Shield } from "lucide-react";
import { POLICE_STATIONS, type PoliceStation } from "@/constants/police-stations";
import { cn } from "@/lib/utils";

export interface PoliceStationSelectProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  required?: boolean;
}

export function PoliceStationSelect({
  id,
  name = "police_station",
  value,
  onChange,
  onBlur,
  placeholder = "Search and select police station...",
  disabled = false,
  error,
  className,
  required = false,
}: PoliceStationSelectProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const listboxId = `${inputId}-listbox`;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Filter stations based on search query
  const filteredStations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return POLICE_STATIONS;
    return POLICE_STATIONS.filter(
      (station) =>
        station.station_name.toLowerCase().includes(q) ||
        String(station.station_id).includes(q)
    );
  }, [searchQuery]);

  // Selected station object
  const selectedStation = useMemo(() => {
    if (!value) return null;
    return (
      POLICE_STATIONS.find(
        (s) => s.station_name.toLowerCase() === value.trim().toLowerCase()
      ) || { station_id: 0, station_name: value }
    );
  }, [value]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
          onBlur?.();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onBlur]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery("");
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("li");
      const target = items[highlightedIndex];
      if (target) {
        target.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (station: PoliceStation) => {
    onChange(station.station_name);
    setIsOpen(false);
    onBlur?.();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setSearchQuery("");
    if (!isOpen) {
      onBlur?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredStations.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredStations.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredStations.length) {
          handleSelect(filteredStations[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        onBlur?.();
        break;
      case "Tab":
        setIsOpen(false);
        onBlur?.();
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full flex flex-col gap-1.5">
      <input type="hidden" name={name} value={value} required={required} />

      {/* Main trigger button */}
      <button
        id={inputId}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label="Select police station"
        aria-invalid={!!error}
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-lg border bg-white px-3.5 py-2 text-sm text-left shadow-2xs transition-colors cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-[#882637] dark:focus:ring-[#F29EAA]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-50",
          error
            ? "border-red-500! focus:ring-red-500! dark:border-red-500!"
            : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600",
          isOpen && "ring-2 ring-[#882637] dark:ring-[#F29EAA] border-transparent",
          className
        )}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <Shield
            className={cn(
              "h-4 w-4 shrink-0 transition-colors",
              selectedStation
                ? "text-[#882637] dark:text-[#F29EAA]"
                : "text-zinc-400 dark:text-zinc-500"
            )}
            aria-hidden="true"
          />
          {selectedStation ? (
            <span className="font-semibold text-zinc-900 dark:text-white truncate">
              {selectedStation.station_name}
              {selectedStation.station_id > 0 && (
                <span className="ml-2 text-xs font-normal text-zinc-400 dark:text-zinc-500">
                  (Station #{selectedStation.station_id})
                </span>
              )}
            </span>
          ) : (
            <span className="text-zinc-400 dark:text-zinc-500 truncate">
              {placeholder}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {value && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClear(e as unknown as React.MouseEvent);
                }
              }}
              title="Clear selection"
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-zinc-400 transition-transform duration-200",
              isOpen && "rotate-180 text-[#882637] dark:text-[#F29EAA]"
            )}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute left-0 top-full mt-1.5 z-50 flex w-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900",
            "animate-in fade-in-50 zoom-in-95 duration-150"
          )}
        >
          {/* Search Header */}
          <div className="flex items-center gap-2 border-b border-zinc-200/80 bg-zinc-50/80 px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-800/50">
            <Search className="h-4 w-4 text-zinc-400 shrink-0" aria-hidden="true" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type station name (e.g. Kandy, Fort, Matale)..."
              className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 outline-none dark:text-zinc-100 dark:placeholder:text-zinc-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  searchInputRef.current?.focus();
                }}
                className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Quick Counter Info */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-100/60 dark:bg-zinc-800/30 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 border-b border-zinc-200/60 dark:border-zinc-800">
            <span>Official Sri Lanka Police Stations</span>
            <span>
              {filteredStations.length} {filteredStations.length === 1 ? "station" : "stations"} found
            </span>
          </div>

          {/* Stations List */}
          <ul
            id={listboxId}
            ref={listRef}
            role="listbox"
            aria-label="Police stations list"
            className="max-h-64 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700"
          >
            {filteredStations.length === 0 ? (
              <li className="px-4 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
                No police stations match &ldquo;{searchQuery}&rdquo;.
              </li>
            ) : (
              filteredStations.map((station, index) => {
                const isSelected =
                  value.trim().toLowerCase() ===
                  station.station_name.trim().toLowerCase();
                const isHighlighted = index === highlightedIndex;

                return (
                  <li
                    key={station.station_id}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(station)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm cursor-pointer transition-colors",
                      isHighlighted && "bg-zinc-100 dark:bg-zinc-800/70",
                      isSelected &&
                        "bg-[#882637]/10 font-bold text-[#882637] dark:bg-[#882637]/20 dark:text-[#F29EAA]"
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="truncate">{station.station_name}</span>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        #{station.station_id}
                      </span>
                    </div>

                    {isSelected && (
                      <Check
                        className="h-4 w-4 shrink-0 text-[#882637] dark:text-[#F29EAA] ml-2"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

