"use server";


import { PrismaClient } from "@prisma/client";

import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function checkFugitive(formData: FormData) {
  const cityId = formData.get("cityId") as string;
  const vehicleId = formData.get("vehicleId") as string;

  // Get city distance
  const city = await prisma.city.findUnique({ where: { id: cityId } });
  const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });

  if (!city || !vehicle) return { success: false, message: "Invalid selection" };

  // Ensure vehicle range is sufficient for round-trip
  if (vehicle.range < city.distance * 2) {
    return { success: false, message: "Vehicle doesn't have enough range!" };
  }

  // Randomly place the fugitive in one of the cities
  const fugitive = await prisma.fugitive.findFirst();

  if (fugitive?.cityId === cityId) {
    return { success: true, message: "Fugitive captured!" };
  } else {
    return { success: false, message: "Fugitive not found in this city." };
  }
}

export async function selectCity(formData: FormData) {
    const cityId = formData.get("cityId") as string;
  
    console.log("Server Action Triggered - City ID:", cityId); // Debugging
  
    // Simulating a delay for testing
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    revalidatePath("/select-city");
  }