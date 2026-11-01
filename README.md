# NutriTrack AI

<p align="center">
  <strong>A thoughtful, local-first nutrition and meal-planning companion.</strong><br>
  Track meals, understand your nutrition, and find ideas that fit your day.
</p>

<p align="center">
  <a href="https://karunyanandac.github.io/NutriTrack-AI/">Open the live app</a>
  ·
  <a href="https://github.com/karunyanandac/NutriTrack-AI/releases">View releases</a>
</p>

<p align="center">
  <a href="https://github.com/karunyanandac/NutriTrack-AI/actions/workflows/pages.yml"><img src="https://img.shields.io/github/actions/workflow/status/karunyanandac/NutriTrack-AI/pages.yml?branch=main&label=Pages%20deployment" alt="GitHub Pages deployment status"></a>
  <img src="https://img.shields.io/badge/build-no%20build%20step-2f835e" alt="No build step required">
  <img src="https://img.shields.io/badge/data-local%20to%20your%20browser-2f835e" alt="Data stays in your browser">
</p>

## About

NutriTrack AI is a responsive nutrition-tracking demo built with plain HTML, CSS, and JavaScript. It brings daily meal logging, estimated calorie and macro targets, Indian food ideas, meal planning, progress summaries, and a conversational local nutrition companion into one interface.

**[Try the live app →](https://karunyanandac.github.io/NutriTrack-AI/)**

## Features

- **Daily dashboard:** estimated calorie and macro targets, logged meals, water check-ins, and meal ideas.
- **Food logging:** Indian food catalogue, custom foods, editable portions, favorites, recent entries, and date-specific logs.
- **Meal planning:** recipe ideas, daily and weekly plans, portion adjustments, replacements, and categorized shopping lists.
- **Progress:** seven- and 30-day summaries, food-log charts, and weight check-ins.
- **Nutrition companion:** automatic suggestions based on local profile and meal data; interactive answers about today's totals, macros, and logged weekly averages.
- **Comfortable on mobile:** responsive layouts, light and dark themes, and touch-friendly navigation.
- **Local data controls:** edit your profile, export your data as JSON, or delete it from this browser.

## Get started

No package manager, dependencies, API keys, or build step are needed. Clone the repository and open `index.html` in a current browser. For local HTTP preview, run:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

GitHub Pages publishes the `main` branch through the **Publish NutriTrack AI** workflow. Pushes to `main` deploy automatically; the workflow can also be started manually from the repository's **Actions** tab. The public app is at [karunyanandac.github.io/NutriTrack-AI](https://karunyanandac.github.io/NutriTrack-AI/).

## Transparency, privacy, and health

This is a **local demo**, not a connected AI or clinical product.

- There is no configured sign-in, backend, cloud database, external nutrition service, live AI model, camera barcode service, or food-image recognition. The companion and recommendations use deterministic rules in the browser; chat messages remain in memory until the page reloads.
- Profile, planner, check-ins, and food logs are saved in this browser's `localStorage`. The app does not send them to a server, but browser-local storage is not encrypted or secure per-user storage. Anyone with access to this browser profile may be able to read it.
- Nutrition figures for foods and recipes are illustrative estimates. Barcode lookup uses a small sample catalogue. Food photos are previewed locally; any nutrition estimate must be entered by the user.
- Daily targets use Mifflin–St Jeor, an activity factor, an estimated goal adjustment, and a broad macro split. They are not individualized medical guidance. Logs may be incomplete, and targets should not be treated as requirements or a measure of success.
- This app does not verify allergens or cross-contamination. Check ingredient labels and consult a qualified healthcare professional for advice specific to your health.

**Do not use NutriTrack AI for diagnosis, treatment, or emergency decisions.** It is not a substitute for a registered dietitian or other qualified healthcare professional.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Application entry point and page metadata |
| `styles.css` | Responsive visual design and themes |
| `app.js` | Local app state, nutrition calculations, recommendations, and interactions |
| `.github/workflows/pages.yml` | GitHub Pages deployment |

## License

No license has been provided for this repository. Unless the author adds one, the source remains subject to standard copyright; public visibility does not grant permission to reuse it.
