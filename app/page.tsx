'use client';

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GreetingCard } from "@/components/greeting-card";
import { fallbackLanguage, languages } from "@/lib/languages";

type TimeOfDay = "Morning" | "Afternoon" | "Evening" | "Night";

const TIME_SEGMENTS: { label: TimeOfDay }[] = [
  { label: "Morning" },
  { label: "Afternoon" },
  { label: "Evening" },
  { label: "Night" },
];

function resolveTimeOfDay(date: Date): TimeOfDay {
  const hour = date.getHours();
  if (hour >= 21 || hour < 5) return "Night";
  if (hour >= 17) return "Evening";
  if (hour >= 12) return "Afternoon";
  return "Morning";
}

function formatClock(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default function Home() {
  const [name, setName] = useState("Explorer");
  const [languageCode, setLanguageCode] = useState(fallbackLanguage.code);
  const [autoRotate, setAutoRotate] = useState(true);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (!autoRotate) return;
    const rotate = setInterval(() => {
      setLanguageCode((prev) => {
        const currentIndex = languages.findIndex((lang) => lang.code === prev);
        const nextIndex = (currentIndex + 1) % languages.length;
        return languages[nextIndex]?.code ?? fallbackLanguage.code;
      });
    }, 5000);

    return () => clearInterval(rotate);
  }, [autoRotate]);

  const timeOfDay = useMemo(() => resolveTimeOfDay(now), [now]);
  const clock = useMemo(() => formatClock(now), [now]);
  const selectedLanguage = useMemo(
    () =>
      languages.find((language) => language.code === languageCode) ??
      fallbackLanguage,
    [languageCode],
  );

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 pb-24 pt-16 sm:px-10 lg:px-20">
        <motion.header
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-300/70">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Say Hello
          </span>
          <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Craft a multilingual greeting, tailored for any moment of the day.
          </h1>
          <p className="max-w-2xl text-lg text-slate-300/90">
            Explore how different cultures share warmth. Pick a language, personalise the message,
            and let the live clock guide the perfect tone for your hello.
          </p>
        </motion.header>

        <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <GreetingCard
            language={selectedLanguage}
            name={name}
            timeOfDay={timeOfDay}
          />

          <div className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium uppercase tracking-[0.28em] text-slate-200/80">
                Your Name
              </label>
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setAutoRotate(false);
                }}
                placeholder="Type your name"
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              />
              <p className="text-sm text-slate-200/70">
                The greeting instantly adapts using the name you share. Leave it blank to keep it universal.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium uppercase tracking-[0.28em] text-slate-200/80">
                Languages
              </span>
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => {
                  const isActive = language.code === selectedLanguage.code;
                  return (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() => {
                        setLanguageCode(language.code);
                        setAutoRotate(false);
                      }}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        isActive
                          ? "border-emerald-400 bg-emerald-400/20 text-white"
                          : "border-white/10 bg-white/5 text-slate-200 hover:border-white/40"
                      }`}
                    >
                      {language.label}
                    </button>
                  );
                })}
              </div>
              <label className="mt-3 flex items-center gap-3 text-sm text-slate-200/80">
                <input
                  type="checkbox"
                  checked={autoRotate}
                  onChange={(event) => setAutoRotate(event.target.checked)}
                  className="h-4 w-4 rounded border border-white/40 bg-white/10 accent-emerald-400"
                />
                Auto-cycle through every hello
              </label>
            </div>

            <div className="grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-6 text-sm text-slate-200/80">
              <div className="flex items-center justify-between">
                <span>Local time</span>
                <span className="font-mono text-base text-white">{clock}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {TIME_SEGMENTS.map((segment) => (
                  <span
                    key={segment.label}
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                      timeOfDay === segment.label
                        ? "bg-emerald-400/20 text-emerald-200"
                        : "bg-white/5 text-slate-400"
                    }`}
                  >
                    {segment.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-auto text-xs text-slate-400/70">
          Built with care to make saying hello delightful—wherever you are.
        </footer>
      </main>
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute -bottom-16 left-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      </motion.div>
    </div>
  );
}
