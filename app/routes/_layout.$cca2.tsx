import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { ArrowLeft } from "lucide-react";
import { json } from "react-router";
import { getCountryByCode } from "~/api.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const cca2 = params.cca2;
  if (!cca2) {
    throw new Error("Country code is required");
  }

  try {
    const country = await getCountryByCode(cca2);
    return json({ country });
  } catch (error) {
    throw json({ message: "Country not found" }, { status: 404 });
  }
}

const CountryDetails = () => {
  const { country } = useLoaderData<typeof loader>();

  return (
    <section className="mt-20">
      <Link to="/" prefetch="intent" className="flex gap-2 items-center mb-20">
        <Button variant="secondary">
          <span>
            <ArrowLeft />
          </span>
          Back
        </Button>
      </Link>

      <div className="grid place-items-center xl:grid-cols-2 gap-11">
        <div
          className=" h-[229px] w-[320px] lg:h-[401px] lg:w-[560px] bg-center bg-cover rounded-sm"
          style={{
            backgroundImage: `url(https://flagcdn.com/${country.cca2.toLowerCase()}.svg)`,
          }}
        ></div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="md:col-span-2">
            <h1 className=" text-2xl xl:text-3xl font-extrabold mb-4">
              {country.name.common}
            </h1>
          </div>
          <div>
            <p>
              <span className="font-bold">Native name: </span>
              {
                country.name.nativeName[Object.keys(country.name.nativeName)[0]]
                  .official
              }
            </p>
            <p>
              <span className="font-bold">Population: </span>
              {country.population.toLocaleString()}
            </p>
            <p>
              <span className="font-bold">Region: </span>
              {country.region}
            </p>
            <p>
              <span className="font-bold">Sub Region: </span>
              {country.subregion}
            </p>
            <p>
              <span className="font-bold">Capital: </span>
              {country.capital}
            </p>
          </div>
          <div>
            <p>
              <span className="font-bold">Top Level Domain: </span>
              {country.tld.join(", ")}
            </p>
            <p>
              <span className="font-bold">Currencies:</span>{" "}
              {Object.values(country.currencies).map(
                (currencyDetails, index, currencyArray) => (
                  <span key={currencyDetails.symbol}>
                    {currencyDetails.name}
                    {index !== currencyArray.length - 1 ? ", " : ""}
                  </span>
                )
              )}
            </p>
            <p>
              <span className="font-bold">Languages:</span>{" "}
              {Object.values(country.languages).join(", ")}
            </p>
          </div>
          <div className="md:col-span-2 mt-8">
            <p>
              <span className="font-bold">Border Countries:</span>{" "}
              {country.borders?.length > 0 ? (
                country.borders.map((borderCode: string) => (
                  <Badge
                    variant="outline"
                    key={borderCode}
                    className="rounded-none mr-1"
                  >
                    {borderCode}{" "}
                  </Badge>
                ))
              ) : (
                <span> None</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryDetails;
