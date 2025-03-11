import { Router } from "express";
import { searchDatabase } from "../utils/mogodbSearch/search.js";

const searchRouter = Router();

searchRouter.get("/search", async (req, res) => {
  const searchString = req.query.q; // Annahme: Der Suchstring wird als Query-Parameter 'q' übergeben
  if (!searchString) {
    return res.status(400).json({ error: "Suchstring ist erforderlich" });
  }

  try {
    const results = await searchDatabase(searchString);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Fehler bei der Suche" });
  }
});

export default searchRouter;
