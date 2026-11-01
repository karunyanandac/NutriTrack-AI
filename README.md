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
- **Nutrition companion:** use the built-in local food catalogue for reference nutrition questions, or configure the optional OpenAI proxy for broader conversational answers with web search and source links. Daily nutrition context is opt-in.
- **Flexible calorie target:** adjust your daily goal in 100 kcal steps or set a personal 1,200–6,000 kcal target in your profile. Macro targets, daily progress, and meal suggestions update with your choice.
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

## Optional OpenAI assistant

The app works without accounts, API credentials, or a backend. To enable broader AI answers, deploy the included Cloudflare Worker as a private-key-holding proxy:

1. Create a Cloudflare account and install a current Node.js LTS release with npm. From the repository root, open a terminal in `worker` and authenticate Wrangler with `npx wrangler login`.
2. In `worker`, securely save your OpenAI API key as a Cloudflare Worker secret with `npx wrangler secret put OPENAI_API_KEY`. Enter the key only in Wrangler's terminal prompt; never put it in this repository, the browser, a URL, or chat. OpenAI API usage is billed separately from ChatGPT and may incur charges.
3. Deploy the Worker with `npx wrangler deploy`. The included configuration permits this GitHub Pages origin, `https://karunyanandac.github.io`, and local HTTP development on `localhost`/`127.0.0.1`. To add a different trusted app origin, edit `ALLOWED_ORIGINS` in `worker/wrangler.jsonc` before deploying.
4. In NutriTrack, open **Profile → Secure AI proxy URL**, enter the Worker URL followed by `/chat` (for example, `https://nutritrack-ai-proxy.<your-subdomain>.workers.dev/chat`), and save. Leave the field blank to use the local catalogue assistant.

For local development, run the app at `http://localhost:8000` and the Worker from `worker` with `npx wrangler dev`. Add `OPENAI_API_KEY=...` to an untracked `worker/.dev.vars` file for local Worker testing; that path is ignored by Git. Set the profile endpoint to `http://127.0.0.1:8787/chat`.

The Worker uses OpenAI's Responses API (`gpt-4.1-mini`) with web search, a 900-token answer limit, a 16 KB request limit, and a per-IP limit of 20 requests per hour. The IP limit helps control accidental use; it is **not authentication**. The Worker is publicly reachable, and CORS is not an access-control mechanism for non-browser clients. Set OpenAI usage limits, monitor billing, and disable or rotate the Worker secret if you suspect misuse. Do not deploy this public endpoint for sensitive or regulated data.

## Transparency, privacy, and health

- The default experience is local-first. Profile, planner, check-ins, food logs, assistant endpoint URL, and related data are saved in this browser's `localStorage`; they are not encrypted or securely isolated per user. Anyone with access to the browser profile may be able to read them.
- When the OpenAI endpoint is configured, each question and up to eight recent chat turns are sent to the Worker and OpenAI. The Worker does not log prompts or API secrets. Logged food names and nutrition totals are sent only when the user explicitly checks the assistant's **Include today's logged foods and nutrition totals** option. Do not enter sensitive personal identifiers.
- OpenAI answers and web sources can be incomplete, outdated, or wrong. Web search does not guarantee accuracy, and the assistant must not be used as a nutrition database, diagnosis, treatment, or emergency service. Verify food values against labels or reliable sources; serving size, brand, ingredients, and preparation all matter.
- Without an OpenAI endpoint, the companion and meal recommendations use deterministic rules and the small food/recipe catalogue in the browser; chat messages remain in memory until the page reloads. If a food is not in the catalogue, the companion says so rather than inventing nutrition facts.
- Nutrition figures for foods and recipes are illustrative estimates. Barcode lookup uses a small sample catalogue. Food photos are previewed locally; any nutrition estimate must be entered by the user.
- Automatically calculated daily targets use Mifflin–St Jeor, an activity factor, an estimated goal adjustment, and a broad macro split. You can instead enter a manual daily target from 1,200 to 6,000 kcal; this app cannot determine whether a target is appropriate for you, and derived macro targets are only a rough 25/45/30% split. Neither option is individualized medical guidance. Logs may be incomplete, and targets should not be treated as requirements or a measure of success.
- This app does not verify allergens or cross-contamination. Check ingredient labels and consult a qualified healthcare professional for advice specific to your health.

**Do not use NutriTrack AI for diagnosis, treatment, or emergency decisions.** It is not a substitute for a registered dietitian or other qualified healthcare professional.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Application entry point and page metadata |
| `styles.css` | Responsive visual design and themes |
| `app.js` | Local app state, nutrition calculations, recommendations, and interactions |
| `worker/src/index.js` | Optional OpenAI proxy, origin validation, input limits, and rate limiter |
| `worker/wrangler.jsonc` | Cloudflare Worker deployment configuration |
| `.github/workflows/pages.yml` | GitHub Pages deployment |

## License

No license has been provided for this repository. Unless the author adds one, the source remains subject to standard copyright; public visibility does not grant permission to reuse it.
