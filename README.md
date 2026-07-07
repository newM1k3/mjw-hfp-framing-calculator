<div align="center">

![MJW Design](https://mjwdesign.ca/wp-content/uploads/2024/01/mjw-design-logo.png)

**Built with [MJW Design](https://mjwdesign.ca) — AI-Powered Development**

---

</div>

# MJW HFP Framing Calculator

A premium multi-step custom framing quote calculator for high-end framing professionals. It walks customers and staff through a guided, step-by-step process to configure dimensions, matting, glass, and frame options — then produces a complete, itemised quote. The app supports optional **PocketBase cloud-backed pricing data**, with graceful fallback to local pricing tables so the tool works fully offline or before a backend is configured.

## Screenshots

| Step 1 – Dimensions | Step 5 – Quote Summary |
| :---- | :---- |
| ![Step 1 Dimensions placeholder](screenshots/step1-dimensions.png) | ![Step 5 Quote Summary placeholder](screenshots/step5-quote.png) |

> *Screenshots above are placeholders. Replace with actual captures before publishing.*

## What It Does

Unlike generic spreadsheet estimators, this tool guides a user through every framing decision in the correct order, pricing each component in real time.

| Step | Screen | Purpose |
| :---- | :---- | :---- |
| **1** | Dimensions | Enter artwork width and height to establish the base opening size. |
| **2** | Mat Selection | Choose mat style, colour, and reveal width; calculates mat board area. |
| **3** | Glass Selection | Select glass type (clear, conservation, museum, etc.) for the opening size. |
| **4** | Frame Selection | Choose moulding profile and finish; calculates perimeter and join costs. |
| **5** | Quote | Displays a full itemised quote with sub-totals, labour, and a grand total. |

**Key interactions:**

- Progress through each step via a clear step indicator showing completed, active, and remaining stages.
- Navigate forward and back freely — earlier choices are preserved while later steps update reactively.
- Each step validates its own inputs before allowing the user to advance.
- The quote step displays a line-by-line breakdown and supports printing or saving the estimate.
- Pricing data is fetched live from PocketBase when configured, with automatic fallback to bundled pricing tables.

## How to Use

Open the app and enter the artwork dimensions in Step 1. Progress through each subsequent step to select matting, glass, and frame options. The step indicator at the top tracks your position and allows reviewed navigation. On the final Quote step, review the fully itemised estimate. On small screens the layout is readable for quote review, but detailed configuration is most comfortable on a tablet or desktop where all options are visible at once.

## Step Indicator

The `StepIndicator` component at the top of the calculator reflects the current position in the workflow. Completed steps display a check mark, the active step is highlighted, and future steps remain accessible for preview. Users can tap or click a completed step number to jump back and revise a choice without losing subsequent entries.

## Stack

| Layer | Technology |
| :---- | :---- |
| UI framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Optional cloud pricing | PocketBase |
| Hosting | Static / self-hosted |

## Local Development

```
npm install
```

```
npm run dev
```

The app works fully with **no environment variables**. Without a PocketBase URL configured, pricing is sourced entirely from the bundled `fallbackPricing.ts` tables, and no network requests are made. This ensures the calculator is immediately usable on any device.

## Quality Checks

```
npm run typecheck
```

```
npm run lint
```

```
npm run build
```

## Available Scripts

```
npm run dev        # Start development server (http://localhost:5173)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint check
npm run typecheck  # TypeScript type check (no emit)
```

## Environment Variables

All environment variables are optional unless you enable the related feature. The app remains fully production-usable in local-only mode with no configured variables.

| Variable | Required? | Scope | Enables | Description |
| :---- | :---- | :---- | :---- | :---- |
| `VITE_POCKETBASE_URL` | Optional | Frontend/public | Live pricing data from PocketBase | Public PocketBase/PocketHost URL used to fetch moulding, mat, and glass pricing collections. Example: `https://mjwdesign-core.pockethost.io`. When absent, the app uses bundled fallback pricing. |

## Pricing Data and PocketBase

The app works fully with **no environment variables**. In local-only mode, all mat, glass, and frame pricing is sourced from `src/data/fallbackPricing.ts`. This file is the source of truth for the offline experience and should be kept up to date with current trade pricing.

Live pricing is optional. When `VITE_POCKETBASE_URL` is configured, the `usePricing` hook fetches current pricing records from PocketBase at app load. If the fetch fails or the URL is absent, the hook automatically falls back to the local pricing tables without displaying an error to the end user.

### Recommended PocketBase Collections

Create collections in PocketBase to match the shape expected by `src/hooks/usePricing.ts` and `src/utils/pricing.ts`. A recommended minimal schema is outlined below.

**`frame_mouldings`**

| Field | Type | Notes |
| :---- | :---- | :---- |
| `name` | text | Display name for the moulding profile. |
| `finish` | text | e.g. `gold`, `black`, `natural`, `painted`. |
| `width_mm` | number | Moulding width in millimetres. |
| `price_per_metre` | number | Trade price per linear metre. |
| `active` | bool | Set to false to hide discontinued stock. |

**`mat_options`**

| Field | Type | Notes |
| :---- | :---- | :---- |
| `name` | text | Display name for the mat board. |
| `colour` | text | Colour description or hex reference. |
| `price_per_sqm` | number | Trade price per square metre. |
| `active` | bool | Hides discontinued boards when false. |

**`glass_options`**

| Field | Type | Notes |
| :---- | :---- | :---- |
| `name` | text | e.g. `Clear`, `Conservation`, `Museum UV`. |
| `price_per_sqm` | number | Trade price per square metre. |
| `active` | bool | Hides unavailable types when false. |

Recommended collection rules should allow public read access so the calculator can fetch pricing without requiring a customer login. Write access should be restricted to authenticated admin users only.

## Project Structure

```
src/
  components/
    calculator/
      Step1Dimensions.tsx     # Artwork size input and opening calculation
      Step2Mat.tsx            # Mat style, colour, and reveal selection
      Step3Glass.tsx          # Glass type selection for the opening
      Step4Frame.tsx          # Moulding profile and finish selection
      Step5Quote.tsx          # Itemised quote summary and print/save
      StepIndicator.tsx       # Progress indicator with step navigation
  data/
    fallbackPricing.ts        # Bundled offline pricing tables
  hooks/
    usePricing.ts             # Fetches live pricing from PocketBase with fallback
  lib/
    pocketbase.ts             # Optional PocketBase client wrapper
  types/
    index.ts                  # Shared calculator and pricing types
  utils/
    pricing.ts                # Pricing calculation logic (mat, glass, frame, labour)
  App.tsx                     # Root layout + step state management
  main.tsx                    # Entry point
  index.css                   # Tailwind base styles
public/
  screenshots/                # README screenshots
```

## Changelog

### v0.1.0 — Initial Build

- Implemented five-step guided calculator flow: dimensions, mat, glass, frame, and quote.
- Added real-time itemised pricing with sub-totals and grand total on the quote step.
- Added `usePricing` hook with live PocketBase fetch and automatic fallback to bundled pricing tables.
- Added `StepIndicator` with completed/active/pending states and back-navigation support.
- Added TypeScript types, ESLint configuration, Tailwind CSS styling, and Vite build pipeline.

---

Part of the **MJW Personal App Platform**.