import { shuffleArray } from "~/utils";

export type CountryType = {
  cca2: string;
  name: {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string;
  tld: string[];
  currencies: Record<string, { name: string; symbol: string }>;
  languages: Record<string, string>;
  borders?: string[]; // Borders are optional
};

export async function getRandomCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = (await response.json()) as CountryType[];

  const shuffledCountries = shuffleArray(countries);
  const randomCountries = shuffledCountries.slice(0, 8);
  return randomCountries;
}

export async function getCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = (await response.json()) as CountryType[];
  const countries = data.slice(0, 8);
  return countries;
}

export async function getCountryByCode(cca2: string) {
  const response = await fetch("https://restcountries.com/v3.1/alpha/" + cca2);
  if (!response.ok) {
    throw new Error("Country not found");
  }

  const country = (await response.json()) as CountryType[];
  return country[0]; // Since we fetch by code, we expect a single result
}

export async function getFilteredCountries(query = "") {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = (await response.json()) as CountryType[];

  let filteredCountries = countries;

  if (query) {
    const searchQuery = query.toLowerCase();
    filteredCountries = filteredCountries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(searchQuery) ||
        country.name.official.toLowerCase().includes(searchQuery)
    );
  }
  return filteredCountries;
}
