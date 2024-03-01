import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";

import CountriesGrid from "~/components/CountriesGrid";
import { shuffleArray } from "~/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Where in the world?" },
    { name: "description", content: "Rest API project" },
  ];
};

type CountryType = {
  cca2: string;
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string;
};
type LoaderDataType = {
  countries: CountryType[];
};
export async function loader({ request }: LoaderFunctionArgs) {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();

  const shuffledCountries = shuffleArray(countries);
  const randomCountries = shuffledCountries.slice(0, 8);
  return json({ countries: randomCountries } as LoaderDataType);
}

export default function Index() {
  return (
    <>
      <CountriesGrid />
    </>
  );
}
