# NutriTrack AI

A responsive, local-first nutrition and meal-planning app built with plain HTML, CSS, and JavaScript. No build step or package install is required: open `index.html` in a current browser.

## Publish on GitHub Pages

The `Publish NutriTrack AI` workflow deploys this static site on pushes to the `karunyanandac-nutritrack-ai-app` branch and can also be started manually in the repository's Actions tab. Enable GitHub Pages with the GitHub Actions source in the repository's **Settings → Pages** if it is not already enabled. The workflow summary shows the live site URL after its first successful deployment.

## What works

- Daily calorie and macro estimates, food logging, editable portions, custom meals, favorites, recent-food quick add, water check-ins, and date-specific logs.
- Indian foods, editable recipe ideas, daily/weekly meal planning, recipe replacement and portion adjustment, and ingredient-based shopping lists.
- Seven- and 30-day summaries, food-log charts, weight check-ins, profile preferences, dark mode, and local JSON export/deletion.
- A local sample barcode lookup. The photo panel previews an image locally and supports a manually entered nutrition estimate.

## Local-demo boundaries

This repository does not configure a sign-in provider, backend, database, external nutrition catalogue, camera barcode service, image-recognition model, or live AI assistant. The “AI” recommendations and companion tips are deterministic local rules, recipe and food nutrition values are illustrative estimates, and photo estimates must be entered by the user. The barcode field only looks up a few hard-coded sample codes. Do not treat this demo as a source of verified allergen or clinical nutrition information.

Data is saved in this browser's `localStorage`, without accounts, cloud sync, encryption, or secure per-user isolation. Other people with access to the same browser profile may be able to read it. Use the profile page to export or delete local data. No data leaves the browser through the app.

## Nutrition estimate

Calories use the Mifflin–St Jeor basal metabolic rate equation, an activity multiplier, and a goal adjustment of −400, 0, or +250 kcal; a 1,200 kcal floor is applied. The macro estimate divides calories into 25% protein, 45% carbohydrates, and 30% fat. When optional gender is not supplied, the equation uses a midpoint constant. These broad estimates are for general adult wellness only and are not medical advice.
