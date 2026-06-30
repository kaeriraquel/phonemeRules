import { wordOverrides } from "../data/wordOverrides";
import { convertIpaToFelipeonetica } from "./felipeoneticaConverter";
import { getIpaFromDictionaryApi } from "./dictionaryApi";

export type ConversionResult = {
  text: string;
  foundWords: string[];
  missingWords: string[];
};

function cleanWord(word: string): string {
  return word.toLowerCase().replace(/[^a-z']/g, "");
}

function applyCapitalization(original: string, converted: string): string {
  if (original === original.toUpperCase()) {
    return converted.toUpperCase();
  }

  if (original[0] === original[0]?.toUpperCase()) {
    return converted.charAt(0).toUpperCase() + converted.slice(1);
  }

  return converted;
}

export async function convertTextWithApi(
  text: string
): Promise<ConversionResult> {
  const parts = text.split(/(\s+|[.,!?;:])/);
  const result: string[] = [];

  const foundWords = new Set<string>();
  const missingWords = new Set<string>();

  for (const part of parts) {
    const key = cleanWord(part);

    if (!key) {
      result.push(part);
      continue;
    }

    let converted = "";

    if (wordOverrides[key]) {
      converted = wordOverrides[key];
      foundWords.add(key);
    } else {
      const ipa = await getIpaFromDictionaryApi(key);

      if (!ipa) {
        result.push(part);
        missingWords.add(key);
        continue;
      }

      converted = convertIpaToFelipeonetica(ipa);
      foundWords.add(key);
    }

    result.push(applyCapitalization(part, converted));
  }

  return {
    text: result.join(""),
    foundWords: Array.from(foundWords),
    missingWords: Array.from(missingWords),
  };
}