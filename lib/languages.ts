export type GreetingLanguage = {
  code: string;
  label: string;
  greeting: string;
  description: string;
  region: string;
};

export const languages: GreetingLanguage[] = [
  {
    code: "en",
    label: "English",
    greeting: "Hello",
    description: "Friendly and universal greeting used worldwide.",
    region: "Global",
  },
  {
    code: "es",
    label: "Español",
    greeting: "Hola",
    description: "Warm greeting from Spanish-speaking cultures.",
    region: "Spain & Latin America",
  },
  {
    code: "fr",
    label: "Français",
    greeting: "Bonjour",
    description: "Elegant greeting perfect for any occasion.",
    region: "France & Québec",
  },
  {
    code: "de",
    label: "Deutsch",
    greeting: "Hallo",
    description: "Confident hello from German-speaking regions.",
    region: "Germany & Austria",
  },
  {
    code: "jp",
    label: "日本語",
    greeting: "こんにちは",
    description: "Polite greeting for daytime meetings.",
    region: "Japan",
  },
  {
    code: "pt",
    label: "Português",
    greeting: "Olá",
    description: "Joyful greeting from Lusophone cultures.",
    region: "Portugal & Brazil",
  },
  {
    code: "hi",
    label: "हिन्दी",
    greeting: "नमस्ते",
    description: "Respectful greeting used across India.",
    region: "India",
  },
];

export const fallbackLanguage = languages[0];
