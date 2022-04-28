const axios = require("axios").default;

const pokeapiAxiosInstance = axios.create({
  baseURL: `https://pokeapi.co/api/v2/pokemon-species/`,
});

const funtranslationsAxiosInstance = axios.create({
  baseURL: `https://api.funtranslations.com/translate/shakespeare.json?text=`,
});

module.exports = {
  pokeapiAxiosInstance,
  funtranslationsAxiosInstance,
};
