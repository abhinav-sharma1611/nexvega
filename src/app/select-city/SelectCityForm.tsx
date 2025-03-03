"use client";

import { useState } from "react";
import { selectCity } from "@/lib/actions";

type City = {
  id: string;
  name: string;
};

export default function SelectCityForm({ cities }: { cities: City[] }) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default page reload

    const formData = new FormData(event.currentTarget);
    const cityId = formData.get("cityId") as string;

    console.log("City selected (before server action):", cityId); // Debugging

    await selectCity(formData); // Calls the server action
    setSelectedCity(cityId); // Updates state

    console.log("City selected (after server action):", cityId); // Debugging
  }

  return (
    <form onSubmit={handleSubmit}>
      <select name="cityId" className="px-4 py-2 border rounded">
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <button type="submit" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
        Confirm Selection
      </button>
      {selectedCity && <p className="mt-4 text-green-600">You selected: {selectedCity}</p>}
    </form>
  );
}
