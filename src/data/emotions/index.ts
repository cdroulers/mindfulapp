import good from "./good.json";
import neutral from "./neutral.json";
import bad from "./bad.json";
import { SupportedLanguage } from "../../locales/types";

interface JsonEmotion {
  code: string;
  name: {
    en: string;
    fr: string;
  };
}

export interface Emotion {
  code: string;
}

export interface Emotions {
  good: Emotion[];
  neutral: Emotion[];
  bad: Emotion[];
}

export function getEmotions(): Emotions {
  return {
    good: mapCode(good),
    neutral: mapCode(neutral),
    bad: mapCode(bad),
  };
}

export function getEmotionTranslation(lang: SupportedLanguage) {
  return {
    good: mapLang(good, lang),
    neutral: mapLang(neutral, lang),
    bad: mapLang(bad, lang),
  };
}

function mapLang(emotions: JsonEmotion[], lang: SupportedLanguage): Record<string, string> {
  return emotions.reduce(
    (p, v) => {
      p[v.code] = v.name[lang];
      return p;
    },
    {} as Record<string, string>
  );
}

function mapCode(emotions: JsonEmotion[]): Emotion[] {
  return emotions.map((x) => {
    return { code: x.code };
  });
}
