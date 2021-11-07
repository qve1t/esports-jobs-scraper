export const clearHtmlTags = (text: string) =>
  text
    .replace(/<li>/gi, " - ")
    .replace(/<\/li>/gi, "\n")
    .replace(/\//gi, "")
    .replace(/<p>/gi, "\n")
    .replace(/<h3>/gi, "\n")
    .replace(/<br>/gi, "\n")
    .replace(/<strong>/gi, "")
    .replace(/<ul>/gi, "");
