<div align="center">

![MJW Design](https://mjwdesign.ca/wp-content/uploads/2024/01/mjw-design-logo.png)

**Built with [MJW Design](https://mjwdesign.ca) — AI-Powered Development**

---

</div>

# MJW HFP Framing Calculator

A premium multi-step custom framing quote calculator for high-end framing professionals. It guides staff or customers through a structured five-step configuration flow — dimensions, matting, glass, frame selection, and final quote — with live pricing drawn from optional **PocketBase cloud pricing tables** and a built-in fallback pricing dataset for fully offline operation.

## Screenshots

| Step 1 — Dimensions | Final Quote Step |
| :---- | :---- |
| ![MJW HFP Framing Calculator dimensions step — placeholder](screenshots/step1-dimensions.png) | ![MJW HFP Framing Calculator final quote step — placeholder](screenshots/step5-quote.png) |

## What It Does

Unlike generic quoting spreadsheets, this calculator is purpose-built around the terminology and pricing logic that custom framing professionals already use.

| Step | Screen | Purpose |
| :---- | :---- | :---- |
| **1 — Dimensions** | Artwork size entry | Collects width and height of the piece to be framed. |
| **2 — Mat** | Mat board selection | Choose mat style, colour, and reveal dimensions. |
| **3 — Glass** | Glazing selection | Select standard, UV-protective, or conservation glazing. |
| **4 — Frame** | Moulding selection | Browse and select frame moulding with live pricing. |
| **5 — Quote** | Final summary | Displays itemised pricing, totals, and a printable quote. |

**Key interactions:**

- Progress through a clearly marked step indicator showing current and completed stages.
- Enter artwork dimensions to drive all downstream size-based price calculations.
- Select mat, glass, and frame options with live price updates at each step.
- Review a full itemised quote with line-item breakdown on the final step.
- Pricing data is loaded from PocketBase when configured, or falls back to the built-in pricing dataset automatically.

## How to Use

The calculator opens at Step 1 and walks the user forward through five sequential screens. Enter the artwork dimensions first, as all pricing calculations depend on them. Each subsequent step presents available options with current pricing. The final quote screen shows a complete itemised summary suitable for presenting to a customer or printing as a record.

The app is intentionally designed as a **desktop and tablet tool** for use at a framing counter or during a customer consultation, though it is fully responsive on smaller screens for reference use.

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

The app works fully with **no environment variables**. Without a PocketBase URL configured, it runs entirely in the browser using the built-in fallback pricing dataset defined in `src/data/fallbackPricing.ts`. No network connection or backend is required for local development or offline operation.

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

All environment variables are optional. The app is fully production-usable in local/offline mode with no configured variables.

| Variable | Required? | Scope | Enables | Description |
| :---- | :---- | :---- | :---- | :---- |
| `VITE_POCKETBASE_URL` | Optional | Frontend/public | Live cloud pricing tables | Public PocketBase/PocketHost URL used to fetch current mat, glass, and frame pricing. Example: `https://mjwdesign-core.pockethost.io`. When absent, the app uses fallback pricing automatically. |

## Pricing Data and PocketBase Cloud Pricing

The app works fully with **no environment variables**. In offline mode, all pricing is served from `src/data/fallbackPricing.ts`, which contains a complete static dataset for mat, glass, and frame options. This makes the calculator safe to deploy and use before PocketBase is configured.

Live pricing is optional. When `VITE_POCKETBASE_URL` is configured, the `usePricing` hook fetches current pricing records from PocketBase collections at startup. If the fetch fails for any reason, the app transparently falls back to the built-in dataset so the calculator remains usable.

### Recommended PocketBase Pricing Collections

Configure PocketBase collections to match the pricing categories used by the calculator. The `usePricing` hook expects to read records from collections covering mat options, glass options, and frame moulding options.

| Collection | Purpose | Key Fields |
| :---- | :---- | :---- |
| `mat_options` | Mat board styles and pricing | `name`, `description`, `price_per_unit`, `colour`, `active` |
| `glass_options` | Glazing types and pricing | `name`, `description`, `price_per_sqft`, `uv_protection`, `active` |
| `frame_options` | Moulding styles and pricing | `name`, `description`, `price_per_foot`, `material`, `active` |

Recommended collection rules should allow public read access so the calculator can fetch pricing without requiring user authentication. Write and delete rules should be restricted to authenticated admin users only.

## Project Structure

```
src/
  components/
    calculator/
      Step1Dimensions.tsx     # Artwork dimensions entry
      Step2Mat.tsx            # Mat board selection
      Step3Glass.tsx          # Glazing selection
      Step4Frame.tsx          # Frame moulding selection
      Step5Quote.tsx          # Final itemised quote display
      StepIndicator.tsx       # Multi-step progress indicator
  data/
    fallbackPricing.ts        # Static offline pricing dataset
  hooks/
    usePricing.ts             # PocketBase pricing fetch with fallback logic
  lib/
    pocketbase.ts             # Optional PocketBase client wrapper
  types/
    index.ts                  # Shared pricing and calculator types
  utils/
    pricing.ts                # Price calculation logic
  App.tsx                     # Root layout and step state management
  main.tsx                    # Entry point
```

## Changelog

### v0.1.0 — Initial Build

- Implemented five-step calculator flow: dimensions, mat, glass, frame, and final quote.
- Added step indicator component with current and completed state styling.
- Added live pricing fetch via `usePricing` hook with automatic fallback to static dataset.
- Added optional PocketBase integration for cloud-hosted pricing tables.
- Built complete itemised quote summary on the final step.
- Configured Tailwind CSS, TypeScript strict mode, and ESLint for production-quality development baseline.

---

Part of the **MJW Personal App Platform**.