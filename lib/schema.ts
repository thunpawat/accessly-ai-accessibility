import { z } from "zod";

export const requestSchema = z.object({
  content: z.string().trim().min(10).max(12000),
  audience: z.string().trim().min(1).max(80),
  language: z.string().trim().min(1).max(40),
  hasImage: z.boolean(),
});

export const analysisSchema = z.object({
  score: z.number().int().min(0).max(100),
  summary: z.string().min(1).max(500),
  issues: z.array(z.object({
    severity: z.enum(["high", "medium", "low"]),
    title: z.string().min(1).max(120),
    detail: z.string().min(1).max(300),
  })).min(1).max(8),
  altText: z.string().max(500),
  easyToRead: z.string().min(1).max(6000),
  accessibleRewrite: z.string().min(1).max(6000),
});
