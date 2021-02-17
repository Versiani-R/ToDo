const sanitizeString = (str: string) => str.trim();
const sanitizeStrings = (strings: string[]) => strings.map(element => element.trim());

export { sanitizeString, sanitizeStrings };