const sanitizeString = (string = "") => string.replace(/\s+/g, " ").trim();

/* Pokemon names length
  Shortest => 4 
  Longest => 11
*/
const validateStringLength = (string, minLength = 4, maxLength = 11) =>
  string.length < minLength || string.length > maxLength;

module.exports = {
  sanitizeString,
  validateStringLength,
};
