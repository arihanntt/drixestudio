export function linkifyPricing(text: string) {
  return text.replace(
    /(pricing|price|cost|plans?)/gi,
    `<a href="/plans" class="text-violet-400 underline hover:text-violet-300">$1</a>`
  );
}