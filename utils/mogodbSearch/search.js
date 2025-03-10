import mongoose from "mongoose";
import chalk from "chalk";
import { sanitize, validateSearchString } from "./sanitazition.js";

function validatedAndSanitized(searchString) {
  try {
    console.log(chalk.blue("Suche nach:", searchString));
    // Eigene Bereinigungsfunktion
    searchString = validateSearchString(searchString);
    searchString = sanitize(searchString);

    console.log(chalk.red("Bereinigter Suchstring:", searchString));
    return searchString;
  } catch (error) {
    console.log(
      chalk.red("Fehler bei der Validierung und Bereinigung:", error.message)
    );
    return null;
  }
}

async function searchDatabase(searchString) {
  const sanitizedSearchString = validatedAndSanitized(searchString);

  if (!sanitizedSearchString) {
    console.log(
      chalk.red("Ungültiger Suchstring. Suche wird nicht durchgeführt.")
    );
    return; // Beenden der Funktion, wenn der Suchstring ungültig ist
  }

  try {
    const db = mongoose.connection;
    const collection = db.collection("Advertisements"); // Ersetzen Sie 'yourCollectionName' durch den Namen Ihrer Sammlung

    // Erstellen Sie eine Suchabfrage
    const query = { $text: { $search: sanitizedSearchString } };

    // Führen Sie die Suche durch
    const results = await collection.find(query).toArray();

    console.log(chalk.green("Suchergebnisse:", results));
    return results;
  } catch (error) {
    console.log(chalk.red("Fehler bei der Suche:", error.message));
    return [];
  }
}

export { searchDatabase };
