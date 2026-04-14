# HFP Custom Framing Quote Calculator: Bolt.new Mini-Spec

This spec describes a standalone, customer-facing React application that allows users to calculate a custom framing quote based on dimensions, mat, frame, and glass selections.

## 1. Core Architecture

*   **Stack:** React, Vite, TypeScript, Tailwind CSS, `lucide-react`.
*   **Backend:** PocketBase (`https://mjwdesign-core.pockethost.io`).
*   **State Management:** React `useState` for the step-by-step form.
*   **Theme:** Clean, modern, light theme suitable for a photography and framing shop. Neutral grays, white cards, and a primary accent color (e.g., a tasteful blue or teal).

## 2. PocketBase Schema Requirements

Before building the frontend, Bolt needs to know the data structure. The app will fetch pricing data from a `framing_pricing` collection.

**Collection: `framing_pricing`**
*   `category` (text): e.g., "glass", "mat", "frame_wood", "frame_metal"
*   `name` (text): e.g., "Museum Glass", "Conservation Mat", "Standard Black Wood"
*   `price_per_united_inch` (number): The base multiplier for pricing.
*   `base_fee` (number): A flat fee added regardless of size.

*Note for Bolt: Implement a fallback hardcoded pricing array in the code in case the PocketBase fetch fails or the collection is empty during initial development.*

## 3. UI/UX: The Step-by-Step Calculator

The app should present a clean, wizard-like interface with the following steps:

### Step 1: Artwork Dimensions
*   Inputs for Width (inches) and Height (inches).
*   *Calculation:* United Inches (UI) = Width + Height. (This is the standard industry metric for framing pricing).

### Step 2: Mat Selection
*   Options: No Mat, Single Mat, Double Mat.
*   If Mat is selected, input for Mat Border Width (e.g., 2 inches).
*   *Calculation Update:* The new UI for the frame and glass will be (Artwork Width + (Mat Border * 2)) + (Artwork Height + (Mat Border * 2)).

### Step 3: Glass Selection
*   Radio cards for glass types:
    *   Standard Clear (Base price)
    *   Non-Glare (Premium)
    *   Conservation Clear (UV Protection)
    *   Museum Glass (Premium UV + Anti-Reflective)

### Step 4: Frame Style
*   Radio cards or a dropdown for frame categories (e.g., Standard Wood, Premium Wood, Metal).

### Step 5: Final Quote & Lead Capture
*   **The Quote Summary:** A clear breakdown showing the dimensions, selected options, and the Estimated Total Price.
*   *Disclaimer:* "This is an estimate. Final price may vary based on specific moulding selection and artwork condition."
*   **Lead Capture Form:**
    *   Name
    *   Email
    *   Phone (Optional)
    *   Notes (Textarea)
*   **CTA Button:** "Request This Frame"
    *   *Action:* Submits the order details to a `quote_requests` collection in PocketBase.

## 4. Pricing Logic (The Formula)

The total price is calculated as:
`Total = Base Fitting Fee + (Mat UI * Mat Price/UI) + (Glass UI * Glass Price/UI) + (Frame UI * Frame Price/UI)`

*Note: UI (United Inches) is calculated based on the outer dimensions at each layer.*

## 5. Execution Instructions for Bolt

1.  Initialize a new React/Vite project with Tailwind.
2.  Install `pocketbase` and `lucide-react`.
3.  Create the step-by-step wizard UI as described.
4.  Implement the pricing calculation logic (use hardcoded fallback prices if PB data is unavailable).
5.  Wire the final submission to save to a PocketBase collection named `quote_requests`.
6.  Ensure the design is clean, responsive, and mobile-friendly.
