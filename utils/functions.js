const sanitizeString = (string = "") =>
  string
    .replace(/\s+/g, " ")
    .replace(/(\r\n|\n|\r)/gm, "")
    .trim();

/* Pokemon names length
  Shortest => 4 
  Longest => 11
*/
const validateStringLength = (string, minLength = 4, maxLength = 11) =>
  string.length < minLength || string.length > maxLength;

const generateRandomNumber = (upperBound = 5) =>
  Math.round(Math.random() * upperBound);

module.exports = {
  sanitizeString,
  validateStringLength,
  generateRandomNumber,
};
