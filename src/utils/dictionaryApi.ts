export async function getIpaFromDictionaryApi(
  word: string
): Promise<string | null> {
  try {
    const cleanWord = word.toLowerCase().trim();

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    const phonetics = data?.[0]?.phonetics ?? [];

    const phoneticWithText = phonetics.find(
      (item: { text?: string }) => item.text
    );

    return phoneticWithText?.text ?? data?.[0]?.phonetic ?? null;
  } catch {
    return null;
  }
}