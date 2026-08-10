import type { Analysis, AnalyzeRequest } from "./types";

export const SAMPLE_CONTENT = `Join our Community Food Drive!

Let's come together to fight hunger in our neighborhood. Donate non-perishable foods between May 10–24 at any of our drop-off locations.

Most needed: canned goods, pasta, rice, peanut butter, and cereal.

Together, we can make a difference.`;

export function demoAnalysis(input: AnalyzeRequest): Analysis {
  const missingAlt = input.hasImage;
  return {
    score: missingAlt ? 78 : 84,
    summary: "Your message is welcoming, but a few changes will make it easier to understand and access.",
    issues: [
      ...(missingAlt ? [{ severity: "high" as const, title: "Image needs alt text", detail: "Describe the information or purpose communicated by the image." }] : []),
      { severity: "medium", title: "Date range may be unclear", detail: "Repeat the month and use plain language for the collection period." },
      { severity: "medium", title: "Call to action is incomplete", detail: "Tell readers exactly where to find a drop-off location." },
      { severity: "low", title: "Some sentences can be shorter", detail: "Short sentences reduce reading effort and help translation tools." },
    ],
    altText: "Volunteers sort canned food and pantry items into boxes at a neighborhood community food drive.",
    easyToRead: `Community Food Drive\n\nHelp provide food for people in our neighborhood.\n\nWhat to donate:\n• Canned food\n• Pasta and rice\n• Peanut butter\n• Cereal\n\nWhen: May 10 to May 24\nWhere: Find your nearest drop-off location on our website.`,
    accessibleRewrite: `Join our Community Food Drive\n\nHelp neighbors in our community by donating non-perishable food from May 10 to May 24.\n\nWe especially need canned goods, pasta, rice, peanut butter, and cereal.\n\nFind an accessible drop-off location on our website. If you need help or another way to donate, contact our team.`,
  };
}
