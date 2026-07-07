<div align="center">

![MJW Design](https://mjwdesign.ca/wp-content/uploads/2024/01/mjw-design-logo.png)

**Built with [MJW Design](https://mjwdesign.ca) — AI-Powered Development**

---

</div>

# MJW HFP Framing Calculator

A premium multi-step custom framing quote calculator for professional framers and retail framing counters. It guides staff or customers through a structured five-step quoting workflow covering dimensions, mat selection, glass type, frame profile, and final quote summary — with optional **PocketBase cloud pricing** so live price tables can be updated without a code deployment.

## Screenshots

| Step 1 — Dimensions | Step 5 — Quote Summary |
| :---- | :---- |
| *(Placeholder: Step 1 dimensions entry screen)* | *(Placeholder: Step 5 final quote summary screen)* |

## What It Does

Unlike generic spreadsheet quoting tools, this calculator is built around the exact decision sequence a custom framing counter uses: measure first, then choose mats, glass, and frame profile, and finally review a fully priced quote.

| Step | Screen | Purpose |
| :---- | :---- | :---- |
| **1** | Dimensions | Enter artwork width and height to establish the base opening size. |
| **2** | Mat Selection | Choose mat board options; mat reveal and pricing calculated automatically. |
| **3** | Glass Type | Select glazing option (e.g. clear, conservation, museum); price updated per choice. |
| **4** | Frame Profile | Pick a moulding profile; per-foot pricing applied to the joined perimeter. |
| **5** | Quote Summary | View the fully itemised quote with line totals and a grand total. |

**Key features:**

- Guided five-step wizard with a visible step indicator throughout.
- Automatic price calculation as selections change at each step.
- Fallback local pricing data so the calculator works with no backend configured.
- Optional **PocketBase cloud pricing** so administrators can update price tables live.
- Clean, mobile-friendly layout suitable for use on a tablet at a framing counter.

## How to Use

Open the app and begin at Step 1 by entering the artwork dimensions. Progress through each step using the Next button; the step indicator at the top tracks position in the workflow. Each selection screen shows available options with pricing. On Step 5 the quote is fully itemised with line-item costs and a grand total, ready to present to a customer or capture for an order.

Because the calculator uses fallback pricing when no PocketBase instance is configured, it is immediately usable for demonstrations and staff training without any backend setup.

## Step Indicator

The `StepIndicator` component renders a persistent progress bar across all five steps. It shows completed, current, and upcoming steps so users always know how far through the quoting process they are.

## Stack

| Layer | Technology |
| :---- | :---- |
| UI framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Optional cloud pricing | PocketBase |
| Hosting | — |

## Local Development

```
npm install
```

```
npm run dev
```

The app works fully with **no environment variables**. Without a PocketBase URL configured, it runs entirely from the local fallback pricing data in `src/data/fallbackPricing.ts`, making it safe to use and demo before any backend is configured.

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

All environment variables are optional. The calculator remains fully usable in local-only mode with no configured variables.

| Variable | Required? | Scope | Enables | Description |
| :---- | :---- | :---- | :---- | :---- |
| `VITE_POCKETBASE_URL` | Optional | Frontend/public | PocketBase live pricing tables | Public PocketBase/PocketHost URL used to fetch up-to-date mat, glass, and frame pricing. Example: `https://mjwdesign-core.pockethost.io`. When absent, fallback pricing from `src/data/fallbackPricing.ts` is used automatically. |

## Fallback Pricing and PocketBase Cloud Pricing

The app ships with a complete set of fallback prices defined in `src/data/fallbackPricing.ts`. This means the calculator works out of the box for demos, staff training, and offline use without any backend.

Cloud pricing is optional. When `VITE_POCKETBASE_URL` is configured, the `usePricing` hook fetches live pricing records from PocketBase, replacing the fallback data. This allows pricing to be updated by an administrator in the PocketBase dashboard without touching code or triggering a redeployment.

### Recommended PocketBase Pricing Collections

Pricing collections should contain at minimum a name/label field and a price field. A recommended starting schema is shown below.

| Field | Type | Notes |
| :---- | :---- | :---- |
| `label` | text | Display name shown in the calculator UI. |
| `price` | number | Unit price used in quote calculations. |
| `unit` | text | Pricing unit, e.g. `per_foot`, `per_opening`, `flat`. |
| `active` | bool | When false, the option is hidden from the calculator. |
| `sort_order` | number | Controls display ordering within a step. |

Recommended collection rules should allow unauthenticated read access so the calculator can fetch pricing without requiring a user login. Write access should be restricted to authenticated administrators.

## Pricing Calculation Logic

The `src/utils/pricing.ts` module handles all quote arithmetic. Given the dimensions entered in Step 1, it computes:

- **Mat cost** — based on opening area or reveal, depending on mat type.
- **Glass cost** — flat or area-based rate for the selected glazing option.
- **Frame cost** — per-linear-foot rate applied to the joined perimeter (computed from width and height).
- **Line totals and grand total** — summed and surfaced in the Step 5 summary.

The `usePricing` hook in `src/hooks/usePricing.ts` abstracts the data source, returning either live PocketBase records or fallback data, so `pricing.ts` always receives a consistent pricing shape regardless of backend configuration.

## Project Structure

```
src/
  components/
    calculator/
      Step1Dimensions.tsx   # Artwork dimension entry
      Step2Mat.tsx          # Mat board selection
      Step3Glass.tsx        # Glazing type selection
      Step4Frame.tsx        # Frame profile selection
      Step5Quote.tsx        # Itemised quote summary
      StepIndicator.tsx     # Step progress indicator
  data/
    fallbackPricing.ts      # Local pricing used when PocketBase is absent
  hooks/
    usePricing.ts           # Data-source abstraction hook (PocketBase or fallback)
  lib/
    pocketbase.ts           # Optional PocketBase client wrapper
  types/
    index.ts                # Shared types for pricing, selections, and quote data
  utils/
    pricing.ts              # Quote calculation logic
  App.tsx                   # Root layout + wizard state management
  main.tsx                  # Entry point
```

## Changelog

### v0.1.0 — Initial Build

- Five-step quoting wizard covering dimensions, mat, glass, frame, and quote summary.
- Automatic per-step price calculation with itemised grand total in Step 5.
- Fallback pricing data for fully offline/no-backend operation.
- Optional PocketBase cloud pricing via `VITE_POCKETBASE_URL` environment variable.
- `usePricing` hook abstracting live vs. fallback data source.
- Mobile-friendly Tailwind layout suitable for tablet use at a framing counter.

---

Part of the **MJW Personal App Platform**.