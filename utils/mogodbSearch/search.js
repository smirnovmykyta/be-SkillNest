import AdvertisementModel from "../../models/AdvertisementModel.js";
import chalk from "chalk";
import { sanitize, validateSearchString } from "./sanitazition.js";

function validatedAndSanitized(searchString) {
  try {
    if (!searchString || searchString.trim() === "") {
      return null;
    }

    searchString = validateSearchString(searchString);

    if (!searchString) {
      console.log(
        chalk.red("Fehler: Suchstring wurde durch Validierung entfernt!")
      );
      return null;
    }

    searchString = sanitize(searchString);

    if (!searchString || searchString.trim() === "") {
      console.log(
        chalk.red("Fehler: Suchstring wurde durch Bereinigung entfernt!")
      );
      return null;
    }

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
    return;
  }

  try {
    const query = {
      offer: { $regex: sanitizedSearchString, $options: "i" },
    };
    const results = await AdvertisementModel.find(query);

    return results;
  } catch (error) {
    console.log(chalk.red("Fehler bei der Suche:", error.message));
    return [];
  }
}

export { searchDatabase };
