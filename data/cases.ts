export const demoCase = {
  id: "SO-2026-00184",
  status: "underReview",
  imaging: {
    studies: 1,
    series: 13,
    images: 612,
    size: "847 MB",
  },
} as const;

export const cases = [demoCase];

export const caseSteps = [
  { labelKey: "imagesReceived", state: "done" },
  { labelKey: "expertAssigned", state: "done" },
  { labelKey: "underReview", state: "active" },
  { labelKey: "reportPreparing", state: "next" },
  { labelKey: "completed", state: "next" },
] as const;
