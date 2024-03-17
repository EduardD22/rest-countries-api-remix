import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  getCountries,
  getFilteredCountries,
  getRandomCountries,
} from "~/api.server";
import { CountriesGrid } from "./resource.countries";

import { Form, useLoaderData, useSubmit } from "@remix-run/react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

export const meta: MetaFunction = () => {
  return [
    { title: "Where in the world?" },
    { name: "description", content: "Rest API project" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const region = url.searchParams.get("region");

  const isNoRegionSelected = !region || region === "All Regions";

  const countries =
    q || region
      ? await getFilteredCountries(q, isNoRegionSelected ? "" : region)
      : await getRandomCountries();

  return json({ countries, q, region });
}

export default function Index() {
  const { q, region } = useLoaderData<typeof loader>();
  const regions = [
    "Europe",
    "Oceania",
    "Africa",
    "Americas",
    "Antarctic",
    "Asia",
  ];

  const submit = useSubmit();

  return (
    <>
      <Form
        className="mt-12"
        method="get"
        role="search"
        onChange={(event) => {
          const isFirstSearch = q === "" && region === "";
          submit(event.currentTarget, {
            replace: !isFirstSearch,
          });
        }}
      >
        <div className="flex w-full max-w-sm items-center space-x-2 ">
          <Select name="region" defaultValue={region || ""}>
            <SelectTrigger className="rounded-none bg-secondary">
              <SelectValue placeholder="Filter by Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem>All Regions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            className=" rounded-none bg-secondary"
            type="search"
            name="q"
            defaultValue={q || ""}
            id="q"
            placeholder="Search for a country..."
          />
        </div>
      </Form>
      <CountriesGrid />
    </>
  );
}
