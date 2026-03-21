// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN;
if (!token){
  throw new Error("SANITY_API_READ_TOKEN is not set");
}
console.log("Secret key prefix:", process.env.CLERK_SECRET_KEY?.substring(0, 8));
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 30,
  },
});
