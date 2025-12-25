export function highlight(text: string, query: string) {
  if (!query) return text;

  const escapeRegExp = (str: string) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlight = (text: string) => {
  if (!query) return text;
  const safe = escapeRegExp(query);
  return text.replace(
    new RegExp(`(${safe})`, "gi"),
    `<mark class="bg-violet-500/30 rounded px-1">$1</mark>`
  );
};

}
