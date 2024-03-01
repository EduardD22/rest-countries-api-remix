import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useCallback } from "react";

import { loader } from "~/routes/_layout._index";

const CountriesGrid = () => {
  const loaderData = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof loader>();

  // loader data will have initial countries
  // fetcher.data will have new countries
  const countries = fetcher.data?.countries ?? loaderData.countries;

  const getRandomCountries = () => fetcher.load("/?index");

  return (
    <>
      <Button
        variant="secondary"
        onClick={getRandomCountries}
        disabled={fetcher.state !== "idle"}
      >
        {fetcher.state === "idle" ? "Get Random Countries" : "Fetching..."}
      </Button>

      <div className="grid place-items-center gap-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12">
        {countries.map((country) => {
          return (
            <Link key={country.cca2} to={`/${country.cca2}`} prefetch="intent">
              <div className="glass h-[336px] w-[264px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div
                  className="h-[160px] w-full bg-center bg-cover"
                  style={{
                    backgroundImage: `url(https://flagcdn.com/${country.cca2.toLowerCase()}.svg)`,
                  }}
                ></div>
                <CardContent>
                  <CardTitle className=" mt-6 mb-4">
                    {country.name.common}
                  </CardTitle>
                  <p>
                    <span className=" font-bold">Population: </span>
                    {country.population.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-bold">Region: </span>
                    {country.region}
                  </p>
                  <p>
                    <span className="font-bold">Capital: </span>
                    {country.capital}
                  </p>
                </CardContent>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default CountriesGrid;
