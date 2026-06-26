import { englishToIpa } from "../data/englishIpaDictionary";
import { wordOverrides } from "../data/wordOverrides";
import { convertIpaToFelipeonetica } from "./felipeoneticaConverter";

function cleanWord(word: string): string {
  return word
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

export function convertEnglishToFelipeonetica(text: string): string {
  return text
    .split(/(\s+|[.,!?;:])/)
    .map((part) => {
      const key = cleanWord(part);

      if (!key) {
        return part;
      }

      const override = wordOverrides[key];

      if (override) {
        return override;
      }

      const ipa = englishToIpa[key];

      if (!ipa) {
        return part;
      }

      return convertIpaToFelipeonetica(ipa);
    })
    .join("");
}