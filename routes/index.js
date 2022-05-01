const express = require("express");
const router = express.Router();
const { fetchPokemon, fetchShakespeareTranslation } = require("../api");
const {
  sanitizeString,
  validateStringLength,
  generateRandomNumber,
} = require("../utils/functions.js");

// REQUEST EXAMPLE => http://localhost:8080/pokemon/charizard
router.get("/pokemon/:name", async function (req, res, next) {
  const { name = "" } = req.params;

  if (!name || validateStringLength(name)) {
    return res
      .status(400)
      .json({ message: "Must provide a valid Pokemon name" });
  }
  const {
    params: { name: pokemonQuery },
  } = req;

  const pokemonData = await fetchPokemon(pokemonQuery.toLowerCase()).catch(
    (err) =>
      console.log(
        "The following error occurred while fetching the pokemon: ",
        err
      )
  );

  if (!pokemonData) {
    return res.status(404).json({
      message: "Ok, you gotta catch 'em all... But this Pokemon doesn't exist.",
    });
  }
  const pokemonFlavorText =
    pokemonData?.data?.flavor_text_entries[generateRandomNumber()]?.flavor_text;

  // Sanitize flavor_text before sending it over funtranslations.com
  const sanitizedPokemonFlavorText = sanitizeString(pokemonFlavorText);

  const translationData = await fetchShakespeareTranslation(
    encodeURIComponent(sanitizedPokemonFlavorText)
  ).catch((err) =>
    console.log(
      "The following error occurred while fetching the translation: ",
      err
    )
  );

  // Return translated description or the original one if the former is not available
  res.send({
    name: pokemonQuery,
    description:
      sanitizeString(translationData?.data?.contents?.translated) ||
      sanitizedPokemonFlavorText,
  });
});

module.exports = router;
