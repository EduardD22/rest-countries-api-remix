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
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const meta: MetaFunction = () => {
  return [
    { title: "Where in the world?" },
    { name: "description", content: "Rest API project" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  const countries = q
    ? await getFilteredCountries(q)
    : await getRandomCountries();

  return json({ countries, q });
}

export default function Index() {
  const { q } = useLoaderData<typeof loader>();
  // the query now needs to be kept in state
  const [query, setQuery] = useState(q || "");
  const submit = useSubmit();

  // we still have a `useEffect` to synchronize the query
  // to the component state on back/forward button clicks
  useEffect(() => {
    setQuery(q || "");
  }, [q]);
  return (
    <>
      <Form
        className="mt-12"
        method="get"
        role="search"
        onChange={(event) => {
          const isFirstSearch = q === null;
          submit(event.currentTarget, {
            replace: !isFirstSearch,
          });
        }}
      >
        <div className="flex w-full max-w-sm items-center space-x-2 ">
          <Input
            className=" rounded-none bg-secondary"
            type="search"
            name="q"
            // synchronize user's input to component state
            onChange={(event) => setQuery(event.currentTarget.value)}
            defaultValue={query || ""}
            id="q"
            // switched to `value` from `defaultValue`
            value={query}
            placeholder="Search for a country..."
          />

          <Button type="submit" className="rounded-none">
            Search
          </Button>
        </div>
      </Form>
      <CountriesGrid />
    </>
  );
}
