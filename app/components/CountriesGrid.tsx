import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";

import { loader } from "~/routes/_layout._index";
import { shuffleArray } from "~/utils";

const CountriesGrid = () => {
  const { countries } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const fetchRandomCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    const shuffledCountries = shuffleArray(data);
    return shuffledCountries.slice(0, 8);
  };

  const handleSubmit = () => {
    fetcher.submit(fetchRandomCountries, { method: "GET" });
  };

  console.log(fetcher.data);

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleSubmit}
        disabled={fetcher.state !== "idle"}
      >
        {fetcher.state === "idle" ? "Get Random Countries" : "Fetching..."}
      </Button>

      {fetcher.data && Array.isArray(fetcher.data) && (
        <div className="grid place-items-center gap-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12">
          {fetcher.data.map((country) => {
            return (
              <Link
                key={country.cca2}
                to={`/${country.cca2}`}
                prefetch="intent"
              >
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
      )}

      {!fetcher.data && (
        <div className="grid place-items-center gap-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12">
          {countries.slice(0, 8).map((country) => {
            return (
              <Link
                key={country.cca2}
                to={`/${country.cca2}`}
                prefetch="intent"
              >
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
      )}
    </>
  );
};

export default CountriesGrid;
