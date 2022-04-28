const express = require("express");
const router = express.Router();
const {
  pokeapiAxiosInstance,
  funtranslationsAxiosInstance,
} = require("../api");

const fetchPokemon = (url) => pokeapiAxiosInstance.get(url);

const fetchShakespeareTranslation = (url) =>
  funtranslationsAxiosInstance.post(url);

router.get("/pokemon/:name", async function (req, res, next) {
  // TODO: Fix following check on params
  if (!req.params.name || req.params.name.length < 2) {
    return res.status(400).send({ error: "Must provide a Pokemon name" });
  }
  const {
    params: { name: pokemonQuery },
  } = req;
  /* ! NOTE: Normally, I'd use try-catch blocks.
  I didn't go for this approach here because the request to `funtranslations.com` results in status 404 every single time */
  const pokemonData = await fetchPokemon(pokemonQuery).catch((err) =>
    console.log(
      "The following error occurred while fetching the pokemon: ",
      err
    )
  );
  // TODO: Grab random object in flavor_text_entries array
  const pokemonFlavorText =
    pokemonData?.data?.flavor_text_entries[1]?.flavor_text;

  const translationData = await fetchShakespeareTranslation(
    encodeURIComponent(pokemonFlavorText)
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
