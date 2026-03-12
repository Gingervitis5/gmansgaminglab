"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { backendClient } from "@/sanity/lib/backendClient";
import { Address } from "../sanity.types";

export interface NewAddressPayload {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  default?: boolean;
}

const ZIP_CODE_REGEX = /^\d{5}(-\d{4})?$/;

function validateAddressPayload(payload: NewAddressPayload) {
  if (!payload.name?.trim()) {
    throw new Error("Address name is required.");
  }
  if (!payload.address?.trim()) {
    throw new Error("Street address is required.");
  }
  if (!payload.city?.trim()) {
    throw new Error("City is required.");
  }

  const normalizedState = payload.state?.trim().toUpperCase();
  if (!normalizedState || normalizedState.length !== 2) {
    throw new Error("State must be a 2-letter code.");
  }

  const normalizedZip = payload.zip?.trim();
  if (!ZIP_CODE_REGEX.test(normalizedZip)) {
    throw new Error("ZIP Code must be in 12345 or 12345-6789 format.");
  }
}

export async function createAddress(payload: NewAddressPayload): Promise<Address> {
  validateAddressPayload(payload);

  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in to add an address.");
  }

  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ?? user?.emailAddresses?.[0]?.emailAddress;

  if (!email) {
    throw new Error("No email found for this account.");
  }

  const normalizedPayload = {
    name: payload.name.trim(),
    address: payload.address.trim(),
    city: payload.city.trim(),
    state: payload.state.trim().toUpperCase(),
    zip: payload.zip.trim(),
  };

  const existingAddressCount = await backendClient.fetch<number>(
    `count(*[_type == "address" && email == $email])`,
    { email }
  );

  const shouldBeDefault = Boolean(payload.default) || existingAddressCount === 0;

  if (shouldBeDefault) {
    const existingDefaults = await backendClient.fetch<Array<{ _id: string }>>(
      `*[_type == "address" && email == $email && default == true]{ _id }`,
      { email }
    );

    await Promise.all(
      existingDefaults.map((doc) =>
        backendClient.patch(doc._id).set({ default: false }).commit()
      )
    );
  }

  const createdAddress = await backendClient.create({
    _type: "address",
    ...normalizedPayload,
    email,
    default: shouldBeDefault,
    createdAt: new Date().toISOString(),
  });

  return createdAddress as Address;
}
