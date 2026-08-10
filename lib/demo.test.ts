import { describe, expect, it } from "vitest";
import { demoAnalysis, SAMPLE_CONTENT } from "./demo";

describe("demoAnalysis", () => {
  it("returns a bounded score and useful outputs", () => {
    const result = demoAnalysis({ content: SAMPLE_CONTENT, audience: "Community members", language: "English", hasImage: true });
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.issues.some(issue => issue.severity === "high")).toBe(true);
    expect(result.accessibleRewrite.length).toBeGreaterThan(80);
  });

  it("does not flag missing alt text without an image", () => {
    const result = demoAnalysis({ content: SAMPLE_CONTENT, audience: "Customers", language: "English", hasImage: false });
    expect(result.issues.some(issue => issue.title.includes("alt text"))).toBe(false);
  });
});
