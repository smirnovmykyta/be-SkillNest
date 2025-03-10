function sanitize(input) {
  if (typeof input === "string") {
    let sanitizedInput = input.replace(/[$.]/g, "");
    return sanitizedInput;
  }
  return input;
}

function validateSearchString(searchString) {
  if (typeof searchString !== "string") {
    throw new Error("Suchstring muss eine Zeichenkette sein");
  }
  if (searchString.length === 0 || searchString.length > 100) {
    throw new Error("Suchstring muss zwischen 1 und 100 Zeichen lang sein");
  }

  const allowedPattern = /^[a-zA-Z0-9\s-_]+$/;
  if (!allowedPattern.test(searchString)) {
    console.log(`Ungültige Zeichen im Suchstring gefunden: "${searchString}"`);
    return "";
  }
  return searchString;
}

export { sanitize, validateSearchString };
