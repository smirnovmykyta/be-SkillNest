// Eigene Bereinigungsfunktion
function sanitize(input) {
  if (typeof input === "string") {
    // Entfernt $ und . Zeichen
    let sanitizedInput = input.replace(/[$.]/g, "");

    // Entfernt spezielle MongoDB-Operatoren
    const forbiddenPatterns = [
      /\$ne/g, // $ne Operator
      /\$eq/g, // $eq Operator
      /\$gt/g, // $gt Operator
      /\$gte/g, // $gte Operator
      /\$lt/g, // $lt Operator
      /\$lte/g, // $lte Operator
      /\$in/g, // $in Operator
      /\$nin/g, // $nin Operator
      /\$exists/g, // $exists Operator
      /\$regex/g, // $regex Operator
      /\$where/g, // $where Operator
      /\$expr/g, // $expr Operator
      /\$jsonSchema/g, // $jsonSchema Operator
      /\$mod/g, // $mod Operator
      /\$text/g, // $text Operator
      /\$geoWithin/g, // $geoWithin Operator
      /\$geoIntersects/g, // $geoIntersects Operator
      /\$near/g, // $near Operator
      /\$nearSphere/g, // $nearSphere Operator
      /\$all/g, // $all Operator
      /\$elemMatch/g, // $elemMatch Operator
      /\$size/g, // $size Operator
      /\$bitsAllClear/g, // $bitsAllClear Operator
      /\$bitsAllSet/g, // $bitsAllSet Operator
      /\$bitsAnyClear/g, // $bitsAnyClear Operator
      /\$bitsAnySet/g, // $bitsAnySet Operator
      /\$comment/g, // $comment Operator
    ];

    forbiddenPatterns.forEach((pattern) => {
      sanitizedInput = sanitizedInput.replace(pattern, "");
    });

    return sanitizedInput;
  }
  return input;
}

// Validierungsfunktion
function validateSearchString(searchString) {
  if (typeof searchString !== "string") {
    throw new Error("Suchstring muss eine Zeichenkette sein");
  }
  if (searchString.length === 0 || searchString.length > 100) {
    throw new Error("Suchstring muss zwischen 1 und 100 Zeichen lang sein");
  }
  // Erlaubte Zeichen: alphanumerische Zeichen, Leerzeichen, Bindestriche und Unterstriche
  const allowedPattern = /^[a-zA-Z0-9\s-_]+$/;
  if (!allowedPattern.test(searchString)) {
    throw new Error("Suchstring enthält unerlaubte Zeichen");
  }
}

export { sanitize, validateSearchString };
