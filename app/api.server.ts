import { shuffleArray } from "~/utils";

type CountryType = {
  cca2: string;
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string;
};

export async function getRandomCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = (await response.json()) as CountryType[];

  const shuffledCountries = shuffleArray(countries);
  const randomCountries = shuffledCountries.slice(0, 8);
  return randomCountries;
}
