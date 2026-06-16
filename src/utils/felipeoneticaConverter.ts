import { ipaToFelipe } from "../data/phonemeRules";

const orderedPhonemes = Object.keys(ipaToFelipe).sort(
  (a, b) => b.length - a.length
);

export function convertIpaToFelipeonetica(
  ipaText: string
): string {
  let result = ipaText
    .replaceAll("/", "")
    .replaceAll("[", "")
    .replaceAll("]", "")
    .trim();

  for (const phoneme of orderedPhonemes) {
    result = result.split(phoneme).join(
      ipaToFelipe[phoneme]
    );
  }

  return result;
}