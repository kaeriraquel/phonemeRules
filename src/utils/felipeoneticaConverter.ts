import { ipaToFelipe } from "../data/phonemeRules";

const orderedPhonemes = Object.keys(ipaToFelipe).sort(
  (a, b) => b.length - a.length
);

function cleanIpaText(ipaText: string): string {
  return ipaText
    .replaceAll("/", "")
    .replaceAll("[", "")
    .replaceAll("]", "")
    .replaceAll("ˈ", "")
    .replaceAll("ˌ", "")
    .replaceAll(".", "")
    .replaceAll("͡", "")
    .replaceAll("ᵊ", "ə")
    .trim();
}

export function convertIpaToFelipeonetica(ipaText: string): string {
  const ipa = cleanIpaText(ipaText);
  let result = "";
  let index = 0;

  while (index < ipa.length) {
    let matched = false;

    for (const phoneme of orderedPhonemes) {
      if (ipa.startsWith(phoneme, index)) {
        result += ipaToFelipe[phoneme];
        index += phoneme.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      result += ipa[index];
      index++;
    }
  }

  return result;
}