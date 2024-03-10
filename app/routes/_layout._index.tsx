import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { getCountries, getRandomCountries } from "~/api.server";
import { CountriesGrid } from "./resource.countries";

export const meta: MetaFunction = () => {
  return [
    { title: "Where in the world?" },
    { name: "description", content: "Rest API project" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
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
