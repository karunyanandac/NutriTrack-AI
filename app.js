(() => {
  "use strict";

  const STORE_KEY = "nutritrack-ai-local-v1";
  const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const NAV = [
    { id: "dashboard", label: "Dashboard", icon: "⌂" },
    { id: "food-log", label: "Food log", icon: "◉" },
    { id: "planner", label: "Meal planner", icon: "▦" },
    { id: "progress", label: "Progress", icon: "↗" },
    { id: "profile", label: "Profile", icon: "♡" }
  ];

  const FOODS = [
    { id: "idli", name: "Idli", emoji: "🍘", category: "Breakfast", serving: "2 pieces · 120 g", calories: 116, protein: 4, carbs: 24, fat: 1, fiber: 2, sugar: 1, cuisine: "South Indian" },
    { id: "sambar", name: "Sambar", emoji: "🥣", category: "Lunch", serving: "1 cup · 200 ml", calories: 130, protein: 7, carbs: 19, fat: 3, fiber: 5, sugar: 4, cuisine: "South Indian" },
    { id: "masala-dosa", name: "Masala dosa", emoji: "🥞", category: "Breakfast", serving: "1 medium · 180 g", calories: 285, protein: 6, carbs: 43, fat: 10, fiber: 4, sugar: 3, cuisine: "South Indian" },
    { id: "upma", name: "Vegetable upma", emoji: "🥘", category: "Breakfast", serving: "1 bowl · 220 g", calories: 240, protein: 7, carbs: 39, fat: 7, fiber: 5, sugar: 4, cuisine: "South Indian" },
    { id: "poha", name: "Poha", emoji: "🍲", category: "Breakfast", serving: "1 bowl · 200 g", calories: 250, protein: 6, carbs: 43, fat: 7, fiber: 4, sugar: 3, cuisine: "Maharashtrian" },
    { id: "rice", name: "Steamed rice", emoji: "🍚", category: "Lunch", serving: "1 cup · 160 g", calories: 205, protein: 4, carbs: 45, fat: 0, fiber: 1, sugar: 0, cuisine: "Indian" },
    { id: "roti", name: "Whole wheat roti", emoji: "🫓", category: "Lunch", serving: "1 medium · 40 g", calories: 120, protein: 4, carbs: 21, fat: 3, fiber: 3, sugar: 1, cuisine: "Indian" },
    { id: "dal", name: "Toor dal", emoji: "🍛", category: "Lunch", serving: "1 cup · 200 g", calories: 198, protein: 12, carbs: 30, fat: 4, fiber: 8, sugar: 3, cuisine: "Indian" },
    { id: "palak-paneer", name: "Palak paneer", emoji: "🥬", category: "Dinner", serving: "1 bowl · 200 g", calories: 290, protein: 17, carbs: 13, fat: 19, fiber: 5, sugar: 4, cuisine: "North Indian" },
    { id: "paneer", name: "Paneer bhurji", emoji: "🧀", category: "Dinner", serving: "1 bowl · 180 g", calories: 320, protein: 22, carbs: 10, fat: 22, fiber: 2, sugar: 5, cuisine: "North Indian" },
    { id: "tofu", name: "Tofu stir-fry", emoji: "🥗", category: "Dinner", serving: "1 bowl · 220 g", calories: 250, protein: 21, carbs: 17, fat: 12, fiber: 6, sugar: 6, cuisine: "Indo-Chinese" },
    { id: "chicken", name: "Chicken curry", emoji: "🍗", category: "Dinner", serving: "1 bowl · 200 g", calories: 285, protein: 29, carbs: 10, fat: 14, fiber: 2, sugar: 4, cuisine: "North Indian" },
    { id: "fish", name: "Fish curry", emoji: "🐟", category: "Dinner", serving: "1 bowl · 200 g", calories: 240, protein: 28, carbs: 8, fat: 10, fiber: 2, sugar: 3, cuisine: "Coastal Indian" },
    { id: "egg", name: "Boiled egg", emoji: "🥚", category: "Snack", serving: "1 large · 50 g", calories: 78, protein: 6, carbs: 1, fat: 5, fiber: 0, sugar: 1, cuisine: "Indian" },
    { id: "curd", name: "Plain curd", emoji: "🥛", category: "Snack", serving: "1 cup · 200 g", calories: 122, protein: 7, carbs: 9, fat: 6, fiber: 0, sugar: 9, cuisine: "Indian" },
    { id: "banana", name: "Banana", emoji: "🍌", category: "Snack", serving: "1 medium · 118 g", calories: 105, protein: 1, carbs: 27, fat: 0, fiber: 3, sugar: 14, cuisine: "Fruit" },
    { id: "apple", name: "Apple", emoji: "🍎", category: "Snack", serving: "1 medium · 180 g", calories: 95, protein: 1, carbs: 25, fat: 0, fiber: 4, sugar: 19, cuisine: "Fruit" },
    { id: "almonds", name: "Almonds", emoji: "🥜", category: "Snack", serving: "15 almonds · 18 g", calories: 104, protein: 4, carbs: 4, fat: 9, fiber: 2, sugar: 1, cuisine: "Snack" },
    { id: "oats", name: "Oats porridge", emoji: "🥣", category: "Breakfast", serving: "1 bowl · 240 g", calories: 220, protein: 9, carbs: 35, fat: 6, fiber: 6, sugar: 5, cuisine: "Indian" },
    { id: "chana", name: "Chana masala", emoji: "🫘", category: "Lunch", serving: "1 cup · 200 g", calories: 270, protein: 14, carbs: 42, fat: 6, fiber: 12, sugar: 8, cuisine: "North Indian" }
  ];
  const FOOD_ALIASES = {
    "masala-dosa": ["dosa"],
    rice: ["rice", "cooked rice", "white rice", "basmati rice"],
    roti: ["chapati", "chapatis", "phulka", "phulkas"],
    dal: ["dal", "toor dal", "lentil dal"]
  };

  const RECIPES = [
    { id: "moong-chilla", name: "Moong dal chilla", emoji: "🥞", calories: 285, protein: 19, carbs: 34, fat: 8, fiber: 7, prep: 20, serving: "2 chillas", tags: ["Vegetarian", "High protein"], ingredients: ["1/2 cup soaked moong dal", "1/4 onion, finely chopped", "Ginger, cumin & coriander", "1 tsp oil"], instructions: ["Blend soaked dal with ginger and a little water.", "Fold in onion, cumin and chopped coriander.", "Cook thin pancakes on a warm pan with a little oil until golden on both sides."] },
    { id: "egg-bhurji", name: "Masala egg bhurji & roti", emoji: "🍳", calories: 370, protein: 25, carbs: 34, fat: 15, fiber: 5, prep: 18, serving: "2 eggs + 1 roti", tags: ["High protein"], ingredients: ["2 eggs", "1 tomato & 1/2 onion", "1 whole-wheat roti", "Turmeric, chilli & coriander"], instructions: ["Soften onion and tomato in a non-stick pan.", "Add spices and beaten eggs; stir gently until just set.", "Serve with a warm whole-wheat roti."] },
    { id: "chana-salad", name: "Chana cucumber salad", emoji: "🥗", calories: 310, protein: 16, carbs: 48, fat: 7, fiber: 12, prep: 12, serving: "1 generous bowl", tags: ["Vegan", "High fiber"], ingredients: ["3/4 cup cooked chickpeas", "1/2 cucumber & 1 tomato", "Lemon, cumin & fresh coriander", "Optional: diced red onion"], instructions: ["Rinse and drain cooked chickpeas.", "Dice the vegetables and toss with chickpeas.", "Season with lemon, cumin, coriander and a pinch of salt."] },
    { id: "curd-rice", name: "Cooling curd rice", emoji: "🍚", calories: 335, protein: 11, carbs: 57, fat: 8, fiber: 3, prep: 15, serving: "1 bowl", tags: ["Vegetarian", "South Indian"], ingredients: ["3/4 cup cooked rice", "1/2 cup plain curd", "1 tsp oil, mustard & curry leaves", "Pomegranate or cucumber, optional"], instructions: ["Let cooked rice cool slightly, then mix with curd.", "Temper mustard seeds and curry leaves in warm oil.", "Stir through and top with cucumber or pomegranate."] },
    { id: "paneer-tikka", name: "Paneer tikka bowl", emoji: "🧀", calories: 390, protein: 27, carbs: 24, fat: 22, fiber: 5, prep: 25, serving: "1 bowl", tags: ["Vegetarian", "High protein"], ingredients: ["120 g paneer", "1/2 bell pepper & onion", "2 tbsp thick curd", "Tikka spice, lemon & mint"], instructions: ["Coat paneer and vegetables in curd, tikka spice and lemon.", "Rest for 10 minutes, then grill or pan-sear until golden.", "Serve with mint and a side of crunchy vegetables."] },
    { id: "dal-palak", name: "Simple palak dal", emoji: "🍲", calories: 295, protein: 19, carbs: 44, fat: 6, fiber: 11, prep: 30, serving: "1 bowl", tags: ["Vegan", "High fiber"], ingredients: ["1/2 cup cooked toor or masoor dal", "1 cup chopped spinach", "Garlic, cumin & turmeric", "1 tsp oil"], instructions: ["Simmer cooked dal, spinach, turmeric and a splash of water.", "Warm oil, toast cumin and garlic until fragrant.", "Stir tempering into dal and season to taste."] },
    { id: "oats-upma", name: "Savory vegetable oats", emoji: "🥣", calories: 280, protein: 12, carbs: 43, fat: 8, fiber: 8, prep: 16, serving: "1 bowl", tags: ["Vegetarian", "High fiber"], ingredients: ["1/2 cup rolled oats", "1 cup mixed vegetables", "Mustard seeds & curry leaves", "Lemon and coriander"], instructions: ["Dry-toast oats briefly and set aside.", "Temper mustard and curry leaves; soften the vegetables.", "Add oats and water, simmer until tender, then finish with lemon."] },
    { id: "chicken-bowl", name: "Pepper chicken & veg", emoji: "🍗", calories: 410, protein: 38, carbs: 28, fat: 16, fiber: 6, prep: 25, serving: "1 bowl", tags: ["High protein"], ingredients: ["120 g chicken breast", "1 cup mixed vegetables", "Black pepper, garlic & lemon", "1/2 cup cooked rice"], instructions: ["Season chicken with pepper, garlic and lemon.", "Pan-cook until fully cooked, then rest before slicing.", "Serve over vegetables and rice."] }
  ];

  const BARCODE_DEMO = {
    "8906007280012": "curd",
    "8901058855223": "oats",
    "8901030872341": "almonds"
  };
  const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Snack"];
  const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const num = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
  const round = (value) => Math.round(num(value));
  const displayGrams = (value) => Number.isInteger(num(value)) ? String(num(value)) : num(value).toFixed(1);
  const newId = () => globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const pad = (value) => String(value).padStart(2, "0");
  const dateKey = (date = new Date()) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const shiftDate = (date, offset) => { const result = new Date(date); result.setDate(result.getDate() + offset); return result; };
  const prettyDate = (date) => new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric" }).format(date);
  const emptyDay = () => ({ meals: [], water: 0 });
  const DEFAULT_PROFILE = { name: "", age: 30, gender: "", height: 165, weight: 65, targetWeight: 60, activity: 1.4, goal: "lose", calorieGoal: 0, diet: "No preference", allergies: "", cuisine: "South Indian" };
  const defaultState = () => ({ profile: { ...DEFAULT_PROFILE }, theme: "light", entries: {}, planner: {}, favorites: [], savedRecipes: [], shoppingChecks: {}, weights: [], customFoods: [], aiEndpoint: "" });

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (!saved || typeof saved !== "object") return defaultState();
      return {
        ...defaultState(), ...saved,
        profile: { ...DEFAULT_PROFILE, ...(saved.profile || {}) },
        entries: saved.entries && typeof saved.entries === "object" ? saved.entries : {},
        planner: saved.planner && typeof saved.planner === "object" ? saved.planner : {},
        favorites: Array.isArray(saved.favorites) ? saved.favorites : [],
        savedRecipes: Array.isArray(saved.savedRecipes) ? saved.savedRecipes : [],
        shoppingChecks: saved.shoppingChecks && typeof saved.shoppingChecks === "object" ? saved.shoppingChecks : {},
        weights: Array.isArray(saved.weights) ? saved.weights : [],
        customFoods: Array.isArray(saved.customFoods) ? saved.customFoods.filter((food) => food && typeof food.id === "string" && food.id.startsWith("custom-") && typeof food.name === "string" && typeof food.serving === "string" && MEAL_TYPES.includes(food.category)).slice(0, 100).map((food) => ({ ...food, id: food.id.slice(0, 100), name: food.name.trim().slice(0, 80), serving: food.serving.trim().slice(0, 50), emoji: typeof food.emoji === "string" ? food.emoji : "🍽️", calories: Math.min(5000, Math.max(0, round(num(food.calories)))), protein: Math.min(500, Math.max(0, num(food.protein))), carbs: Math.min(500, Math.max(0, num(food.carbs))), fat: Math.min(500, Math.max(0, num(food.fat))), fiber: Math.min(500, Math.max(0, num(food.fiber))), sugar: Math.min(500, Math.max(0, num(food.sugar))), custom: true })) : [],
        aiEndpoint: typeof saved.aiEndpoint === "string" ? saved.aiEndpoint : ""
      };
    } catch (error) {
      console.error("Could not read local nutrition data.", error);
      return defaultState();
    }
  }

  let state = loadState();
  let activePage = "dashboard";
  let activeDate = new Date();
  let foodCategory = "All";
  let foodSearch = "";
  let progressPeriod = 7;
  let recipeShuffle = 0;
  let assistantMessages = [];
  let assistantRequestPending = false;
  let toastTimer;

  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      console.error("Could not save local nutrition data.", error);
      toast("Your browser couldn't save this change. Check available storage space.", true);
      return false;
    }
  }

  function dayFor(date = activeDate, source = state.entries) {
    const key = dateKey(date);
    if (!source[key]) source[key] = emptyDay();
    if (!Array.isArray(source[key].meals)) source[key].meals = [];
    source[key].water = Math.max(0, num(source[key].water));
    return source[key];
  }

  function totalsFor(date = activeDate) {
    const day = dayFor(date);
    return day.meals.reduce((sum, meal) => {
      ["calories", "protein", "carbs", "fat", "fiber", "sugar"].forEach((key) => { sum[key] += num(meal[key]); });
      return sum;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 });
  }

  function targets() {
    const profile = state.profile;
    const age = Math.max(15, Math.min(100, num(profile.age, 30)));
    const height = Math.max(100, Math.min(230, num(profile.height, 165)));
    const weight = Math.max(30, Math.min(300, num(profile.weight, 65)));
    const modifier = profile.gender === "male" ? 5 : profile.gender === "female" ? -161 : -78;
    const bmr = (10 * weight) + (6.25 * height) - (5 * age) + modifier;
    const base = bmr * num(profile.activity, 1.4);
    const adjustment = profile.goal === "lose" ? -400 : profile.goal === "gain" ? 250 : 0;
    const estimatedCalories = Math.max(1200, round(base + adjustment));
    const customGoal = num(profile.calorieGoal);
    const manual = customGoal >= 1200 && customGoal <= 6000;
    const calories = manual ? round(customGoal) : estimatedCalories;
    return { calories, estimatedCalories, manual, protein: round((calories * .25) / 4), carbs: round((calories * .45) / 4), fat: round((calories * .30) / 9), bmr: round(bmr), maintenance: round(base) };
  }

  function calorieGoalControlMarkup(goal) {
    return `<div class="calorie-goal-control"><span>Daily target <strong>${goal.calories} kcal</strong>${goal.manual ? " · personal" : " · estimate"}</span><div class="calorie-goal-buttons"><button class="secondary-button small-button" type="button" aria-label="Decrease calorie target by 100 kcal" data-action="adjust-calorie-goal" data-delta="-100" ${goal.calories <= 1200 ? "disabled" : ""}>− 100</button><button class="secondary-button small-button" type="button" aria-label="Increase calorie target by 100 kcal" data-action="adjust-calorie-goal" data-delta="100" ${goal.calories >= 6000 ? "disabled" : ""}>＋ 100</button></div></div>`;
  }

  function adjustCalorieGoal(delta) {
    const goal = targets();
    const next = Math.max(1200, Math.min(6000, goal.calories + num(delta)));
    if (next === goal.calories) return toast(`The daily target is already at the ${next.toLocaleString()} kcal ${next === 1200 ? "minimum" : "maximum"}.`, true);
    state.profile.calorieGoal = next;
    if (save()) {
      render();
      toast(`Daily calorie target adjusted to ${next.toLocaleString()} kcal.`);
    }
  }

  function showToast(message, error = false) {
    const root = $("#modal-root");
    const old = $(".toast", root);
    if (old) old.remove();
    const element = document.createElement("div");
    element.className = `toast${error ? " error" : ""}`;
    element.setAttribute("role", error ? "alert" : "status");
    element.textContent = message;
    root.append(element);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.remove(), 3300);
  }
  const toast = showToast;

  function render() {
    document.documentElement.dataset.theme = state.theme === "dark" ? "dark" : "light";
    const title = NAV.find((item) => item.id === activePage)?.label || "Dashboard";
    $("#app").innerHTML = `
      <aside class="sidebar">
        <div class="brand"><div class="brand-mark">✳</div><div class="brand-name">NutriTrack <span>AI</span></div></div>
        <p class="nav-label">Workspace</p>
        ${navMarkup("sidebar")}
        <div class="sidebar-spacer"></div>
        <div class="privacy-card"><div class="privacy-icon">◈</div><strong>Private by design</strong><p>Your demo profile stays in this browser. No account, cloud sync, or health-data server is configured.</p></div>
        <div class="profile-mini"><div class="avatar">${esc(initials())}</div><div class="profile-mini-copy"><strong>${esc(state.profile.name || "Your profile")}</strong><span>Personal nutrition</span></div><button class="icon-plain" aria-label="Open profile" data-action="navigate" data-page="profile">⚙</button></div>
      </aside>
      <div class="main-area">
        <header class="topbar"><div><div class="topbar-date">${esc(prettyDate(activeDate))}</div><div class="topbar-title">${esc(title)}</div></div>
          <div class="topbar-actions"><button class="icon-button" aria-label="Open nutrition companion" title="Ask your nutrition companion" data-action="assistant">✳</button><button class="icon-button" aria-label="Toggle dark mode" data-action="theme">${state.theme === "dark" ? "☀" : "☾"}</button><button class="primary-button" data-action="add-food"><span>＋</span> Log food</button></div>
        </header>
        <main class="content">${renderPage()}</main>
      </div>
      ${navMarkup("mobile-nav")}
      <button class="assistant-fab" data-action="assistant" aria-label="Chat with your nutrition companion" title="Chat with your nutrition companion"><span>✳</span><span class="assistant-fab-label">Ask Nutri</span></button>
    `;
  }

  function navMarkup(className) {
    return `<nav class="${className}" aria-label="Main navigation">${NAV.map((item) => `<button class="nav-item ${activePage === item.id ? "active" : ""}" data-action="navigate" data-page="${item.id}" aria-current="${activePage === item.id ? "page" : "false"}"><span class="nav-icon">${item.icon}</span><span>${item.label}</span></button>`).join("")}</nav>`;
  }

  function initials() {
    return (state.profile.name || "Y").trim().split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toUpperCase();
  }

  function renderPage() {
    if (activePage === "food-log") return renderFoodLog();
    if (activePage === "planner") return renderPlanner();
    if (activePage === "progress") return renderProgress();
    if (activePage === "profile") return renderProfile();
    return renderDashboard();
  }

  function heading(title, description, actions = "") {
    return `<div class="page-heading"><div><h1>${title}</h1><p>${description}</p></div><div class="heading-actions">${actions}</div></div>`;
  }

  function greeting() {
    const hour = new Date().getHours();
    return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  }

  function renderDashboard() {
    const t = totalsFor();
    const goal = targets();
    const day = dayFor();
    const remaining = goal.calories - t.calories;
    const ratio = Math.min(1, Math.max(0, t.calories / goal.calories));
    const mealsHtml = day.meals.length ? day.meals.slice().reverse().map((meal) => mealRow(meal, true)).join("") : `<div class="empty-state"><span class="empty-state-icon">🥗</span><strong>Your day, one meal at a time</strong><p>Log your first meal to start your daily nutrition picture.</p><button class="secondary-button small-button" data-action="add-food">Log a meal</button></div>`;
    const rec = recommendedRecipe(Math.max(0, remaining), t, goal);
    const recommendationHtml = rec ? recipeInline(rec, true) : `<div class="empty-state"><span class="empty-state-icon">🌿</span><strong>You're all set for today</strong><p>There isn't a suggested meal that fits the calories remaining. You can still browse all recipes in your planner.</p><button class="ghost-button small-button" data-action="navigate" data-page="planner">Explore meal planner →</button></div>`;
    const coach = coachCopy(t, goal, remaining);
    const welcome = state.profile.name ? "" : `<div class="welcome-banner"><p><strong>Start with your profile.</strong> Add a few basics for a more useful daily target. Estimates are for general wellness, not medical care.</p><button class="secondary-button small-button" data-action="navigate" data-page="profile">Set up profile →</button></div>`;
    return `${welcome}${heading(`${greeting()}${state.profile.name ? `, ${esc(state.profile.name.split(" ")[0])}` : ""} 👋`, `Here's your nutrition snapshot for ${esc(prettyDate(activeDate))}.`, `<button class="secondary-button small-button" data-action="pick-date">◷ ${esc(prettyDate(activeDate).split(",")[0])}</button>`)}
      <div class="grid dashboard-grid">
        <section class="card calorie-card"><div class="calorie-main"><div>
          <div class="eyebrow">Daily energy</div><h2 class="card-title">Calories</h2>
          <div class="calorie-stats"><div><span class="stat-label">Eaten</span><span class="stat-value">${round(t.calories)} <small>kcal</small></span></div><div><span class="stat-label">${remaining >= 0 ? "Remaining" : "Over goal"}</span><span class="stat-value">${Math.abs(round(remaining))} <small>kcal</small></span></div></div>
        </div><div class="ring-wrap"><svg class="ring" viewBox="0 0 100 100" aria-label="${round(ratio * 100)} percent of calorie goal"><circle class="ring-track" cx="50" cy="50" r="42"></circle><circle class="ring-value" cx="50" cy="50" r="42" stroke-dasharray="264" stroke-dashoffset="${264 * (1 - ratio)}"></circle></svg><div class="ring-label"><span class="ring-number">${round(ratio * 100)}%</span><span class="ring-unit">of daily goal</span></div></div>
        </div><div class="calorie-insight"><strong>${remaining >= 0 ? `${round(remaining)} kcal to go` : `${Math.abs(round(remaining))} kcal over target`}</strong>${goal.manual ? `Your personal target is ${goal.calories} kcal. Adjust it here or in your profile.` : remaining >= 0 ? "Targets are estimates. A flexible, balanced day matters more than a perfect number." : "One day is just one day. Return to your usual routine at your next meal."}${calorieGoalControlMarkup(goal)}</div></section>
        <section class="card macro-card">${cardTitle("Macros", goal.manual ? "Targets scaled from your manual calorie goal" : "Progress toward today's estimated targets")}<div>${macroLine("Protein", t.protein, goal.protein, "#e9914c")}${macroLine("Carbohydrates", t.carbs, goal.carbs, "#6a9cdb")}${macroLine("Fat", t.fat, goal.fat, "#a48ad4")}</div><div class="macro-footer"><span>Fiber <strong>${round(t.fiber)} g</strong></span><span>Sugar <strong>${round(t.sugar)} g</strong></span><span>Targets <strong>${goal.manual ? "personal" : "estimated"}</strong></span></div></section>
        <section class="card meals-card">${cardTitle("Today's meals", `${day.meals.length} ${day.meals.length === 1 ? "entry" : "entries"}`, `<button class="card-link" data-action="navigate" data-page="food-log">View food log →</button>`)}${mealsHtml}</section>
        <section class="card water-card">${cardTitle("Water", "A gentle nudge to stay hydrated")}<div class="water-summary"><strong>${(day.water / 1000).toFixed(1)} L</strong><span>/ 2.0 L personal reminder</span></div><div class="progress-track"><div class="progress-fill" style="width:${Math.min(100, day.water / 20)}%;--macro-color:#6a9cdb"></div></div><div class="water-glasses">${Array.from({ length: 8 }, (_, i) => `<div class="water-glass ${day.water >= (i + 1) * 250 ? "filled" : ""}" aria-label="${day.water >= (i + 1) * 250 ? "Water logged" : "Water not logged"}">♧</div>`).join("")}</div><div class="water-footer"><button class="secondary-button small-button" data-action="water" data-amount="-250" ${day.water <= 0 ? "disabled" : ""}>− 250 ml</button><button class="secondary-button small-button" data-action="water" data-amount="250">＋ 250 ml</button></div></section>
        <section class="card recommend-card">${cardTitle("A meal idea for you", rec ? `Fits your remaining ${round(Math.max(0, remaining))} kcal` : "Based on what is left in your day", `<button class="card-link" data-action="navigate" data-page="planner">All recipes →</button>`)}${recommendationHtml}</section>
        <section class="card coach-card">${cardTitle("Your nutrition companion", `<span class="coach-badge">✳ On-device insights</span>`)}<p class="coach-message">${esc(coach)}</p>${assistantInsightsMarkup()}<p class="disclaimer">These on-device suggestions use your food log and estimates—not medical advice.</p><button class="primary-button small-button" data-action="assistant">Ask Nutri a question →</button></section>
      </div>`;
  }

  function cardTitle(title, subtitle = "", action = "") {
    return `<div class="card-title-row"><div><h2 class="card-title">${title}</h2><p class="card-subtitle">${subtitle}</p></div>${action}</div>`;
  }

  function macroLine(name, value, target, color) {
    const percent = target > 0 ? Math.min(100, Math.max(0, value / target * 100)) : 0;
    return `<div class="macro-item"><div class="macro-head"><span class="macro-name"><i class="macro-dot" style="--macro-color:${color}"></i>${name}</span><span class="macro-count">${round(value)} <span class="macro-count">/ ${round(target)} g</span></span></div><div class="progress-track"><div class="progress-fill" style="width:${percent}%;--macro-color:${color}"></div></div></div>`;
  }

  function mealRow(meal, controls = false) {
    return `<div class="meal-row"><div class="meal-emoji">${esc(meal.emoji || "🍽️")}</div><div class="meal-copy"><strong>${esc(meal.name)}</strong><span>${esc(meal.mealType || "Snack")} · ${round(meal.protein)}g protein · ${round(meal.carbs)}g carbs · ${round(meal.fat)}g fat</span></div><span class="meal-kcal">${round(meal.calories)} kcal</span>${controls ? `<div class="meal-actions"><button class="icon-plain" aria-label="Edit ${esc(meal.name)}" data-action="edit-meal" data-id="${esc(meal.id)}">✎</button><button class="icon-plain" aria-label="Delete ${esc(meal.name)}" data-action="delete-meal" data-id="${esc(meal.id)}">×</button></div>` : ""}</div>`;
  }

  function recipeInline(recipe, canAdd = false) {
    return `<div class="recipe-card"><div class="recipe-emoji">${esc(recipe.emoji)}</div><div class="recipe-copy"><strong>${esc(recipe.name)}</strong><p>${esc(recipe.tags.join(" · "))} · ${esc(recipe.serving)} · ${recipe.prep} min</p><div class="recipe-meta"><span>${recipe.calories} kcal</span><span>${recipe.protein}g protein</span><span>${recipe.carbs}g carbs</span></div><button class="ghost-button small-button" data-action="recipe-details" data-id="${esc(recipe.id)}">See ingredients & steps</button>${canAdd ? `<button class="primary-button small-button" data-action="add-recipe-log" data-id="${esc(recipe.id)}">Add to food log</button>` : ""}</div></div>`;
  }

  function recommendedRecipe(remaining, totals, goal) {
    if (!remaining || remaining < 100) return null;
    const candidates = RECIPES.filter((recipe) => recipe.calories <= remaining && !dietExcluded(recipe));
    if (!candidates.length) return null;
    const pLeft = Math.max(0, goal.protein - totals.protein);
    const cLeft = Math.max(0, goal.carbs - totals.carbs);
    const fLeft = Math.max(0, goal.fat - totals.fat);
    return candidates.sort((a, b) => {
      const score = (recipe) => Math.min(recipe.protein, pLeft) * 2 + Math.min(recipe.carbs, cLeft) * .35 + Math.min(recipe.fat, fLeft) * .5 - Math.abs(remaining - recipe.calories) * .04 + cuisineBonus(recipe);
      return score(b) - score(a);
    })[0];
  }

  function cuisineBonus(recipe) {
    const cuisine = state.profile.cuisine.toLowerCase();
    const matches = {
      "south indian": ["curd-rice", "oats-upma", "moong-chilla"],
      "north indian": ["egg-bhurji", "chana-salad", "paneer-tikka", "dal-palak"],
      punjabi: ["egg-bhurji", "paneer-tikka", "dal-palak"],
      maharashtrian: ["moong-chilla", "oats-upma", "chana-salad"],
      gujarati: ["moong-chilla", "dal-palak", "chana-salad"],
      bengali: ["chana-salad", "dal-palak", "egg-bhurji"],
      "coastal indian": ["curd-rice", "chana-salad"]
    };
    return matches[cuisine]?.includes(recipe.id) ? 18 : 0;
  }

  function dietExcluded(recipe) {
    const diet = state.profile.diet.toLowerCase();
    const ingredients = recipe.ingredients.join(" ").toLowerCase();
    const contains = (pattern) => pattern.test(ingredients);
    if ((diet.includes("vegan") && contains(/\b(eggs?|paneer|curds?|milk|ghee|cheeses?|yogurts?|chickens?|fish|meats?)\b/)) ||
        (diet.includes("vegetarian") && contains(/\b(chicken|fish|meat)\b/)) ||
        (diet.includes("pescatarian") && contains(/\b(chicken|meat)\b/)) ||
        (diet.includes("eggetarian") && contains(/\b(chicken|fish|meat)\b/))) return true;
    return state.profile.allergies.toLowerCase().split(/[,;]/).map((word) => word.trim()).filter(Boolean).some((allergy) => {
      const patterns = {
        dairy: /\b(cur(d|ds)|paneer|milk|ghee|yogurt|yoghurt|cheese)\b/,
        milk: /\b(cur(d|ds)|paneer|milk|ghee|yogurt|yoghurt|cheese)\b/,
        egg: /\beggs?\b/,
        eggs: /\beggs?\b/,
        gluten: /\b(wheat|roti|flour|bread)\b/,
        wheat: /\b(wheat|roti|flour|bread)\b/,
        chickpea: /\b(chickpeas?|chana)\b/,
        chana: /\b(chickpeas?|chana)\b/,
        nuts: /\b(nuts?|almonds?|cashews?|peanuts?)\b/,
        peanut: /\bpeanuts?\b/,
        soy: /\bsoy\b/,
        fish: /\bfish\b/,
        chicken: /\bchicken\b/
      };
      return (patterns[allergy] || null)?.test(ingredients) ?? ingredients.includes(allergy);
    });
  }

  function coachCopy(totals, goal, remaining) {
    if (totals.calories === 0) return "A steady start beats a perfect start. Log what you eat when it works for you—there's no need to change your routine to begin.";
    const p = goal.protein ? totals.protein / goal.protein : 0;
    const f = goal.fat ? totals.fat / goal.fat : 0;
    if (p < .5 && totals.calories > goal.calories * .45) return `Protein is still a little behind your ${goal.manual ? "daily" : "estimated"} target. If it suits your preferences, dal, curd, tofu, paneer, eggs or chicken could be an easy addition.`;
    if (remaining > goal.calories * .4) return "You have room for another meal or snack. Pair a familiar staple with a protein source and some vegetables for a satisfying plate.";
    if (f > 1.1) return "You've reached your estimated fat target. That's an estimate, not a limit—try focusing on a satisfying meal that matches your hunger.";
    return "Nice work checking in with yourself. Variety across meals matters; a colorful vegetable, fruit or pulse can add useful fiber and micronutrients.";
  }

  function assistantInsightsMarkup() {
    const totals = totalsFor();
    const goal = targets();
    const remaining = goal.calories - totals.calories;
    const day = dayFor();
    const insights = [];

    if (!state.profile.name) {
      insights.push({ title: "Personalize your estimates", text: "A few profile details help make your daily targets more relevant.", action: "navigate", page: "profile", label: "Set up profile" });
    }
    if (!day.meals.length) {
      insights.push({ title: "Start with what you eat", text: "Log a meal to get suggestions based on your actual day.", action: "add-food", label: "Log a meal" });
    } else if (remaining < 0) {
      insights.push({ title: `${Math.abs(round(remaining))} kcal above today's estimate`, text: "Logged totals are estimates, not a score. Choose your next meal based on hunger rather than trying to compensate.", action: "assistant", label: "Talk it through" });
    } else {
      const recipe = remaining > 0 ? recommendedRecipe(remaining, totals, goal) : null;
      if (recipe) {
        insights.push({ title: `${recipe.name} fits what remains`, text: `${recipe.calories} kcal · ${recipe.protein} g protein. A local recipe estimate within your ${round(remaining)} kcal remaining.`, action: "recipe-details", id: recipe.id, label: "View recipe" });
      } else {
        insights.push({ title: `${round(remaining)} kcal remaining`, text: "No recipe in the local catalogue fits this estimate. Your hunger and preferences matter more than a number.", action: "assistant", label: "Ask a question" });
      }
    }

    const proteinLeft = goal.protein - totals.protein;
    const proteinRecipe = remaining > 0
      ? RECIPES.filter((recipe) => !dietExcluded(recipe) && recipe.protein >= 12 && recipe.calories <= remaining)
        .sort((a, b) => b.protein - a.protein)[0]
      : null;
    if (proteinLeft >= 15 && proteinRecipe && !insights.some((insight) => insight.id === proteinRecipe.id)) {
      insights.push({ title: "A protein-rich option is available", text: `${proteinRecipe.name} has an estimated ${proteinRecipe.protein} g protein in ${proteinRecipe.calories} kcal, within today's remaining estimate.`, action: "recipe-details", id: proteinRecipe.id, label: "See ingredients" });
    } else if (day.meals.length && totals.fiber < 10) {
      insights.push({ title: "Consider a fiber-rich addition", text: "A pulse, fruit or vegetable could add variety and fiber to a meal you already enjoy.", action: "navigate", page: "food-log", label: "Browse foods" });
    }

    if (day.water < 500) {
      insights.push({ title: "Water check-in", text: `${day.water} ml logged toward your optional 2 L reminder. This is just a personal prompt; your fluid needs vary.`, action: "water", amount: "250", label: "Log 250 ml" });
    }

    return `<div class="assistant-insights" aria-label="Suggestions based on your local data">${insights.slice(0, 3).map((insight) => `
      <article class="assistant-insight"><div><strong>${esc(insight.title)}</strong><p>${esc(insight.text)}</p></div><button class="ghost-button small-button" data-action="${esc(insight.action)}"${insight.id ? ` data-id="${esc(insight.id)}"` : ""}${insight.page ? ` data-page="${esc(insight.page)}"` : ""}${insight.amount ? ` data-amount="${esc(insight.amount)}"` : ""}>${esc(insight.label)} →</button></article>`).join("")}</div>`;
  }

  function weeklyAssistantSummary() {
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = shiftDate(new Date(), index - 6);
      const day = state.entries[dateKey(date)];
      const meals = day?.meals || [];
      return {
        calories: meals.reduce((sum, meal) => sum + num(meal.calories), 0),
        protein: meals.reduce((sum, meal) => sum + num(meal.protein), 0),
        logged: meals.length > 0
      };
    });
    const logged = days.filter((day) => day.logged);
    return {
      count: logged.length,
      calories: logged.length ? round(logged.reduce((sum, day) => sum + day.calories, 0) / logged.length) : 0,
      protein: logged.length ? round(logged.reduce((sum, day) => sum + day.protein, 0) / logged.length) : 0
    };
  }

  function foodInquiry(prompt) {
    const match = prompt.match(/\b(?:calories?|kcal|macros?|nutrition|protein|carbs?|carbohydrates?|fat)\b.*?\b(?:in|of|for)\s+(.+?)\s*\??$/i);
    if (!match) return null;

    const subject = match[1].toLowerCase().replace(/[?!,]/g, " ").replace(/\s+/g, " ").trim();
    if (/^(?:my|today|my day|today's log|my calorie goal|my daily target|the day)$/.test(subject)) return null;
    const amount = subject.match(/\b(\d+(?:\.\d+)?)\s*(kg|g|grams?|ml|millilit(?:er|re)s?|cups?|pieces?|slices?|medium|large|small|bowls?|servings?)\b/i);
    const bareAmount = amount ? null : subject.match(/^(\d+(?:\.\d+)?)\s+/);
    const wordQuantities = { half: 0.5, quarter: 0.25, one: 1, two: 2, three: 3, four: 4, five: 5 };
    const wordAmount = amount || bareAmount ? null : subject.match(/^(half|quarter|one|two|three|four|five)\s+/);
    const foodQuery = subject
      .replace(/^(?:a|an|the)\s+/, "")
      .replace(/\b\d+(?:\.\d+)?\s*(?:kg|g|grams?|ml|millilit(?:er|re)s?|cups?|pieces?|slices?|medium|large|small|bowls?|servings?)\b/i, "")
      .replace(/^\d+(?:\.\d+)?\s+/, "")
      .replace(/^(?:half|quarter|one|two|three|four|five)\s+/, "")
      .replace(/^(?:of|for)\s+/, "")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b(\w+?)s\b/g, "$1");
    if (/\b(?:and|with|plus)\b/.test(foodQuery)) return { subject, food: null };
    const catalogue = [...FOODS, ...RECIPES].sort((a, b) => b.name.length - a.name.length);
    const food = catalogue.find((item) => {
      const name = item.name.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim().replace(/\b(\w+?)s\b/g, "$1");
      return foodQuery === name || foodQuery.includes(name);
    }) || catalogue.find((item) => (FOOD_ALIASES[item.id] || []).some((alias) =>
      alias.toLowerCase().replace(/\b(\w+?)s\b/g, "$1") === foodQuery
    ));
    if (!food) return { subject, food: null };

    let servings = 1;
    let portionLabel = food.serving;
    const canonicalUnit = (unit) => {
      const normalized = unit.toLowerCase();
      if (/^(kg)$/.test(normalized)) return "g";
      if (/^(gram|grams)$/.test(normalized)) return "g";
      if (/^(milliliter|milliliters|millilitre|millilitres)$/.test(normalized)) return "ml";
      if (/^cups?$/.test(normalized)) return "cup";
      if (/^(pieces?|slices?|bowls?|servings?)$/.test(normalized)) return normalized.replace(/s$/, "");
      return normalized;
    };
    if (amount) {
      const requestedAmount = num(amount[1]);
      const requestedUnit = canonicalUnit(amount[2]);
      const reference = [...food.serving.matchAll(/(\d+(?:\.\d+)?)\s*(kg|g|grams?|ml|millilit(?:er|re)s?|cups?|pieces?|slices?|medium|large|small|bowls?|servings?)/gi)]
        .find((entry) => canonicalUnit(entry[2]) === requestedUnit);
      if (reference && amount[2].toLowerCase() === "kg") {
        servings = (requestedAmount * 1000) / num(reference[1], 1);
        portionLabel = `${amount[1]} ${amount[2]}`;
      } else if (reference) {
        servings = requestedAmount / num(reference[1], 1);
        portionLabel = `${amount[1]} ${amount[2]}`;
      } else if (requestedUnit === "serving") {
        servings = requestedAmount;
        portionLabel = `${amount[1]} ${amount[2]}`;
      } else {
        portionLabel = `one reference serving (${food.serving}); ${amount[0]} cannot be converted from the catalogue serving`;
      }
    } else if (bareAmount) {
      const reference = food.serving.match(/^(\d+(?:\.\d+)?)\s*(pieces?|slices?|cups?|bowls?|servings?|medium|large|small)\b/i);
      servings = num(bareAmount[1]) / (reference ? num(reference[1], 1) : 1);
      portionLabel = `${bareAmount[1]} ${food.name}${num(bareAmount[1]) === 1 ? "" : "s"}`;
    } else if (wordAmount) {
      const quantity = wordQuantities[wordAmount[1]];
      const reference = food.serving.match(/^(\d+(?:\.\d+)?)\s*(pieces?|slices?|cups?|bowls?|servings?|medium|large|small)\b/i);
      servings = quantity / (reference ? num(reference[1], 1) : 1);
      portionLabel = wordAmount[1] === "half"
        ? `half of a ${food.name}`
        : wordAmount[1] === "quarter"
          ? `a quarter of a ${food.name}`
          : `${wordAmount[1]} ${food.name}${quantity > 1 ? "s" : ""}`;
    }

    const servingInfo = amount && portionLabel.startsWith("one reference serving")
      ? portionLabel
      : amount || bareAmount || wordAmount ? `${portionLabel} (scaled from ${food.serving})` : `one reference serving (${food.serving})`;
    return { subject, food, servings, servingInfo };
  }

  function assistantReply(prompt) {
    const question = prompt.toLowerCase();
    const totals = totalsFor();
    const goal = targets();
    const remaining = goal.calories - totals.calories;
    const day = dayFor();
    const mealNames = day.meals.map((meal) => meal.name).filter(Boolean);
    const cta = (label, action, id) => ({ label, action, id });

    if (/\b(week|weekly|trend|last 7|7.day)\b/.test(question)) {
      const week = weeklyAssistantSummary();
      if (!week.count) return { text: "There aren't any logged meals in the last seven days yet, so I can't summarize a weekly pattern. Once you log a few days, I can describe the averages. Missing entries mean the summary may be incomplete.", action: cta("View progress", "navigate", "progress") };
      return { text: `Food was logged on ${week.count} of the last seven days. On logged days, your average is about ${week.calories} kcal and ${week.protein} g protein. These are descriptive averages from this browser only—not a measure of success, and unlogged food isn't included.`, action: cta("Open progress", "navigate", "progress") };
    }

    if (/\b(water|hydration|drink|thirst)\b/.test(question)) {
      return { text: `You've logged ${round(day.water)} ml for ${prettyDate(activeDate)}. The 2 L shown in the app is an optional reminder, not a prescribed target; fluid needs depend on the person and situation.`, action: cta("Log 250 ml", "assistant-water", "250") };
    }

    const lookup = foodInquiry(prompt);
    if (lookup?.food) {
      const food = lookup.food;
      const quantity = lookup.servings;
      return {
        text: `Approximate nutrition for ${lookup.servingInfo} of ${food.name}: ${round(food.calories * quantity)} kcal, ${round(food.protein * quantity)} g protein, ${round(food.carbs * quantity)} g carbohydrates, ${round(food.fat * quantity)} g fat${food.fiber !== undefined ? ` and ${round(food.fiber * quantity)} g fiber` : ""}. Based on this app's local reference serving (${food.serving}); recipes and brands vary, so treat this as a rough estimate.`,
        action: cta("Browse food catalogue", "navigate", "food-log")
      };
    }
    if (lookup && !lookup.food) {
      return {
        text: `I couldn't find “${lookup.subject}” in this app's small local reference catalogue, and there is no live nutrition database connected. I don't want to invent calorie or macro values. You can search the catalogue or add the food with nutrition values from its label.`,
        action: cta("Search or add food", "navigate", "food-log")
      };
    }

    if (/\b(protein|macro|macros|carbs?|carbohydrates?|fat|fiber|fibre|sugar)\b/.test(question)) {
      const names = { protein: "protein", carb: "carbohydrates", carbs: "carbohydrates", carbohydrate: "carbohydrates", carbohydrates: "carbohydrates", fat: "fat", fiber: "fiber", fibre: "fiber", sugar: "sugar" };
      const key = Object.keys(names).find((word) => question.includes(word));
      const metricKey = key === "carb" || key === "carbs" || key === "carbohydrate" || key === "carbohydrates" ? "carbs" : key;
      if (metricKey && ["protein", "carbs", "fat"].includes(metricKey)) {
        const left = goal[metricKey] - totals[metricKey];
        const description = left >= 0 ? `about ${round(left)} g below` : `about ${Math.abs(round(left))} g above`;
        const recipe = metricKey === "protein" && remaining > 0
          ? RECIPES.filter((item) => !dietExcluded(item) && item.protein >= 12 && item.calories <= remaining).sort((a, b) => b.protein - a.protein)[0]
          : null;
        const suggestion = metricKey === "protein"
          ? recipe ? ` ${recipe.name} is a local estimate of ${recipe.protein} g protein and ${recipe.calories} kcal, within the remaining calorie estimate.` : " I couldn't find a protein-rich recipe that fits the remaining calorie estimate."
          : " These macro targets are broad estimates; a varied meal that suits your preferences can still be a good choice.";
        return { text: `Your logged ${names[key]} is ${round(totals[metricKey])} g against an estimated ${goal[metricKey]} g target (${description}).${suggestion}`, action: recipe ? cta("See recipe details", "recipe-details", recipe.id) : null, secondAction: recipe ? cta("Add to today's log", "assistant-log-recipe", recipe.id) : null };
      }
      if (!key) return { text: `Today's logged macros are ${round(totals.protein)} g protein, ${round(totals.carbs)} g carbohydrates, and ${round(totals.fat)} g fat. ${goal.manual ? "Your manually set calorie goal scales to" : "Estimated targets are"} ${goal.protein} g protein, ${goal.carbs} g carbs, and ${goal.fat} g fat. ${goal.manual ? "These macro values use the app's broad 25/45/30% split." : "These are broad estimates, not strict limits."}`, action: cta("Browse food options", "navigate", "food-log") };
      const nutrient = key === "fiber" || key === "fibre" ? "fiber" : "sugar";
      return { text: `Your food log shows about ${round(totals[nutrient])} g ${nutrient} for ${prettyDate(activeDate)}. This local catalogue is approximate, so treat it as a rough check-in rather than a precise measurement.`, action: cta("Browse foods", "navigate", "food-log") };
    }

    if (/\b(recipe|meal|eat|lunch|dinner|breakfast|snack|recommend|suggest)\b/.test(question)) {
      const recipe = remaining > 0 ? recommendedRecipe(remaining, totals, goal) : null;
      if (!recipe) return { text: `I don't have a recipe in the local catalogue that fits the ${Math.max(0, round(remaining))} kcal remaining estimate for ${prettyDate(activeDate)}. I won't suggest one that exceeds it as a fit. You can still browse the planner, and you don't need to eat to a calorie number.`, action: cta("Browse all recipes", "navigate", "planner") };
      return { text: `${recipe.name} is a local recipe estimate of ${recipe.calories} kcal, which fits within your ${round(remaining)} kcal remaining estimate. It provides about ${recipe.protein} g protein. Check the ingredients and portion against your needs.`, action: cta("See recipe details", "recipe-details", recipe.id), secondAction: cta("Add to today's log", "assistant-log-recipe", recipe.id) };
    }

    if (/\b(profile|goal|target|calorie|calories|remaining|summary|today|doing|progress)\b/.test(question)) {
      const balance = remaining >= 0 ? `${round(remaining)} kcal remaining` : `${Math.abs(round(remaining))} kcal over the estimate`;
      const logged = mealNames.length ? `Logged so far: ${mealNames.join(", ")}.` : "No meals are logged yet.";
      return { text: `${prettyDate(activeDate)}: ${round(totals.calories)} of your ${goal.manual ? "personal" : "estimated"} ${goal.calories} kcal target (${balance}). Protein ${round(totals.protein)}/${goal.protein} g, carbs ${round(totals.carbs)}/${goal.carbs} g, fat ${round(totals.fat)}/${goal.fat} g. ${logged} Your log may be incomplete.`, action: cta("Log a meal", "add-food") };
    }

    return { text: `Ask me about calories and macros in a food or recipe (for example, “Calories and macros in 2 idlis?”), your logged meals, remaining daily target, water, or seven-day summary. For ${prettyDate(activeDate)}, you've logged ${round(totals.calories)} of your ${goal.manual ? "personal" : "estimated"} ${goal.calories} kcal target.`, action: cta("Check banana nutrition", "assistant-prompt", "Calories and macros in a banana?") };
  }

  const ASSISTANT_PROMPTS = ["Summarize today", "What fits my macros?", "Calories in 2 idlis?", "How is my week?"];

  function renderAssistantMessages() {
    const thread = $("#assistant-thread");
    if (!thread) return;
    const renderAction = (action, style) => `<button class="${style} small-button" data-action="${esc(action.action)}"${action.action === "navigate" ? ` data-page="${esc(action.id)}"` : action.action === "assistant-prompt" ? ` data-prompt="${esc(action.id)}"` : action.id ? ` data-id="${esc(action.id)}"` : ""}>${esc(action.label)}</button>`;
    thread.innerHTML = assistantMessages.map((message) => {
      const sources = (message.sources || []).filter((source) => {
        try { return new URL(source.url).protocol === "https:"; } catch { return false; }
      });
      return `<div class="assistant-bubble ${message.role === "user" ? "user" : "agent"}"><span>${message.role === "user" ? "You" : message.live ? "Nutri · OpenAI web search" : "Nutri · local estimate"}</span><p>${esc(message.text)}</p>${sources.length ? `<div class="assistant-sources"><span>Sources</span>${sources.map((source) => `<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title || source.url)}</a>`).join("")}</div>` : ""}${message.action ? `<div class="assistant-bubble-actions">${renderAction(message.action, "secondary-button")}${message.secondAction ? renderAction(message.secondAction, "primary-button") : ""}</div>` : ""}</div>`;
    }).join("");
    thread.scrollTop = thread.scrollHeight;
    const form = $("#assistant-form");
    if (form) {
      $$("input, button[type='submit']", form).forEach((element) => { element.disabled = assistantRequestPending; });
      form.setAttribute("aria-busy", String(assistantRequestPending));
    }
  }

  function openAssistant() {
    if (!assistantMessages.length) assistantMessages.push({ role: "assistant", text: state.aiEndpoint
      ? "Hi! I can answer general questions using OpenAI with web search and can include today's nutrition summary if you opt in below. Web results can be incomplete or wrong, so check important health information with a qualified professional."
      : "Hi! I can answer from this browser's small local food catalogue. To ask general questions with OpenAI and web search, connect the secure Cloudflare Worker in your profile. No API key belongs in this page." });
    const quickPrompts = ASSISTANT_PROMPTS.map((prompt) => `<button class="filter-chip" data-action="assistant-prompt" data-prompt="${esc(prompt)}">${esc(prompt)}</button>`).join("");
    const aiStatus = state.aiEndpoint ? "OpenAI web search · endpoint configured" : "Local demo · OpenAI is not connected";
    openModal("Your nutrition companion", aiStatus, `
      <div class="assistant-notice"><strong>${state.aiEndpoint ? "Your questions and recent chat turns are sent to OpenAI through your configured Cloudflare proxy." : "No live AI is connected yet."}</strong> ${state.aiEndpoint ? "Today's food names and nutrition totals are included only when you opt in below." : "In local mode, your nutrition data stays in this browser and is not sent to an AI service."} Never put an API key in this app. Answers are not guaranteed accurate or medical advice.</div>
      <div id="assistant-thread" class="assistant-thread" role="log" aria-live="polite" aria-label="Conversation"></div>
      <div class="assistant-prompts" aria-label="Suggested questions">${quickPrompts}</div>
      ${state.aiEndpoint ? `<label class="assistant-consent"><input id="assistant-share-context" type="checkbox"><span>Include today's logged foods and nutrition totals in requests for more personalized answers. This health data will be sent to OpenAI through the proxy.</span></label>` : ""}
      <form id="assistant-form" class="assistant-form"><label class="sr-only" for="assistant-prompt-input">Ask your nutrition companion</label><input id="assistant-prompt-input" name="prompt" type="text" maxlength="2000" required autocomplete="off" placeholder="${state.aiEndpoint ? "Ask a question; web search is available" : "Try: calories and macros in 2 idlis"}"><button class="primary-button" type="submit">Send</button></form>
      <p class="disclaimer assistant-disclaimer">${state.aiEndpoint ? "OpenAI may still make mistakes. Web search sources are linked when available. Do not rely on this assistant for medical decisions." : "To enable OpenAI: configure the Worker in your profile and follow the setup steps in README."} General wellness information only—not medical advice. Double-check nutrition and allergens.</p>`);
    $(".modal", $("#modal-root")).classList.add("assistant-modal");
    renderAssistantMessages();
    $("#assistant-prompt-input")?.focus();
  }

  function nutritionSnapshot() {
    const totals = totalsFor();
    const goal = targets();
    return {
      date: dateKey(activeDate),
      foods: dayFor().meals.slice(0, 20).map((meal) => String(meal.name || "").slice(0, 80)),
      logged: { calories: round(totals.calories), protein: round(totals.protein), carbohydrates: round(totals.carbs), fat: round(totals.fat), fiber: round(totals.fiber) },
      target: { calories: goal.calories, protein: goal.protein, carbohydrates: goal.carbs, fat: goal.fat },
      remainingCalories: round(goal.calories - totals.calories)
    };
  }

  async function askOpenAi(question) {
    const earlierMessages = assistantMessages
      .filter((message) => !message.pending)
      .slice(0, -1)
      .slice(-8)
      .map((message) => ({ role: message.role === "user" ? "user" : "assistant", content: message.text }));
    const body = { question, history: earlierMessages };
    if ($("#assistant-share-context")?.checked) body.nutrition = nutritionSnapshot();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);
    try {
      const response = await fetch(state.aiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || `Assistant request failed (HTTP ${response.status}).`);
      if (typeof result?.answer !== "string" || !result.answer.trim()) throw new Error("The AI service returned an empty answer. Please try again.");
      return { answer: result.answer.trim().slice(0, 12000), sources: Array.isArray(result.sources) ? result.sources.slice(0, 8) : [] };
    } finally {
      clearTimeout(timeout);
    }
  }

  async function submitAssistantPrompt(prompt) {
    const text = String(prompt || "").trim();
    if (!text || text.length > 2000 || assistantRequestPending) return;
    assistantMessages.push({ role: "user", text });
    if (!state.aiEndpoint) {
      const reply = assistantReply(text);
      assistantMessages.push({ role: "assistant", text: reply.text, action: reply.action, secondAction: reply.secondAction });
      if (assistantMessages.length > 24) assistantMessages = assistantMessages.slice(-24);
      renderAssistantMessages();
      const input = $("#assistant-prompt-input");
      if (input) { input.value = ""; input.focus(); }
      return;
    }

    assistantRequestPending = true;
    assistantMessages.push({ role: "assistant", text: "Searching current sources and preparing an answer…", pending: true });
    if (assistantMessages.length > 24) assistantMessages = assistantMessages.slice(-24);
    renderAssistantMessages();
    const input = $("#assistant-prompt-input");
    if (input) input.value = "";
    try {
      const result = await askOpenAi(text);
      const pending = assistantMessages.findIndex((message) => message.pending);
      if (pending >= 0) assistantMessages[pending] = { role: "assistant", text: result.answer, sources: result.sources, live: true };
    } catch (error) {
      console.error("OpenAI assistant request failed.", error);
      const message = error.name === "AbortError" ? "The answer took too long. Please try again." : error.message || "The AI service couldn't answer. Please check the proxy configuration and try again.";
      const pending = assistantMessages.findIndex((entry) => entry.pending);
      if (pending >= 0) assistantMessages[pending] = { role: "assistant", text: message };
    } finally {
      assistantRequestPending = false;
      renderAssistantMessages();
      const field = $("#assistant-prompt-input");
      if (field) field.focus();
    }
  }

  function renderFoodLog() {
    const t = totalsFor();
    const goal = targets();
    const day = dayFor();
    const action = `<button class="primary-button small-button" data-action="add-food">＋ Add food</button>`;
    const search = `<div class="search-box"><span>⌕</span><input id="food-search" type="search" value="${esc(foodSearch)}" placeholder="Search foods, meals and ingredients…" aria-label="Search foods"></div>`;
    const foodItems = foodLibrary().filter((food) => (foodCategory === "All" || food.category === foodCategory) && `${food.name} ${food.serving} ${food.category} ${food.cuisine || ""}`.toLowerCase().includes(foodSearch.toLowerCase()));
    return `${heading("Food log", "Keep a flexible record of meals, portions and nutrition.", action)}
      <div class="welcome-banner"><p><strong>${esc(prettyDate(activeDate))}</strong> · ${round(t.calories)} of ${goal.calories} ${goal.manual ? "kcal personal target" : "estimated kcal"} · ${day.meals.length} logged ${day.meals.length === 1 ? "food" : "foods"}</p><button class="secondary-button small-button" data-action="pick-date">Change day</button></div>
      <div class="stats-grid"><div class="stat-card"><span>Calories · remaining</span><strong>${Math.abs(round(goal.calories - t.calories))}<small>${goal.calories - t.calories < 0 ? "over" : "kcal left"}</small></strong></div><div class="stat-card"><span>Protein · target ${goal.protein}g</span><strong>${round(t.protein)}<small>g</small></strong></div><div class="stat-card"><span>Carbs · target ${goal.carbs}g</span><strong>${round(t.carbs)}<small>g</small></strong></div></div>
      <div class="grid food-log-layout">
        <section class="card">${cardTitle("Search foods", "Built-in foods plus your saved custom foods", `<button class="secondary-button small-button" data-action="create-custom-food">＋ Create custom food</button>`)}<div class="food-toolbar">${search}</div><div class="food-filters">${CATEGORIES.map((category) => `<button class="filter-chip ${foodCategory === category ? "active" : ""}" data-action="food-category" data-category="${category}">${category}</button>`).join("")}</div>
        <div class="food-list">${foodItems.map(foodCard).join("") || `<div class="empty-state"><strong>No foods match that search</strong><p>Try another search, or create a custom food to save it for next time.</p><button class="secondary-button small-button" data-action="create-custom-food">＋ Create custom food</button></div>`}</div></section>
        <div class="grid"><section class="card">${cardTitle("Logged today", "Select edit to update a portion")}${day.meals.length ? day.meals.slice().reverse().map((meal) => mealRow(meal, true)).join("") : `<div class="empty-state"><strong>Nothing logged yet</strong><p>Add a food or recipe to see totals here.</p><button class="secondary-button small-button" data-action="add-food">Log first food</button></div>`}
          <div class="macro-footer"><span>Fiber <strong>${round(t.fiber)}g</strong></span><span>Sugar <strong>${round(t.sugar)}g</strong></span><span>Fat <strong>${round(t.fat)}g</strong></span></div>
        </section><section class="card">${cardTitle("Add a barcode", `<span class="coach-badge">Local demo lookup</span>`)}<p class="card-subtitle">A barcode scanner service isn't connected. Enter one of the sample codes or use the food search.</p><div class="food-toolbar" style="margin-top:12px"><input id="barcode-input" aria-label="Barcode number" inputmode="numeric" placeholder="Enter barcode number"><button class="secondary-button small-button" data-action="barcode-lookup">Look up</button></div><div class="disclaimer">Sample codes look up a small local demo catalogue. No camera or external database is used.</div></section>
          <section class="card">${cardTitle("Photo food estimate", `<span class="coach-badge">Manual estimate</span>`)}<p class="card-subtitle">Choose an image to preview it, then enter your own editable nutrition estimate. Image recognition is not configured.</p><label class="upload-zone" for="food-photo"><span>📷<br>Choose a food photo to preview<br><small>Image stays in your browser and is not uploaded.</small><br><input id="food-photo" type="file" accept="image/*"></span></label><div id="photo-preview"></div><button class="secondary-button small-button" data-action="photo-estimate" style="margin-top:11px">Enter a manual estimate</button></section>
          <section class="card">${cardTitle("Your favorites", "Foods you use often")}${favoriteFoods().slice(0, 5).map(foodCard).join("") || `<div class="empty-state"><strong>Save foods for quick access</strong><p>Tap the heart next to any food in search.</p></div>`}<div class="disclaimer">Favorite foods are stored only in this browser.</div></section>
          <section class="card">${cardTitle("Recent foods", "Repeat a food from an earlier log")}${recentEntries().slice(0, 5).map((meal) => `<div class="meal-row"><div class="meal-emoji">${esc(meal.emoji || "🍽️")}</div><div class="meal-copy"><strong>${esc(meal.name)}</strong><span>${esc(meal.date)} · ${round(meal.calories)} kcal</span></div><button class="icon-plain" aria-label="Repeat ${esc(meal.name)}" data-action="repeat-food" data-id="${esc(meal.id)}" data-date="${esc(meal.date)}">＋</button></div>`).join("") || `<div class="empty-state"><strong>Your recent foods will show up here</strong><p>Log a meal to make repeating it easy.</p></div>`}</section>
        </div>
      </div>`;
  }

  function favoriteFoods() {
    return foodLibrary().filter((food) => state.favorites.includes(food.id));
  }

  function foodLibrary() {
    return [...FOODS, ...state.customFoods];
  }

  function recentEntries() {
    const seen = new Set();
    return Object.entries(state.entries).flatMap(([date, day]) => (Array.isArray(day.meals) ? day.meals : []).map((meal) => ({ ...meal, date })))
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter((meal) => {
        const key = meal.foodId || meal.name.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function foodCard(food) {
    const isFavorite = state.favorites.includes(food.id);
    const customActions = food.custom ? `<button class="icon-plain" title="Edit saved food" aria-label="Edit ${esc(food.name)}" data-action="edit-custom-food" data-id="${esc(food.id)}">✎</button><button class="icon-plain" title="Remove saved food" aria-label="Remove ${esc(food.name)} from saved foods" data-action="delete-custom-food" data-id="${esc(food.id)}">×</button>` : "";
    return `<div class="food-item"><div class="meal-emoji">${esc(food.emoji || "🍽️")}</div><div class="food-details"><strong>${esc(food.name)}${food.custom ? ` <span class="custom-food-badge">Custom</span>` : ""}</strong><span>${esc(food.serving)} · P ${displayGrams(food.protein)}g · C ${displayGrams(food.carbs)}g · F ${displayGrams(food.fat)}g</span></div><span class="food-kcal">${round(food.calories)}</span><button class="icon-plain" title="${isFavorite ? "Remove favorite" : "Save favorite"}" aria-label="${isFavorite ? "Remove favorite" : "Save favorite"} ${esc(food.name)}" data-action="favorite-food" data-id="${esc(food.id)}">${isFavorite ? "♥" : "♡"}</button><button class="icon-plain" title="Add ${esc(food.name)}" aria-label="Add ${esc(food.name)} to food log" data-action="add-library-food" data-id="${esc(food.id)}">＋</button>${customActions ? `<span class="custom-food-actions">${customActions}</span>` : ""}</div>`;
  }

  function weekDates(start = activeDate) {
    const mondayOffset = (start.getDay() + 6) % 7;
    const monday = shiftDate(start, -mondayOffset);
    return Array.from({ length: 7 }, (_, index) => shiftDate(monday, index));
  }

  function plannerEntries(date) {
    const day = state.planner[dateKey(date)];
    return day && Array.isArray(day.meals) ? day.meals : [];
  }

  function renderPlanner() {
    const dates = weekDates(activeDate);
    const recipes = RECIPES.filter((recipe) => !dietExcluded(recipe));
    const offset = recipes.length ? recipeShuffle % recipes.length : 0;
    const rotatedRecipes = recipes.slice(offset).concat(recipes.slice(0, offset));
    const planned = plannerEntries(activeDate);
    const shopping = shoppingList(dates);
    const dayStrip = `<div class="day-strip">${dates.map((date) => `<button class="day-button ${dateKey(date) === dateKey(activeDate) ? "active" : ""}" data-action="planner-date" data-date="${dateKey(date)}"><span>${WEEKDAY[date.getDay()]}</span><strong>${date.getDate()}</strong></button>`).join("")}</div>`;
    const groups = MEAL_TYPES.map((type) => {
      const entries = planned.filter((meal) => meal.mealType === type);
      return `<div class="planner-group"><div class="planner-group-title"><span>${type}</span><span>${entries.length ? `${entries.reduce((sum, item) => sum + item.calories, 0)} kcal planned` : "No meal planned"}</span></div>${entries.length ? entries.map((meal) => plannerMealRow(meal)).join("") : `<div class="planner-empty">Build your ${type.toLowerCase()} with a recipe idea on the right.</div>`}</div>`;
    }).join("");
    const recipeMarkup = rotatedRecipes.map((recipe) => `<div class="recipe-card"><div class="recipe-emoji">${esc(recipe.emoji)}</div><div class="recipe-copy"><strong>${esc(recipe.name)}</strong><p>${recipe.tags.map(esc).join(" · ")} · ${recipe.prep} min · serves ${esc(recipe.serving)}</p><div class="recipe-meta"><span>${recipe.calories} kcal</span><span>${recipe.protein}g protein</span><span>${recipe.carbs}g carbs</span></div><div class="heading-actions" style="margin-top:9px"><button class="secondary-button small-button" data-action="recipe-details" data-id="${esc(recipe.id)}">Details</button><button class="primary-button small-button" data-action="plan-recipe" data-id="${esc(recipe.id)}">Add to plan</button></div></div></div>`).join("") || `<div class="empty-state"><strong>No recipes match the current restrictions</strong><p>Review your dietary preferences and allergy notes in your profile.</p></div>`;
    const shoppingMarkup = Object.entries(shopping).map(([category, items]) => `<div class="shopping-category">${esc(category)}</div>${items.map((item) => {
      const checked = Boolean(state.shoppingChecks[item.key]);
      return `<label class="shopping-item ${checked ? "checked" : ""}"><input type="checkbox" data-action="shopping-check" data-key="${esc(item.key)}" ${checked ? "checked" : ""}><span>${esc(item.name)}</span><span style="margin-left:auto;color:var(--muted);font-size:9px">${item.count > 1 ? `×${item.count}` : ""}</span></label>`;
    }).join("")}`).join("");
    const plannedCalories = planned.reduce((sum, meal) => sum + num(meal.calories), 0);
    return `${heading("Meal planner", "Make a flexible plan for the week, one meal at a time.", `<button class="secondary-button small-button" data-action="regenerate">↻ New ideas</button>`)}
      <div class="planner-layout"><div><section class="card">${cardTitle("This week", `${prettyDate(dates[0])} – ${prettyDate(dates[6])}`)}${dayStrip}<div class="welcome-banner"><p><strong>${esc(prettyDate(activeDate))}</strong><br>${planned.length} planned ${planned.length === 1 ? "meal" : "meals"} · ${plannedCalories} kcal (estimate)</p><button class="secondary-button small-button" data-action="navigate" data-page="food-log">Log actual meals</button></div>${groups}</section>
        <section class="card" style="margin-top:15px">${cardTitle("Suggested meals", "Local recipe ideas · nutrition values are estimates")}<div class="grid">${recipeMarkup}</div></section></div>
        <aside class="grid"><section class="card">${cardTitle("Saved recipes", "Your locally saved meal ideas")}${state.savedRecipes.map((recipeId) => RECIPES.find((recipe) => recipe.id === recipeId)).filter(Boolean).map((recipe) => `<div class="meal-row"><div class="meal-emoji">${esc(recipe.emoji)}</div><div class="meal-copy"><strong>${esc(recipe.name)}</strong><span>${recipe.calories} kcal · ${recipe.prep} min</span></div><button class="icon-plain" aria-label="Remove saved recipe" data-action="remove-saved-recipe" data-id="${esc(recipe.id)}">♥</button><button class="icon-plain" aria-label="View recipe details" data-action="recipe-details" data-id="${esc(recipe.id)}">↗</button></div>`).join("") || `<div class="empty-state"><strong>No saved recipes yet</strong><p>Open any recipe and choose “Save recipe”.</p></div>`}</section>
        <section class="card">${cardTitle("Shopping list", "Combined from this week's planned recipes")}<p class="disclaimer">Ingredient quantities are approximate; check packaged ingredients for allergens.</p>${shoppingMarkup || `<div class="empty-state"><strong>Your list will grow with your plan</strong><p>Add a recipe to this week's planner.</p></div>`}<button class="secondary-button small-button" data-action="clear-shopping" style="margin-top:11px" ${Object.keys(state.shoppingChecks).length ? "" : "disabled"}>Clear checked items</button></section>
        <section class="card">${cardTitle("Your plan", "A guide, not a rule")}<div class="target-summary"><strong>Planned for ${esc(prettyDate(activeDate).split(",")[0])}</strong><div class="target-row"><span>Energy</span><b>${plannedCalories} / ${targets().calories} kcal</b></div><div class="target-row"><span>Protein</span><b>${round(planned.reduce((sum, meal) => sum + num(meal.protein), 0))} / ${targets().protein} g</b></div></div><p class="disclaimer" style="margin-top:11px">Planned meals are separate from your food log. Log what you actually eat to update your daily dashboard.</p></section></aside>
      </div>`;
  }

  function plannerMealRow(meal) {
    return `<div class="meal-row"><div class="meal-emoji">${esc(meal.emoji)}</div><div class="meal-copy"><strong>${esc(meal.name)}</strong><span>${esc(meal.serving || "1 serving")} · ${round(meal.protein)}g protein</span></div><span class="meal-kcal">${round(meal.calories)} kcal</span><div class="meal-actions"><button class="icon-plain" aria-label="Adjust portion" data-action="adjust-plan" data-id="${esc(meal.id)}">↔</button><button class="icon-plain" aria-label="Replace meal" data-action="replace-plan" data-id="${esc(meal.id)}">↻</button><button class="icon-plain" aria-label="Remove meal" data-action="remove-plan" data-id="${esc(meal.id)}">×</button></div></div>`;
  }

  function shoppingList(dates) {
    const result = {};
    const categories = { "Vegetables & fruit": /cucumber|tomato|onion|pepper|spinach|vegetable|lemon|coriander|mint|pomegranate/i, "Protein & pulses": /moong|dal|chickpea|chana|paneer|egg|chicken/i, "Dairy": /curd/i, "Grains & staples": /rice|roti|oats/i, "Pantry & spices": /oil|cumin|ginger|garlic|turmeric|mustard|curry leaves|chilli|pepper|spice|salt/i };
    dates.forEach((date) => plannerEntries(date).forEach((meal) => {
      (meal.ingredients || []).forEach((ingredient) => {
        const key = ingredient.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const category = Object.entries(categories).find(([, pattern]) => pattern.test(ingredient))?.[0] || "Other";
        result[category] ||= {};
        result[category][key] ||= { name: ingredient, key, count: 0 };
        result[category][key].count += 1;
      });
    }));
    return Object.fromEntries(Object.entries(result).map(([category, items]) => [category, Object.values(items)]));
  }

  function renderProgress() {
    const period = progressPeriod;
    const dates = Array.from({ length: period }, (_, i) => shiftDate(new Date(), i - (period - 1)));
    const totals = dates.map((date) => {
      const day = state.entries[dateKey(date)];
      const sum = (day?.meals || []).reduce((value, meal) => value + num(meal.calories), 0);
      return { date, calories: sum, count: day?.meals?.length || 0 };
    });
    const loggedDays = totals.filter((day) => day.count > 0);
    const average = loggedDays.length ? Math.round(loggedDays.reduce((sum, day) => sum + day.calories, 0) / loggedDays.length) : 0;
    const goal = targets();
    const completion = loggedDays.length ? Math.round(loggedDays.filter((day) => day.calories <= goal.calories * 1.1 && day.calories >= goal.calories * .75).length / loggedDays.length * 100) : 0;
    const peak = Math.max(goal.calories, ...totals.map((day) => day.calories), 1);
    const targetHeight = goal.calories / peak * 125;
    const chart = totals.map((day) => `<div class="chart-column"><span class="chart-value">${day.calories ? round(day.calories) : ""}</span><div class="chart-bar" style="height:${Math.max(day.calories ? 4 : 0, day.calories / peak * 125)}px;opacity:${day.calories ? 1 : .16}" title="${esc(prettyDate(day.date))}: ${round(day.calories)} kcal"></div><span class="chart-label">${period === 7 ? WEEKDAY[day.date.getDay()] : `${day.date.getDate()}`}</span></div>`).join("");
    const latestWeight = state.weights.at(-1)?.weight ?? state.profile.weight;
    const oldestWeight = state.weights[0]?.weight ?? state.profile.weight;
    const weightChange = round(num(latestWeight) - num(oldestWeight));
    const weightList = state.weights.slice(-5).reverse().map((entry) => `<div class="meal-row"><div class="meal-emoji">⚖</div><div class="meal-copy"><strong>${esc(entry.weight)} kg</strong><span>${esc(entry.date)}</span></div><button class="icon-plain" data-action="remove-weight" data-id="${esc(entry.id)}" aria-label="Remove weight entry">×</button></div>`).join("");
    return `${heading("Your progress", "Notice your patterns over time—consistency matters more than a perfect day.", `<div class="period-tabs">${[[7, "7 days"], [30, "30 days"]].map(([value, label]) => `<button class="period-tab ${period === value ? "active" : ""}" data-action="period" data-days="${value}">${label}</button>`).join("")}</div>`)}
      <div class="stats-grid"><div class="stat-card"><span>Daily calorie average</span><strong>${average || "—"}<small>kcal · logged days</small></strong></div><div class="stat-card"><span>Days in estimated range</span><strong>${loggedDays.length ? `${completion}%` : "—"}<small>${loggedDays.length} logged</small></strong></div><div class="stat-card"><span>Weight trend</span><strong>${state.weights.length > 1 ? `${weightChange > 0 ? "+" : ""}${weightChange}` : "—"}<small>${state.weights.length > 1 ? "kg across entries" : "add entries to compare"}</small></strong></div></div>
      <div class="analytics-layout"><section class="card chart-card">${cardTitle(`Calories · last ${period} days`, `Daily food-log totals compared to your ${goal.manual ? "personal" : "estimated"} target`)}<div class="chart-area chart-area-${period}" style="--target-height:${targetHeight}px">${chart}<div class="chart-target-line" aria-label="Daily target ${goal.calories} kcal"></div></div><div class="chart-legend"><span><i></i> Logged calories</span><span><i style="width:11px;height:0;border-top:1px dashed var(--orange);border-radius:0"></i> Target ${goal.calories} kcal/day${goal.manual ? "" : " (estimate)"}</span></div></section>
      <section class="card">${cardTitle("Weight check-ins", "Optional—track at your own pace")}<div class="target-summary"><strong>${esc(latestWeight)} kg ${weightChange && state.weights.length > 1 ? `· ${weightChange > 0 ? "+" : ""}${weightChange} kg in this log` : ""}</strong><div class="target-row"><span>Current profile weight</span><b>${esc(state.profile.weight)} kg</b></div><div class="target-row"><span>Personal goal</span><b>${esc(state.profile.targetWeight)} kg</b></div></div><form class="weight-form" id="weight-form"><input type="number" name="weight" min="30" max="300" step="0.1" placeholder="kg" aria-label="Weight in kilograms" required><button class="secondary-button small-button">Add check-in</button></form>${weightList || `<p class="disclaimer">Your private check-ins will appear here. Weight changes naturally from day to day.</p>`}</section></div>
      <section class="card" style="margin-top:17px">${cardTitle("Nutrition over time", "Macro averages from days with logged food")}<div class="grid" style="grid-template-columns:repeat(3,minmax(0,1fr))">${["protein", "carbs", "fat"].map((key) => {
        const values = loggedDays.map((day) => (state.entries[dateKey(day.date)]?.meals || []).reduce((sum, meal) => sum + num(meal[key]), 0));
        const avg = values.length ? round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0;
        const color = key === "protein" ? "#e9914c" : key === "carbs" ? "#6a9cdb" : "#a48ad4";
        const label = key[0].toUpperCase() + key.slice(1);
        return `<div>${macroLine(label, avg, targets()[key], color)}<p class="disclaimer">${values.length ? `${avg}g daily average across ${values.length} logged ${values.length === 1 ? "day" : "days"}` : "Log meals to see your average."}</p></div>`;
      }).join("")}</div><button class="secondary-button small-button" style="margin-top:12px" data-action="weekly-report">Create weekly summary</button></section>`;
  }

  function renderProfile() {
    const p = state.profile;
    const goal = targets();
    const profileForm = `<form id="profile-form"><div class="form-grid">
      <div class="field"><label for="profile-name">Name</label><input id="profile-name" name="name" value="${esc(p.name)}" maxlength="60" placeholder="What should we call you?"></div>
      <div class="field"><label for="profile-age">Age</label><input id="profile-age" name="age" type="number" min="15" max="100" value="${esc(p.age)}" required></div>
      <div class="field"><label for="profile-gender">Gender <span style="font-weight:400">(optional)</span></label><select id="profile-gender" name="gender"><option value="">Prefer not to say</option><option value="female" ${p.gender === "female" ? "selected" : ""}>Female</option><option value="male" ${p.gender === "male" ? "selected" : ""}>Male</option></select><small>Used only for the standard calorie estimate. Not stored in a health account.</small></div>
      <div class="field"><label for="profile-height">Height · cm</label><input id="profile-height" name="height" type="number" min="100" max="230" value="${esc(p.height)}" required></div>
      <div class="field"><label for="profile-weight">Current weight · kg</label><input id="profile-weight" name="weight" type="number" min="30" max="300" step="0.1" value="${esc(p.weight)}" required></div>
      <div class="field"><label for="profile-target-weight">Target weight · kg</label><input id="profile-target-weight" name="targetWeight" type="number" min="30" max="300" step="0.1" value="${esc(p.targetWeight)}" required></div>
      <div class="field"><label for="profile-activity">Activity level</label><select id="profile-activity" name="activity"><option value="1.2" ${num(p.activity) === 1.2 ? "selected" : ""}>Mostly sitting · little exercise</option><option value="1.4" ${num(p.activity) === 1.4 ? "selected" : ""}>Light activity · 1–3 days/week</option><option value="1.55" ${num(p.activity) === 1.55 ? "selected" : ""}>Moderate activity · 3–5 days/week</option><option value="1.725" ${num(p.activity) === 1.725 ? "selected" : ""}>Very active · 6–7 days/week</option><option value="1.9" ${num(p.activity) === 1.9 ? "selected" : ""}>Highly active · physical work</option></select></div>
      <div class="field"><label for="profile-goal">Fitness goal</label><select id="profile-goal" name="goal"><option value="lose" ${p.goal === "lose" ? "selected" : ""}>Gradual weight loss</option><option value="maintain" ${p.goal === "maintain" ? "selected" : ""}>Maintain my weight</option><option value="gain" ${p.goal === "gain" ? "selected" : ""}>Gradual weight gain</option></select></div>
      <div class="field"><label for="profile-calorie-goal">Daily calorie target · optional</label><input id="profile-calorie-goal" name="calorieGoal" type="number" min="1200" max="6000" step="1" value="${p.calorieGoal ? esc(p.calorieGoal) : ""}" placeholder="${goal.estimatedCalories} (auto estimate)"><small>Set a personal target from 1,200–6,000 kcal. Leave blank to use your profile estimate. Macro targets scale with this choice.</small></div>
      <div class="field full"><label for="profile-ai-endpoint">Secure AI proxy URL · optional</label><input id="profile-ai-endpoint" name="aiEndpoint" type="url" inputmode="url" maxlength="300" value="${esc(state.aiEndpoint)}" placeholder="https://your-worker.your-subdomain.workers.dev/chat"><small>Enter the /chat URL for your deployed NutriTrack Cloudflare Worker. OpenAI API keys must stay in the Worker secret settings—never paste a key here or in browser code. Without a configured endpoint, chat uses the local demo.</small></div>
      <div class="field"><label for="profile-diet">Dietary preference</label><select id="profile-diet" name="diet">${["No preference", "Vegetarian", "Vegan", "Eggetarian", "Pescatarian"].map((diet) => `<option ${p.diet === diet ? "selected" : ""}>${diet}</option>`).join("")}</select></div>
      <div class="field"><label for="profile-cuisine">Preferred cuisine</label><select id="profile-cuisine" name="cuisine">${["South Indian", "North Indian", "Maharashtrian", "Bengali", "Gujarati", "Punjabi", "Coastal Indian", "Any cuisine"].map((cuisine) => `<option ${p.cuisine === cuisine ? "selected" : ""}>${cuisine}</option>`).join("")}</select></div>
      <div class="field full"><label for="profile-allergies">Allergies or foods to avoid</label><input id="profile-allergies" name="allergies" value="${esc(p.allergies)}" maxlength="200" placeholder="e.g. peanuts, dairy"><small>Recommendations use basic keyword matching only. Always verify ingredients and cross-contamination independently.</small></div>
      </div><div class="form-actions"><button class="primary-button">Save my profile</button></div></form>`;
    const summary = `<div class="target-summary"><strong>${goal.manual ? "Your manual daily targets" : "Daily estimates"}</strong>${[["Calories", `${goal.calories} kcal`], ["Protein", `${goal.protein} g`], ["Carbohydrates", `${goal.carbs} g`], ["Fat", `${goal.fat} g`]].map(([label, value]) => `<div class="target-row"><span>${label}</span><b>${value}</b></div>`).join("")}</div>${calorieGoalControlMarkup(goal)}
      <p class="disclaimer" style="margin-top:12px">${goal.manual ? `Your calorie goal is manually set. Your macro targets are scaled from it using the same 25/45/30% split.` : `Estimated with Mifflin–St Jeor BMR × activity factor. Gender-unspecified uses a midpoint constant; goal adjustment is −400/0/+250 kcal and macros are 25/45/30% of calories.`} These are broad adult estimates, not medical guidance. Consult a qualified professional for personalized care.</p>`;
    return `${heading("Your profile", "Personalize your estimates and discover meals that fit your preferences.")}
      <div class="profile-layout"><section class="card">${cardTitle("A little about you", "All fields stay in this browser on this device")}${profileForm}</section>
      <aside class="grid"><section class="card">${cardTitle(goal.manual ? "Your target guidance" : "How targets are estimated", goal.manual ? "Manual calorie target and scaled macros" : "Transparent, adjustable guidance")}${summary}<div class="callout" style="margin-top:12px">Calorie needs vary widely. The 1,200 kcal minimum is a conservative app floor, not a recommendation. Seek advice from a registered dietitian or clinician if you have a medical condition, are pregnant, or are under 18.</div></section>
      <section class="card">${cardTitle("Your data & privacy", "No account or cloud-synced storage")}<p class="card-subtitle">Profile, food log, saved custom foods, planner, favorites and check-ins are stored in this browser's local storage and are not synced. If OpenAI is configured, chat messages go to OpenAI through the Worker; food names and nutrition totals are sent only when you opt in in chat. Anyone using this browser profile may be able to access local data. This is not secure health-record storage.</p><div class="heading-actions" style="margin-top:15px"><button class="secondary-button small-button" data-action="export-data">Export my data</button><button class="danger-button small-button" data-action="delete-data">Delete all local data</button></div><p class="disclaimer" style="margin-top:12px">Deleting local data cannot revoke screenshots, downloads or browser backups. Exported JSON files may contain sensitive personal information.</p></section></aside></div>`;
  }

  function openModal(title, subtitle, body) {
    const root = $("#modal-root");
    $$(".modal-backdrop", root).forEach((modal) => modal.remove());
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML = `<section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-head"><div><h2 id="modal-title">${esc(title)}</h2><p>${esc(subtitle)}</p></div><button class="icon-button" data-action="close-modal" aria-label="Close dialog">×</button></div>${body}</section>`;
    root.append(backdrop);
    backdrop.addEventListener("click", (event) => { if (event.target === backdrop) backdrop.remove(); });
    $("input, select, textarea, button", backdrop)?.focus();
  }

  function foodFormMarkup(food = null, meal = null, preset = {}) {
    const initialServing = Math.max(.25, num(meal?.servingCount ?? preset.servingCount, 1));
    const nutritionKeys = ["calories", "protein", "carbs", "fat", "fiber", "sugar"];
    const source = meal
      ? { ...meal, ...Object.fromEntries(nutritionKeys.map((key) => [key, num(meal[key]) / initialServing])) }
      : { ...(food || {}), ...preset };
    return `<form id="food-form"><input type="hidden" name="id" value="${esc(meal?.id || "")}"><input type="hidden" name="foodId" value="${esc(meal?.foodId || food?.id || source.foodId || "")}"><input type="hidden" name="emoji" value="${esc(meal?.emoji || food?.emoji || source.emoji || "🍽️")}">
      <div class="form-grid"><div class="field full"><label for="food-name">Food or meal name</label><input id="food-name" name="name" maxlength="80" required value="${esc(source.name || "")}" placeholder="e.g. Home-style vegetable curry"></div>
      <div class="field"><label for="food-type">Meal</label><select id="food-type" name="mealType">${MEAL_TYPES.map((type) => `<option ${source.mealType === type || (!source.mealType && type === "Snack") ? "selected" : ""}>${type}</option>`).join("")}</select></div>
      <div class="field"><label for="food-serving">Portions</label><input id="food-serving" name="servingCount" type="number" min="0.25" max="10" step="0.25" value="${esc(initialServing)}" required></div>
      ${[["calories", "Calories · kcal"], ["protein", "Protein · g"], ["carbs", "Carbohydrates · g"], ["fat", "Fat · g"], ["fiber", "Fiber · g"], ["sugar", "Sugar · g"]].map(([name, label]) => `<div class="field"><label for="food-${name}">${label} per portion</label><input id="food-${name}" name="${name}" type="number" min="0" max="${name === "calories" ? 5000 : 500}" step="0.1" value="${esc(num(source[name]))}" required></div>`).join("")}
      </div><p class="disclaimer">Nutrition values are approximate estimates per portion. Review ingredient labels when relevant.</p><div class="form-actions"><button type="button" class="secondary-button" data-action="close-modal">Cancel</button><button class="primary-button">${meal ? "Save changes" : "Add to food log"}</button></div></form>`;
  }

  function addFoodModal(food = null, meal = null, preset = {}) {
    const source = meal ? { ...meal, servingCount: meal.servingCount || 1 } : { ...(food || {}), ...preset, servingCount: preset.servingCount || 1 };
    openModal(meal ? "Edit food entry" : "Log a food or custom meal", "Add approximate nutrition values for one portion. Your entries stay on this device.", foodFormMarkup(food ? { ...food, ...source } : null, meal, food ? {} : source));
  }

  function addMealEntry(values) {
    const servingCount = Math.max(.25, Math.min(10, num(values.servingCount, 1)));
    const meal = {
      id: values.id || newId(),
      foodId: values.foodId || "",
      name: values.name.trim().slice(0, 80),
      emoji: values.emoji || "🍽️",
      mealType: values.mealType || "Snack",
      servingCount,
      serving: `${servingCount} ${servingCount === 1 ? "portion" : "portions"}`,
      calories: round(num(values.calories) * servingCount),
      protein: round(num(values.protein) * servingCount * 10) / 10,
      carbs: round(num(values.carbs) * servingCount * 10) / 10,
      fat: round(num(values.fat) * servingCount * 10) / 10,
      fiber: round(num(values.fiber) * servingCount * 10) / 10,
      sugar: round(num(values.sugar) * servingCount * 10) / 10
    };
    const day = dayFor();
    const index = day.meals.findIndex((entry) => entry.id === meal.id);
    if (index >= 0) day.meals[index] = meal;
    else day.meals.push(meal);
    if (save()) {
      $("#modal-root").querySelector(".modal-backdrop")?.remove();
      render();
      toast(index >= 0 ? "Food entry updated." : "Food added to your log.");
    }
  }

  function addLibraryFood(id) {
    const food = foodLibrary().find((item) => item.id === id);
    if (!food) return;
    addFoodModal(food, null, { mealType: food.category === "Snack" ? "Snack" : food.category, emoji: food.emoji, servingCount: 1 });
  }

  function customFoodModal(food = null) {
    const values = food || { name: "", serving: "1 serving", category: "Snack", calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 };
    const fields = [["calories", "Calories · kcal", 5000], ["protein", "Protein · g", 500], ["carbs", "Carbohydrates · g", 500], ["fat", "Fat · g", 500], ["fiber", "Fiber · g", 500], ["sugar", "Sugar · g", 500]];
    openModal(food ? "Edit saved custom food" : "Create a custom food", "Save a food and its per-serving nutrition here. It will be available from search whenever you log meals.", `<form id="custom-food-form"><input type="hidden" name="id" value="${esc(food?.id || "")}"><div class="form-grid"><div class="field full"><label for="custom-food-name">Food name</label><input id="custom-food-name" name="name" maxlength="80" required value="${esc(values.name)}" placeholder="e.g. Homemade ragi dosa"></div><div class="field"><label for="custom-food-serving">Serving size / portion</label><input id="custom-food-serving" name="serving" maxlength="50" required value="${esc(values.serving)}" placeholder="e.g. 2 dosa · 150 g"></div><div class="field"><label for="custom-food-category">Meal category</label><select id="custom-food-category" name="category">${MEAL_TYPES.map((type) => `<option ${values.category === type ? "selected" : ""}>${type}</option>`).join("")}</select></div>${fields.map(([name, label, max]) => `<div class="field"><label for="custom-food-${name}">${label} per serving</label><input id="custom-food-${name}" name="${name}" type="number" min="0" max="${max}" step="0.1" value="${esc(num(values[name]))}" required></div>`).join("")}</div><p class="disclaimer">Enter your best estimate for one serving. Values are saved on this device and are not verified nutrition data.</p><div class="form-actions"><button type="button" class="secondary-button" data-action="close-modal">Cancel</button><button class="primary-button">${food ? "Save custom food" : "Save to my foods"}</button></div></form>`);
  }

  function saveCustomFood(values) {
    const id = String(values.id || "");
    const name = String(values.name || "").trim().slice(0, 80);
    const serving = String(values.serving || "").trim().slice(0, 50);
    if (!name || !serving || !MEAL_TYPES.includes(values.category)) return toast("Enter a food name, serving size, and meal category.", true);
    if (id && !state.customFoods.some((food) => food.id === id)) return toast("That saved custom food could not be found. Search again and retry.", true);
    const duplicate = state.customFoods.find((food) => food.name.toLocaleLowerCase() === name.toLocaleLowerCase() && food.id !== id);
    if (duplicate) return toast("A saved custom food already uses that name. Edit that food instead.", true);
    if (!id && state.customFoods.length >= 100) return toast("You can save up to 100 custom foods on this device.", true);
    const food = {
      id: id || `custom-${newId()}`,
      name,
      emoji: "🍽️",
      serving,
      category: values.category,
      calories: round(num(values.calories)),
      protein: round(num(values.protein) * 10) / 10,
      carbs: round(num(values.carbs) * 10) / 10,
      fat: round(num(values.fat) * 10) / 10,
      fiber: round(num(values.fiber) * 10) / 10,
      sugar: round(num(values.sugar) * 10) / 10,
      custom: true
    };
    const index = state.customFoods.findIndex((entry) => entry.id === id);
    const previous = index >= 0 ? state.customFoods[index] : null;
    if (index >= 0) state.customFoods[index] = food;
    else state.customFoods.push(food);
    if (save()) {
      $("#modal-root").querySelector(".modal-backdrop")?.remove();
      render();
      toast(index >= 0 ? `${name} updated in your saved foods.` : `${name} saved. Search for it whenever you log food.`);
    } else if (index >= 0) {
      state.customFoods[index] = previous;
    } else {
      state.customFoods.pop();
    }
  }

  function confirmDeleteCustomFood(id) {
    const food = state.customFoods.find((item) => item.id === id);
    if (!food) return toast("That saved custom food could not be found.", true);
    openModal(`Remove ${food.name}?`, "This removes it from your saved food search and favorites. Previously logged entries will stay in your diary.", `<p class="callout">You can add it again later from Search foods. Existing food logs will not be changed.</p><div class="form-actions"><button class="secondary-button" data-action="close-modal">Keep food</button><button class="danger-button" data-action="confirm-delete-custom-food" data-id="${esc(id)}">Remove saved food</button></div>`);
  }

  function repeatFood(id, date) {
    const meal = state.entries[date]?.meals?.find((entry) => entry.id === id);
    if (!meal) return toast("That previous food entry is no longer available.", true);
    const servings = Math.max(.25, num(meal.servingCount, 1));
    const preset = {
      ...meal,
      servingCount: servings,
      ...Object.fromEntries(["calories", "protein", "carbs", "fat", "fiber", "sugar"].map((key) => [key, num(meal[key]) / servings]))
    };
    const food = foodLibrary().find((item) => item.id === meal.foodId);
    addFoodModal(food ? { ...food, ...preset } : null, null, preset);
  }

  function recipeDetails(id) {
    const recipe = RECIPES.find((item) => item.id === id);
    if (!recipe) return;
    const saved = state.savedRecipes.includes(id);
    openModal(recipe.name, `${recipe.calories} kcal estimate · ${recipe.prep} min · ${recipe.serving}`, `<div class="recipe-card"><div class="recipe-emoji">${esc(recipe.emoji)}</div><div class="recipe-copy"><strong>${recipe.protein}g protein · ${recipe.carbs}g carbs · ${recipe.fat}g fat</strong><p>${recipe.tags.map(esc).join(" · ")}</p></div></div><h3 class="card-title" style="margin:18px 0 8px">Ingredients</h3><ul>${recipe.ingredients.map((item) => `<li style="margin:7px 0;font-size:11px">${esc(item)}</li>`).join("")}</ul><h3 class="card-title" style="margin:18px 0 8px">Method</h3><ol>${recipe.instructions.map((step) => `<li style="margin:7px 0;font-size:11px;line-height:1.55">${esc(step)}</li>`).join("")}</ol><p class="disclaimer">Recipe and nutrition estimates are illustrative; adapt ingredients to your needs and check allergens.</p><div class="form-actions"><button class="secondary-button" data-action="save-recipe" data-id="${esc(id)}">${saved ? "♥ Saved recipe" : "♡ Save recipe"}</button><button class="primary-button" data-action="plan-recipe" data-id="${esc(id)}">Add to planner</button></div>`);
  }

  function planRecipe(id, date = activeDate, mealType = "Lunch") {
    const recipe = RECIPES.find((item) => item.id === id);
    if (!recipe) return;
    const key = dateKey(date);
    state.planner[key] ||= { meals: [] };
    state.planner[key].meals ||= [];
    state.planner[key].meals.push({ ...recipe, id: newId(), recipeId: recipe.id, mealType, servingCount: 1 });
    if (save()) {
      $("#modal-root").querySelector(".modal-backdrop")?.remove();
      activePage = "planner";
      render();
      toast(`${recipe.name} added to ${prettyDate(date)}.`);
    }
  }

  function quickPlanDialog(id) {
    openModal("Add meal to planner", "Choose which meal this recipe belongs with.", `<form id="plan-form"><input type="hidden" name="recipeId" value="${esc(id)}"><div class="field"><label for="plan-meal-type">Meal</label><select id="plan-meal-type" name="mealType">${MEAL_TYPES.map((type) => `<option ${type === "Lunch" ? "selected" : ""}>${type}</option>`).join("")}</select></div><div class="form-actions"><button type="button" class="secondary-button" data-action="close-modal">Cancel</button><button class="primary-button">Add to ${esc(prettyDate(activeDate).split(",")[0])}</button></div></form>`);
  }

  function adjustPlan(id) {
    const day = state.planner[dateKey(activeDate)];
    const meal = day?.meals?.find((entry) => entry.id === id);
    if (!meal) return;
    const count = num(meal.servingCount, 1);
    openModal("Adjust portions", `Change the planned serving size for ${meal.name}.`, `<form id="portion-form"><input type="hidden" name="id" value="${esc(id)}"><div class="field"><label for="portion-count">Portions</label><input id="portion-count" name="servingCount" type="number" min="0.25" max="10" step="0.25" value="${count}" required></div><div class="form-actions"><button type="button" class="secondary-button" data-action="close-modal">Cancel</button><button class="primary-button">Save portions</button></div></form>`);
  }

  function replacePlan(id) {
    const day = state.planner[dateKey(activeDate)];
    const meal = day?.meals?.find((entry) => entry.id === id);
    if (!meal) return;
    const candidates = RECIPES.filter((recipe) => recipe.id !== (meal.recipeId || meal.id) && !dietExcluded(recipe) && recipe.calories <= meal.calories);
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    if (!next) return toast("No replacement recipe within this meal's estimated calories.", true);
    Object.assign(meal, { ...next, id: meal.id, recipeId: next.id, mealType: meal.mealType, servingCount: 1 });
    if (save()) { render(); toast(`Replaced with ${next.name}, within the previous meal's calorie estimate.`); }
  }

  function addRecipeToLog(id) {
    const recipe = RECIPES.find((item) => item.id === id);
    if (!recipe) return;
    const day = dayFor();
    day.meals.push({ ...recipe, id: newId(), mealType: "Snack", servingCount: 1, serving: recipe.serving });
    if (save()) { render(); toast(`${recipe.name} added to today's food log.`); }
  }

  function toggleFavorite(id) {
    state.favorites = state.favorites.includes(id) ? state.favorites.filter((item) => item !== id) : [...state.favorites, id];
    if (save()) render();
  }

  function handleClick(event) {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const { action, id, page } = button.dataset;
    if (action === "navigate") { activePage = page; render(); return; }
    if (action === "adjust-calorie-goal") { adjustCalorieGoal(button.dataset.delta); return; }
    if (action === "assistant") { openAssistant(); return; }
    if (action === "assistant-prompt") { submitAssistantPrompt(button.dataset.prompt || id); return; }
    if (action === "assistant-water") {
      dayFor().water = Math.max(0, dayFor().water + num(id));
      if (save()) { render(); assistantMessages.push({ role: "assistant", text: `${num(id)} ml added to your ${prettyDate(activeDate)} water check-in.` }); renderAssistantMessages(); toast("Water check-in updated."); }
      return;
    }
    if (action === "assistant-log-recipe") {
      const recipe = RECIPES.find((item) => item.id === id);
      const remaining = targets().calories - totalsFor().calories;
      if (!recipe || recipe.calories > Math.max(0, remaining) || dietExcluded(recipe)) {
        assistantMessages.push({ role: "assistant", text: "That recipe no longer fits the remaining calorie estimate or your current preference filter, so I didn't add it. Ask me for an updated suggestion instead." });
        renderAssistantMessages();
        return;
      }
      const meal = { ...recipe, id: newId(), mealType: "Snack", servingCount: 1, serving: recipe.serving };
      dayFor().meals.push(meal);
      if (save()) {
        render();
        assistantMessages.push({ role: "assistant", text: `${recipe.name} was added to today's food log. Your dashboard suggestions now reflect the updated totals.` });
        renderAssistantMessages();
        toast(`${recipe.name} added to today's food log.`);
      } else {
        dayFor().meals = dayFor().meals.filter((entry) => entry.id !== meal.id);
      }
      return;
    }
    if (action === "theme") { state.theme = state.theme === "dark" ? "light" : "dark"; if (save()) render(); return; }
    if (action === "add-food") { addFoodModal(); return; }
    if (action === "close-modal") { button.closest(".modal-backdrop")?.remove(); return; }
    if (action === "food-category") { foodCategory = button.dataset.category; render(); return; }
    if (action === "create-custom-food") { customFoodModal(); return; }
    if (action === "edit-custom-food") {
      const food = state.customFoods.find((item) => item.id === id);
      if (food) customFoodModal(food);
      return;
    }
    if (action === "delete-custom-food") { confirmDeleteCustomFood(id); return; }
    if (action === "add-library-food") { addLibraryFood(id); return; }
    if (action === "favorite-food") { toggleFavorite(id); return; }
    if (action === "repeat-food") { repeatFood(id, button.dataset.date); return; }
    if (action === "edit-meal") {
      const meal = dayFor().meals.find((entry) => entry.id === id);
      if (meal) addFoodModal(null, meal);
      return;
    }
    if (action === "delete-meal") {
      const day = dayFor();
      day.meals = day.meals.filter((meal) => meal.id !== id);
      if (save()) { render(); toast("Food entry removed."); }
      return;
    }
    if (action === "water") {
      dayFor().water = Math.max(0, dayFor().water + num(button.dataset.amount));
      if (save()) render();
      return;
    }
    if (action === "pick-date") { datePicker(); return; }
    if (action === "barcode-lookup") { lookupBarcode(); return; }
    if (action === "photo-estimate") { addFoodModal(null, null, { mealType: "Snack", emoji: "📷" }); return; }
    if (action === "recipe-details") { recipeDetails(id); return; }
    if (action === "plan-recipe") { quickPlanDialog(id); return; }
    if (action === "add-recipe-log") { addRecipeToLog(id); return; }
    if (action === "save-recipe") {
      state.savedRecipes = state.savedRecipes.includes(id) ? state.savedRecipes.filter((value) => value !== id) : [...state.savedRecipes, id];
      if (save()) recipeDetails(id);
      return;
    }
    if (action === "remove-saved-recipe") {
      state.savedRecipes = state.savedRecipes.filter((value) => value !== id);
      if (save()) render();
      return;
    }
    if (action === "planner-date") {
      const [year, month, day] = button.dataset.date.split("-").map(Number);
      activeDate = new Date(year, month - 1, day);
      render(); return;
    }
    if (action === "regenerate") { recipeShuffle += 1; render(); toast("Fresh local recipe ideas are ready."); return; }
    if (action === "adjust-plan") { adjustPlan(id); return; }
    if (action === "replace-plan") { replacePlan(id); return; }
    if (action === "remove-plan") {
      const day = state.planner[dateKey(activeDate)];
      if (day) day.meals = day.meals.filter((meal) => meal.id !== id);
      if (save()) { render(); toast("Meal removed from your plan."); }
      return;
    }
    if (action === "clear-shopping") {
      state.shoppingChecks = {};
      if (save()) render();
      return;
    }
    if (action === "period") { progressPeriod = num(button.dataset.days, 7); render(); return; }
    if (action === "weekly-report") { weeklyReport(); return; }
    if (action === "remove-weight") {
      state.weights = state.weights.filter((entry) => entry.id !== id);
      if (save()) render();
      return;
    }
    if (action === "export-data") { exportData(); return; }
    if (action === "delete-data") { deleteData(); return; }
  }

  function datePicker() {
    openModal("Choose a day", "Review or log meals for a specific date.", `<div class="field"><label for="date-value">Date</label><input id="date-value" type="date" value="${dateKey(activeDate)}"></div><div class="form-actions"><button class="secondary-button" data-action="close-modal">Cancel</button><button class="primary-button" data-action="set-date">Open day</button></div>`);
  }

  function lookupBarcode() {
    const input = $("#barcode-input");
    const barcode = input?.value.trim();
    const foodId = BARCODE_DEMO[barcode];
    if (!foodId) return toast("No match in the small local demo catalogue. Try food search instead.", true);
    addLibraryFood(foodId);
  }

  function weeklyReport() {
    const dates = Array.from({ length: 7 }, (_, i) => shiftDate(new Date(), i - 6));
    const logged = dates.map((date) => {
      const meals = state.entries[dateKey(date)]?.meals || [];
      return { date, meals, calories: meals.reduce((sum, meal) => sum + num(meal.calories), 0) };
    }).filter((day) => day.meals.length);
    const average = logged.length ? round(logged.reduce((sum, day) => sum + day.calories, 0) / logged.length) : 0;
    const proteinAverage = logged.length ? round(logged.reduce((sum, day) => sum + day.meals.reduce((v, meal) => v + num(meal.protein), 0), 0) / logged.length) : 0;
    const goal = targets();
    openModal("Your 7-day check-in", "A simple reflection from food you've logged in this browser.", `<div class="target-summary"><strong>${logged.length ? `${logged.length} of 7 days have food logged` : "No meals logged in the last seven days"}</strong><div class="target-row"><span>Average logged energy</span><b>${average ? `${average} kcal/day` : "—"}</b></div><div class="target-row"><span>Average logged protein</span><b>${proteinAverage ? `${proteinAverage} g/day` : "—"}</b></div><div class="target-row"><span>${goal.manual ? "Personal daily energy target" : "Estimated daily energy target"}</span><b>${goal.calories} kcal</b></div></div><p class="disclaimer" style="margin-top:13px">This is a descriptive local summary, not an assessment of health or goal success. Incomplete food logs cannot reflect everything you ate. A healthcare professional can help interpret nutrition data in context.</p><div class="form-actions"><button class="primary-button" data-action="close-modal">Done</button></div>`);
  }

  function exportData() {
    const content = JSON.stringify({ app: "NutriTrack AI local demo", exportedAt: new Date().toISOString(), data: state }, null, 2);
    const url = URL.createObjectURL(new Blob([content], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `nutritrack-data-${dateKey()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast("Your local data export was downloaded.");
  }

  function deleteData() {
    openModal("Delete all local data?", "This permanently removes your profile, food log, saved custom foods, plans, favorites and weight check-ins from this browser.", `<p class="callout">There is no account or cloud copy to delete. Download an export first if you'd like to keep a copy.</p><div class="form-actions"><button class="secondary-button" data-action="close-modal">Keep my data</button><button class="danger-button" data-action="confirm-delete">Delete everything</button></div>`);
  }

  function handleSubmit(event) {
    const form = event.target;
    const formId = form?.getAttribute("id");
    if (!formId) return;
    if (formId === "assistant-form") {
      event.preventDefault();
      if (!form.reportValidity()) return;
      submitAssistantPrompt(new FormData(form).get("prompt"));
      return;
    }
    if (formId === "food-form") {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = Object.fromEntries(new FormData(form).entries());
      const foodId = data.foodId;
      const food = FOODS.find((item) => item.id === foodId);
      addMealEntry({ ...data, emoji: food?.emoji || data.emoji || "🍽️" });
      return;
    }
    if (formId === "custom-food-form") {
      event.preventDefault();
      if (!form.reportValidity()) return;
      saveCustomFood(Object.fromEntries(new FormData(form).entries()));
      return;
    }
    if (formId === "profile-form") {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const values = Object.fromEntries(new FormData(form).entries());
      const aiEndpoint = String(values.aiEndpoint || "").trim();
      delete values.aiEndpoint;
      const numbers = ["age", "height", "weight", "targetWeight", "activity", "calorieGoal"];
      numbers.forEach((key) => { values[key] = num(values[key]); });
      if (values.age < 15 || values.age > 100 || values.height < 100 || values.height > 230 || values.weight < 30 || values.weight > 300 || values.targetWeight < 30 || values.targetWeight > 300 || (values.calorieGoal !== 0 && (values.calorieGoal < 1200 || values.calorieGoal > 6000))) return toast("Check the entered age, height, weight, and optional 1,200–6,000 kcal target ranges.", true);
      if (aiEndpoint) {
        try {
          const endpoint = new URL(aiEndpoint);
          if ((endpoint.protocol !== "https:" && !(endpoint.protocol === "http:" && ["localhost", "127.0.0.1"].includes(endpoint.hostname))) || endpoint.username || endpoint.password || endpoint.pathname !== "/chat" || endpoint.search || endpoint.hash) throw new Error("invalid endpoint");
        } catch {
          return toast("Use your secure HTTPS Cloudflare Worker URL. HTTP is allowed only for localhost testing.", true);
        }
      }
      state.profile = { ...state.profile, ...values };
      state.aiEndpoint = aiEndpoint;
      if (save()) { render(); toast(aiEndpoint ? "Your profile, calorie target, and assistant settings are updated." : values.calorieGoal ? "Your profile and personal calorie target are updated." : "Your profile and estimated targets are updated."); }
      return;
    }
    if (formId === "plan-form") {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form).entries());
      planRecipe(values.recipeId, activeDate, values.mealType);
      return;
    }
    if (formId === "portion-form") {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form).entries());
      const day = state.planner[dateKey(activeDate)];
      const meal = day?.meals?.find((entry) => entry.id === values.id);
      if (!meal) return;
      const previous = Math.max(.25, num(meal.servingCount, 1));
      const next = Math.max(.25, Math.min(10, num(values.servingCount, 1)));
      const ratio = next / previous;
      ["calories", "protein", "carbs", "fat", "fiber"].forEach((key) => { meal[key] = Math.round(num(meal[key]) * ratio * 10) / 10; });
      meal.servingCount = next;
      meal.serving = `${next} ${next === 1 ? "serving" : "servings"}`;
      if (save()) { $("#modal-root").querySelector(".modal-backdrop")?.remove(); render(); }
      return;
    }
    if (formId === "weight-form") {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const weight = num(new FormData(form).get("weight"));
      if (weight < 30 || weight > 300) return toast("Enter a weight between 30 and 300 kg.", true);
      state.weights.push({ id: newId(), date: dateKey(), weight: round(weight * 10) / 10 });
      if (save()) { render(); toast("Weight check-in saved on this device."); }
    }
  }

  function handleChange(event) {
    const target = event.target;
    if (target.matches("#food-search")) { foodSearch = target.value; render(); const search = $("#food-search"); search?.focus(); search?.setSelectionRange(search.value.length, search.value.length); }
    if (target.matches("[data-action='shopping-check']")) {
      const key = target.dataset.key;
      if (target.checked) state.shoppingChecks[key] = true;
      else delete state.shoppingChecks[key];
      if (save()) render();
    }
    if (target.matches("#food-photo")) previewPhoto(target);
    if (target.matches("#date-value")) target.dataset.value = target.value;
  }

  function previewPhoto(input) {
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast("Choose an image file.", true);
    if (file.size > 5 * 1024 * 1024) return toast("Choose an image under 5 MB.", true);
    const reader = new FileReader();
    reader.onload = () => {
      const preview = $("#photo-preview");
      if (!preview) return;
      preview.innerHTML = `<img class="preview-image" alt="Selected food photo preview" src="${esc(reader.result)}"><p class="disclaimer">Local preview only. No AI identification is available; enter any nutrition estimate yourself.</p>`;
    };
    reader.onerror = () => toast("That image could not be previewed.", true);
    reader.readAsDataURL(file);
  }

  function handleModalActions(event) {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    if (button.dataset.action === "set-date") {
      const value = $("#date-value")?.value;
      if (!value) return toast("Choose a date first.", true);
      const [year, month, day] = value.split("-").map(Number);
      activeDate = new Date(year, month - 1, day);
      button.closest(".modal-backdrop")?.remove();
      render();
    }
    if (button.dataset.action === "confirm-delete") {
      try { localStorage.removeItem(STORE_KEY); } catch (error) { console.error("Could not remove local data.", error); return toast("Browser storage couldn't remove the data.", true); }
      state = defaultState();
      assistantMessages = [];
      activeDate = new Date();
      activePage = "dashboard";
      button.closest(".modal-backdrop")?.remove();
      render();
      toast("All NutriTrack data was deleted from this browser.");
    }
    if (button.dataset.action === "confirm-delete-custom-food") {
      const index = state.customFoods.findIndex((food) => food.id === button.dataset.id);
      if (index < 0) return toast("That saved custom food could not be found.", true);
      const [removed] = state.customFoods.splice(index, 1);
      const wasFavorite = state.favorites.includes(removed.id);
      state.favorites = state.favorites.filter((favorite) => favorite !== removed.id);
      if (save()) {
        button.closest(".modal-backdrop")?.remove();
        render();
        toast(`${removed.name} removed from your saved foods. Existing logs were kept.`);
      } else {
        state.customFoods.splice(index, 0, removed);
        if (wasFavorite) state.favorites.push(removed.id);
      }
    }
  }

  document.addEventListener("click", handleClick);
  document.addEventListener("click", handleModalActions);
  $("#app").addEventListener("submit", handleSubmit, true);
  $("#modal-root").addEventListener("submit", handleSubmit, true);
  document.addEventListener("change", handleChange);
  document.addEventListener("input", handleChange);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") $$(".modal-backdrop").forEach((modal) => modal.remove()); });
  render();
})();
