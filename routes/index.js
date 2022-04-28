const express = require("express");
const router = express.Router();
const { fetchPokemon, fetchShakespeareTranslation } = require("../api");
const sanitizeString = require("../utils/functions.js");

router.get("/pokemon/:name", async function (req, res, next) {
  // TODO: Fix following check on params
  if (!req.params.name || req.params.name.length < 2) {
    return res
      .status(400)
      .json({ message: "Must provide a valid Pokemon name" });
  }
  const {
    params: { name: pokemonQuery },
  } = req;

  const pokemonData = await fetchPokemon(pokemonQuery).catch((err) =>
    console.log(
      "The following error occurred while fetching the pokemon: ",
      err
    )
  );

  if (!pokemonData) {
    return res
      .status(404)
      .json({ message: "Seems like this Pokemon doesn't exist" });
  }
  // TODO: Grab random object in flavor_text_entries array
  const pokemonFlavorText =
    pokemonData?.data?.flavor_text_entries[1]?.flavor_text;

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
      translationData?.data?.contents?.translated || pokemonFlavorText,
  });
});

module.exports = router;
