// Type declaration for the Google Analytics gtag function injected via index.html
declare function gtag(
  command: "config" | "event" | "js" | "set",
  targetId: string | Date,
  params?: Record<string, unknown>
): void;
