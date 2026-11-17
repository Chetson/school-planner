export const safeParseJson = <T = unknown>(json: string): T | null => {
  try {
    return JSON.parse(json);
  } catch (err) {
    return null;
  }
};
