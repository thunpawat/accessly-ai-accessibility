export type Severity = "high" | "medium" | "low";

export type Issue = {
  severity: Severity;
  title: string;
  detail: string;
};

export type Analysis = {
  score: number;
  summary: string;
  issues: Issue[];
  altText: string;
  easyToRead: string;
  accessibleRewrite: string;
};

export type AnalyzeRequest = {
  content: string;
  audience: string;
  language: string;
  hasImage: boolean;
};
