"use client";

import type { ReactNode } from "react";

const CONTROL =
  "w-full rounded-2xl border-2 border-ink/15 bg-cream px-4 py-3 text-ink placeholder:text-ink/40 transition focus:border-ink focus:outline-none";

function Wrapper({
  name,
  label,
  error,
  optional,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-bold text-ink"
      >
        {label}
        {optional && (
          <span className="ml-1.5 font-medium text-ink/50">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-2 text-sm font-semibold text-tomato">
          {error}
        </p>
      )}
    </div>
  );
}

type Base = {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
};

export function TextField({
  name,
  label,
  error,
  optional,
  type = "text",
  autoComplete,
  placeholder,
}: Base & { type?: string; autoComplete?: string; placeholder?: string }) {
  return (
    <Wrapper name={name} label={label} error={error} optional={optional}>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={CONTROL}
      />
    </Wrapper>
  );
}

export function SelectField({
  name,
  label,
  error,
  optional,
  options,
  placeholder = "Please choose",
}: Base & { options: readonly string[]; placeholder?: string }) {
  return (
    <Wrapper name={name} label={label} error={error} optional={optional}>
      <select
        id={name}
        name={name}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={CONTROL}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export function TextAreaField({
  name,
  label,
  error,
  optional,
  rows = 5,
}: Base & { rows?: number }) {
  return (
    <Wrapper name={name} label={label} error={error} optional={optional}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={CONTROL}
      />
    </Wrapper>
  );
}

export function FormMessage({
  status,
  message,
}: {
  status: "idle" | "error" | "success";
  message: string;
}) {
  if (status === "idle" || !message) return null;

  const success = status === "success";

  return (
    <div
      role="alert"
      className={`rounded-2xl px-5 py-4 text-[0.95rem] font-semibold ${
        success ? "bg-leaf text-ink" : "bg-sun text-ink"
      }`}
    >
      {message}
    </div>
  );
}

export function SubmitButton({
  pending,
  children,
}: {
  pending: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-chip bg-tomato px-7 py-3.5 font-bold text-white transition hover:bg-tomato/90 disabled:opacity-60"
    >
      {pending ? "Sending…" : children}
    </button>
  );
}
