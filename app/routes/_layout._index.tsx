import { json, type MetaFunction } from "@remix-run/node";
import { getRandomCountries } from "~/api.server";

import { CountriesGrid } from "~/routes/resource.countries";

export const meta: MetaFunction = () => {
  return [
    { title: "Where in the world?" },
    { name: "description", content: "Rest API project" },
  ];
};

export async function loader() {
  const countries = await getRandomCountries();
  return json({ countries });
}

export default function Index() {
  return (
    <>
      <CountriesGrid />
    </>
  );
}
