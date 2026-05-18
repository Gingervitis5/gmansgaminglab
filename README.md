# Graham's Gaming Lab

An e-commerce storefront built with Next.js and Sanity for selling tabletop map packs and related digital products. The project includes a customer-facing shopping experience, authenticated user address management, Stripe checkout, email delivery, and a Sanity Studio admin interface.

## Key Features

- Next.js 16 application with React 19 and Tailwind CSS
- Sanity CMS content source for products, themes, categories, and more
- Stripe Checkout integration for payments and order fulfillment
- Clerk authentication for customer accounts and address management
- Resend email notifications for contact form messages and order delivery
- Sanity Studio available at `/studio` for managing product content and orders
- Custom checkout metadata including order number, customer name, email, clerk user ID, and shipping address

## Technology Stack

- `next` 16
- `react` 19
- `@clerk/nextjs` for authentication
- `sanity` + `next-sanity` for CMS operations
- `stripe` for payment processing
- `resend` for outbound email delivery
- `styled-components` and Tailwind CSS for styling
- `zustand` for client-side store management
- `@radix-ui/react-*` and `framer-motion` for UI components and animations

## Repository Structure

Important folders:

- `src/app` — Next.js app routes and pages
- `src/app/(client)` — client-facing pages like shop, contact, and checkout
- `src/sanity` — Sanity environment, schema, queries, and studio support
- `actions` — server actions for checkout and address creation
- `lib` — reusable server/client utilities such as Stripe and email helpers
- `store.ts` — cart and wishlist state management
- `public/images` — visual assets for products, themes, and marketing

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file with the required environment variables.
3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Sanity Studio

The project uses embedded Sanity Studio at `/studio`.

To run Sanity CLI commands with the configured project and dataset:

```bash
npm run typegen
```

This generates Sanity TypeScript definitions from the current schema.

## Required Environment Variables

### Next.js and application variables

- `NEXT_PUBLIC_BASE_URL` — Base URL of the application, used for checkout redirect URLs.
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project ID.
- `NEXT_PUBLIC_SANITY_DATASET` — Sanity dataset name.
- `NEXT_PUBLIC_SANITY_API_VERSION` — Sanity API version (default is `2025-12-08`).

### Sanity and backend variables

- `SANITY_API_TOKEN` — Token used for authenticated Sanity backend writes and studio access.

### Stripe variables

- `STRIPE_SECRET_KEY` — Secret key for creating checkout sessions and accessing Stripe APIs.
- `STRIPE_WEBHOOK_SECRET` — Webhook signing secret for Stripe event validation.

### Email and notification variables

- `RESEND_API_KEY` — API key for Resend email delivery.
- `ORDER_FROM_EMAIL` — Verified sender address for order-related emails.
- `SUPPORT_EMAIL` — Destination inbox for the contact page support messages.
- `CONTACT_FROM_EMAIL` — Optional sender override for contact form emails.

## Important Notes

- `ORDER_FROM_EMAIL` must be verified with your email provider before emails can be sent successfully.
- `SUPPORT_EMAIL` should be a valid inbox that receives contact and support requests.
- The checkout flow stores address data and Clerk user IDs as metadata on Stripe sessions.
- The app resolves the base URL from `NEXT_PUBLIC_BASE_URL` or defaults to `http://localhost:3000`.
- Customer address creation is protected by Clerk authentication and normalized to a valid US address format.

## Running the App

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server locally:

```bash
npm run start
```

Run linting:

```bash
npm run lint
```

## Deployment

This project can be deployed on Vercel or any platform that supports Next.js applications. Ensure all environment variables are configured in the deployment environment.

## Additional Resources

- `src/sanity/env.ts` — Sanity environment validation and variable loading
- `actions/createCheckoutSession.ts` — Stripe checkout session creation logic
- `actions/createAddress.ts` — Authenticated address creation with Sanity
- `sanity.config.ts` — Studio configuration and plugin setup

## Contact

If you need to update product data, use the Sanity Studio at `/studio`. For support email flow, verify `RESEND_API_KEY` and the configured sender/recipient addresses.
