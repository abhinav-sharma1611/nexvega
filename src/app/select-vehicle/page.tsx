import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function SelectVehicle() {
  const vehicles = await prisma.vehicle.findMany();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Select a Vehicle</h1>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id} className="mt-2">
            <form action="/result">
              <button type="submit" name="vehicleId" value={vehicle.id} className="px-4 py-2 bg-gray-300 rounded">
                {vehicle.type} (Range: {vehicle.range} km)
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
