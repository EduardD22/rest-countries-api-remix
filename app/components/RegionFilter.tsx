import { Form } from "@remix-run/react";

const RegionFilter = () => {
  return (
    <Form method="get" reloadDocument>
      <select name="region">
        <option value="">All Regions</option>
        <option value="africa">Africa</option>
        <option value="americas">Americas</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </Form>
  );
};

export default RegionFilter;
