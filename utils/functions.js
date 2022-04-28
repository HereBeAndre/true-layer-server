const sanitizeString = (string) => string.replace(/\s+/g, " ").trim();

module.exports = sanitizeString;
