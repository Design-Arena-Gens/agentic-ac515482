import { motion } from "framer-motion";
import type { GreetingLanguage } from "@/lib/languages";

type GreetingCardProps = {
  language: GreetingLanguage;
  name: string;
  timeOfDay: string;
};

const gradients: Record<string, string> = {
  morning: "from-amber-200 via-rose-100 to-sky-200",
  afternoon: "from-sky-200 via-indigo-200 to-emerald-200",
  evening: "from-indigo-300 via-purple-300 to-slate-900",
  night: "from-slate-900 via-slate-800 to-amber-200",
};

function getGradientKey(timeOfDay: string) {
  if (timeOfDay === "Night") return "night";
  if (timeOfDay === "Evening") return "evening";
  if (timeOfDay === "Afternoon") return "afternoon";
  return "morning";
}

export function GreetingCard({ language, name, timeOfDay }: GreetingCardProps) {
  const gradientKey = getGradientKey(timeOfDay);
  const displayName = name.trim() ? name.trim() : "Friend";

  return (
    <motion.article
      className={`relative overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br p-8 shadow-xl transition-colors ${gradients[gradientKey]} text-slate-900 dark:text-slate-100`}
      layout
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
    >
      <motion.span
        className="text-xs uppercase tracking-[0.4em] text-slate-600/80 dark:text-slate-200/80"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {timeOfDay} Greeting
      </motion.span>
      <motion.h2
        className="mt-4 text-4xl font-semibold sm:text-5xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        {language.greeting}, {displayName}!
      </motion.h2>
      <motion.p
        className="mt-4 text-base text-slate-700/80 dark:text-slate-100/80"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {language.description}
      </motion.p>
      <motion.footer
        className="mt-6 flex items-center justify-between text-sm text-slate-700/70 dark:text-slate-100/70"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm dark:bg-white/15 dark:text-white">
          {language.label}
        </span>
        <span>{language.region}</span>
      </motion.footer>
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
    </motion.article>
  );
}
