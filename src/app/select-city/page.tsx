import { PrismaClient } from "@prisma/client";
import SelectCityForm from "./SelectCityForm";

const prisma = new PrismaClient();

export default async function SelectCity() {
  // Fetch cities from the database
  const cities = await prisma.city.findMany();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Select a City</h1>
      <SelectCityForm cities={cities} />
    </main>
  );
}
