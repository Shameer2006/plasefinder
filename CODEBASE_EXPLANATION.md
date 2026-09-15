# CODEBASE_EXPLANATION.md: Complete Architectural Reference & Change History for AI Models

> **TARGET AUDIENCE**: AI Coding Agents, LLMs (Gemini, Claude, GPT, Antigravity, Copilot), and Software Engineers.  
> **PURPOSE**: Provide an authoritative, in-depth explanation of the codebase architecture, design patterns, state lifecycles, and chronological evolution of previous changes to maximize model reasoning accuracy and prevent regressions.  
> **APPLICATION**: **LostStreet** (also referred to as *Placefinder* or *clone*) — 100% Free 360° Street View Geography Guessing Game & World Detective.  
> **PRODUCTION DOMAIN**: [https://www.loststreet.online](https://www.loststreet.online)  
> **PRIMARY WORKSPACE DIRECTORY**: `d:\placefinder\clone` (Next.js web app) & `d:\placefinder\seo-ai-agent` (Python SEO pipeline).

---

## 1. Executive Summary & Technology Stack

LostStreet is a high-performance web geography game inspired by GeoGuessr, built from the ground up to be **100% free with no paywalls or account gates**. Players are dropped into high-definition 360° Google Street View panoramas across 195+ countries and must deduce their exact location using real-world meta clues (camera generations, bollards, utility pole holes, license plates, road striping, sun angle, and scripts).

### Technology Matrix
| Domain | Technology / Library | Version / Details | Role & Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `^16.2.9` | Server-side rendering, API route handlers, image optimization, dynamic imports. |
| **UI Library** | React | `^19.2.4` | Component tree, concurrent rendering, dynamic transitions. |
| **Styling** | Tailwind CSS & Vanilla CSS | `@tailwindcss/postcss ^4.3.1`, `globals.css` | Modular styling, responsive mobile HUD layouts, dark-mode glassmorphism. |
| **360° Panorama** | Google Maps JavaScript API | `@googlemaps/js-api-loader ^2.1.1` | StreetViewPanorama rendering, custom camera POV, UI controls suppression. |
| **Interactive Map** | Leaflet & React-Leaflet | `leaflet ^1.9.4`, `react-leaflet ^5.0.0` | In-game guessing minimap, pin placement, polyline distance rendering, results review. |
| **Global State** | Zustand | `^5.0.14` | Client-side game state machine, user settings, coin economy, localStorage persistence. |
| **Backend & Auth** | Firebase Client & Admin SDK | `firebase ^12.15.0`, `firebase-admin ^14.1.0` | Google OAuth, anonymous auth, Firestore real-time matchmaking & lobbies. |
| **Animations** | DotLottie React | `@lottiefiles/dotlottie-react ^0.19.10` | React 19-compatible lightweight vector animations (coins, celebrations). |
| **Audio Synthesizer**| Web Audio API (`src/lib/sounds.js`) | Custom zero-dependency SoundEngine | Procedural audio tones (clicks, ticks, fanfare, victory, defeat) — zero asset bandwidth. |
| **Email Delivery** | Nodemailer | `^9.0.5` | Automated transactional welcome emails for new authenticated users. |
| **Monetization & Ads**| Google AdSense & H5 Games Ads | `ca-pub-1006713173738488`, `src/lib/useH5Ads.js` | Auto-ads, high-value content compliance, interstitial game break ads. |
| **SEO Pipeline** | Python SEO/AEO Agent | `seo-ai-agent/` (Python 3.10+) | Autonomous SEO audit, schema markup generator, Google Search Console analytics, LLM optimization. |

---

## 2. Directory Architecture & File Map

The root project directory `d:\placefinder` contains two primary sub-projects:

```
d:\placefinder\
├── clone/                   # Main Production Web Application (Next.js 16 + React 19)
│   ├── public/              # Static assets, chunked location datasets, icons, llms.txt
│   │   ├── locations/       # Chunked location databases (_index.json + continent chunks)
│   │   ├── guides/          # Visual guide diagrams, bollards, camera gen images
│   │   ├── llms.txt         # Standardized summary for AI search engines & LLM crawlers
│   │   └── llms-full.txt    # In-depth knowledge base for LLM search indexing
│   ├── src/
│   │   ├── app/             # Next.js App Router structure (pages, layouts, API routes)
│   │   │   ├── api/         # Backend serverless API routes
│   │   │   ├── components/  # React UI & game engine components
│   │   │   ├── flag-guesser/# Dedicated Flag Guesser route
│   │   │   ├── guides/      # 13 Pro Masterclass educational articles (AdSense/SEO)
│   │   │   ├── leaderboard/ # Global ELO leaderboards
│   │   │   ├── community/   # Community & social feed
│   │   │   ├── privacy/     # GDPR/CCPA compliant privacy policy
│   │   │   ├── terms/       # Terms of service
│   │   │   ├── layout.js    # Root HTML layout, metadata, analytics, AdSense script
│   │   │   └── page.js      # Main game lobby, hero menu, and game orchestrator
│   │   └── lib/             # Shared client & server utilities
│   │       ├── store.js          # Zustand global game store
│   │       ├── locationManager.js# Location prefetching & country pool caching
│   │       ├── matchmaking.js    # Firebase matchmaking & party lobby transactions
│   │       ├── coins.js          # Virtual currency economy logic
│   │       ├── dailyReward.js    # 7-day streak rewards calendar logic
│   │       ├── sounds.js         # Web Audio API procedural sound synthesizer
│   │       ├── firebase.js       # Client Firebase initialization
│   │       ├── firebaseAdmin.js  # Server Firebase Admin initialization
│   │       ├── userProfile.js    # Firestore user profile, stats, and XP calculations
│   │       └── useH5Ads.js       # Google AdSense H5 games ads integration
│   ├── AGENTS.md            # Directives for AI coding agents
│   ├── CLAUDE.md            # Directives for Claude & cursor tools
│   ├── next.config.mjs      # Next.js compiler & caching config
│   └── package.json         # Dependencies & scripts
└── seo-ai-agent/            # Autonomous Python SEO & AEO Analysis Tooling
    ├── agent.py             # Autonomous agent loop
    ├── main.py              # CLI entry point (analyze, optimize, sync-llms)
    ├── ingestion/           # Sitemap & page scraper
    ├── analytics/           # GSC (Google Search Console) data ingestion
    └── mutator/             # Schema.org JSON-LD & meta tag injector
```

---

## 3. Core Subsystems & Technical Deep Dive

### 3.1 Game State Machine & Zustand Store (`src/lib/store.js`)
The game state is managed centrally with **Zustand** using the `persist` middleware configured for `localStorage` (`game-storage`).

- **Game States**:
  - `MENU`: Main home screen with hero panorama, game modes, and stats.
  - `LOADING`: Fetching Street View coordinates, pre-warming tiles, or joining matchmaking.
  - `PLAYING`: Active round. Street View panorama is interactive, guess map is accessible.
  - `ROUND_RESULT`: Round ended. Displays player pin, actual location, distance in km, points earned, and opponent guesses.
  - `GAME_OVER` / `RESULT`: Final match summary with total score, XP earned, level progress, coin bonuses, and match history saving.
- **Game Modes**:
  - `CLASSIC`: Standard 5-round world guessing with 4 difficulty levels (Casual, Normal, Hard, Pro).
  - `ENDLESS`: Continuous rounds with sudden-death streak tracking.
  - `FLAG_GUESSER`: Country flag identification with 3 distinct gameplay sub-modes.
  - `DAILY_CHALLENGE`: 1 challenge per day with consecutive day streak rewards.
  - `RANKED_DUEL`: 1v1 competitive match with 5000 HP health bars, damage calculation, and ELO rating updates.
  - `UNRANKED_MULTIPLAYER`: Fast-paced 1v1 match without ELO impact.
  - `PARTY`: Custom private room with host settings, room codes, live chat, and unlimited players.
- **Selective Persistence Rule (`partialize`)**:
  - **PERSISTED**: `soundEnabled`, `soundVolume`, `units`, `mapType`, `emotesEnabled`, `gameHistory`, `coins`, `loginStreak`, `lastClaimDate`.
  - **NON-PERSISTED (Transient)**: `gameState`, `currentRound`, `score`, `currentLocation`, `options`, `userGuess`, `isRareRound`, `circleSearchActive`.  
  *(Reason: Prevents broken game state when reloading during an active match).*

### 3.2 Location Management & Chunked Database (`locationManager.js` & `/api/locations`)
In early versions, the location dataset was a monolithic 96MB JSON file, causing severe memory spikes and slow cold starts. The system was re-architected into **lazy-loaded continent chunks**:
1. **Directory**: `public/locations/` containing `_index.json`, `_country-continent.json`, and individual continent JSON files (e.g. `europe.json`, `asia.json`, `americas.json`).
2. **Server Route (`/api/locations/route.js`)**:
   - Reads `_index.json` to map requested countries or continents.
   - Parses only the needed continent chunk into server memory on-demand (`chunkCache`).
   - Supports continent diversity (`pickDiverseLocations`) to ensure varied world rounds.
3. **Client-Side Location Pool & Country Isolation (`locationManager.js`)**:
   - Uses `locationPools = new Map()` keyed by country code (e.g. `WORLDWIDE`, `IN`, `US`).
   - **Crucial Architectural Fix**: Country-specific lobbies (e.g., India only, US only) use isolated pool keys so country-specific rounds are never polluted with worldwide locations.
   - Pre-warms 3 location sets in the background (`prefetchLocations`) to ensure **0ms latency transitions** between rounds.
   - Deduplication: `recentlyUsed` set tracks the last 50 coordinates to prevent repeated drops in the same play session.

### 3.3 Google Street View Panorama Engine (`PanoramaViewer.js`, `HeroPanorama.js`)
- Loaded asynchronously using `@googlemaps/js-api-loader`.
- **UI Control Suppression**: All default Google Maps UI controls (zoom controls, street names, compass, pan control, fullscreen toggle) are disabled to prevent cheating and maintain immersion:
  ```js
  disableDefaultUI: true,
  showRoadLabels: false,
  clickToGo: difficulty !== 'PRO', // Disabled in Pro mode
  zoomControl: false,
  addressControl: false
  ```
- **White Flash Prevention**: Panoramas are pre-rendered off-screen or faded in with CSS transitions once `status === 'OK'` and tiles are decoded.
- **Hero Panorama (`HeroPanorama.js`)**: Runs a slow automated ambient rotation (`pov.heading += 0.05`) on the home screen behind the main menu.

### 3.4 Interactive Guessing Map & Scoring (`GuessingMap.js`, `ResultsMap.js`, `FlagPinMap.jsx`)
- Built using **Leaflet** with standard OpenStreetMap or satellite tile layers.
- **SSR Rule**: Leaflet accesses the browser `window` object and must **always** be loaded with `next/dynamic(() => import(...), { ssr: false })`.
- **Distance Calculation**: Haversine formula calculates spherical distance in kilometers between `userGuess` and `actualLocation`.
- **Exponential Scoring Formula**:
  - Distance $\le 25 \text{ km}$: Maximum **5,000 points**.
  - Distance $> 25 \text{ km}$:
    $$\text{Score} = \text{round}\left(5000 \times e^{-\frac{\text{distanceKm}}{2000}}\right)$$
  - Range: clamped between $0$ and $5,000$ points.

### 3.5 Real-Time Multiplayer & Party Architecture (`matchmaking.js`, `PartyLobby.js`, `MultiplayerGame.js`)
Powered by Firebase Firestore real-time snapshots (`onSnapshot`) and atomic transactions (`runTransaction`):
- **Ranked Duels (`queue_ranked`)**:
  - Players enter queue with their current ELO.
  - ELO range widens by $\pm 100$ every 5 seconds (up to 500 range).
  - **Bot Fallback**: If no human is matched after 20 seconds, the system dynamically spawns an AI bot opponent (`bot_opponent`) with realistic ELO and simulated guess delay to prevent stalled queues.
  - **5000 HP Health Bar**: Both players start with 5,000 HP. After each round, the difference in earned points is deducted from the losing player's health.
- **Party Lobbies (`matches/party_...`)**:
  - Uses 6-character room codes generated via `generateGameCode()`.
  - Up to 20 concurrent players per room.
  - Live in-lobby chat (`PartyChat.js`) and live ready status toggle.
  - **No Time Limit Setting**: Host can choose 15s, 30s, 60s, 90s, 120s, or "No Time Limit" (`timeLimit: 0`).
  - **5-Second Round Cooldown**: Synchronized countdown timer between rounds so all players review the round results together before the host triggers the next panorama.
  - **Rejoin & In-Progress Protection**: Handled via `PARTY_ALREADY_STARTED` and `isRejoin` flags to avoid wiping player state on refresh.

### 3.6 Flag Guesser Game Modes (`src/app/components/FlagGame.js`, `FlagPinMap.jsx`)
The Flag Guesser features 3 escalating difficulty modes:
1. **Easy Mode**: 100% Multiple Choice (4 flag options generated with `Intl.DisplayNames`).
2. **Medium Mode**: Alternating gameplay — Odd rounds are 4-choice Multiple Choice; Even rounds require clicking the exact country on an interactive Leaflet world map (`FlagPinMap.jsx`).
3. **Hard Mode**: 100% World Map Pinning — No choices provided; players must locate the target nation on the world map directly.

### 3.7 In-Game Virtual Economy & Lifelines (`coins.js`, `CoinHUD.jsx`, `DailyRewardOverlay.jsx`)
- **Initial Balance**: 50 starter coins for all players.
- **Coin Sinks (Lifelines)**:
  - **50/50 Lifeline**: Eliminates 2 incorrect country options (costs 15 coins).
  - **Google Search Lifeline**: Grants 1 in-game clue query (costs 25 coins).
  - **Circle-to-Search**: Interactive canvas overlay (`CircleToSearch.js`) where players draw a bounding box around any object in Street View to request visual AI classification.
- **Coin Faucets**:
  - Round victories, perfect 5000-point guesses, and level-up milestones.
  - **7-Day Daily Login Reward Calendar** (`dailyReward.js`): Escalating rewards (Day 1: 20 coins $\to$ Day 7: 150 coins + Rare Avatar Frame).

### 3.8 Procedural Audio Synthesizer (`src/lib/sounds.js`)
To eliminate audio file bandwidth, decode latency, and CORS errors, the audio engine is implemented entirely via the browser's native **Web Audio API**:
- Synthesizes tones on an `AudioContext` using sine, square, and triangle oscillators.
- **Sound Effects**:
  - `playClick()` / `playTick()`: Short square-wave click for buttons and countdown timers.
  - `playCorrect()`: High two-tone chime (523Hz $\to$ 659Hz) for correct guesses.
  - `playWrong()`: Low saw-tooth buzz (180Hz $\to$ 130Hz) for incorrect answers.
  - `playFanfare()`: Multi-note arpeggio for level-up and match victory.
  - `playTimerWarning()`: Low-frequency pulse when under 5 seconds remaining.

### 3.9 SEO & Google AdSense Compliance Engine
To achieve high organic visibility and maintain Google AdSense partner compliance:
- **13 Pro Masterclass Guides** (`src/app/guides/*`): In-depth, original educational guides covering camera generations, regional bollards, utility pole patterns, language toponymy, and driving sides.
- **Home Educational Section** (`HomeEducationalSection.js`): Renders crawlable, rich semantic HTML below the game fold on the homepage to avoid empty-shell penalties.
- **AI Readability Files**: `public/llms.txt` and `public/llms-full.txt` structured according to llmstxt.org conventions for LLM indexing.
- **Verified AdSense Setup**: Client publisher ID `ca-pub-1006713173738488` configured in `layout.js` metadata and script tags.

---

## 4. Chronological Evolution & Previous Changes

This section records every major change, refactoring phase, and critical bugfix in the codebase. **Consult this section before altering existing subsystems to understand why current patterns exist.**

| Commit / Period | Primary Focus | Architectural Changes & Problems Solved |
| :--- | :--- | :--- |
| **`4195e4f` $\to$ `feb1d7e`** | **Initial Foundation** | Project bootstrapped with Next.js App Router. Renamed from prototype to **LostStreet**. Implemented continuous 5-round game loop, XP leveling system, and 3-second result reveal. |
| **`7797b72` $\to$ `ebde569`** | **Auth & Mobile Login** | Fixed Firebase auth on mobile devices. Standard `signInWithPopup` often failed or was blocked by mobile Safari pop-up blockers; implemented automatic fallback to `signInWithRedirect`. Fixed mobile touch coordinates for map guess submissions. |
| **`76ce42c` $\to$ `1042085`** | **SEO & Social Cards** | Implemented dynamic OpenGraph images (`@vercel/og`), structured JSON-LD schemas, automated `sitemap.js`, and `robots.js`. |
| **`9b7423c` $\to$ `0af7999`** | **Multiplayer & Flag Guesser** | Added initial Flag Guesser mode. Added flag deduplication logic so flags do not repeat in a session. Introduced unranked multiplayer queue with Firebase Firestore snapshots. |
| **`a60eaf4` & `e99e7d3`** | **React 19 Hook Fixes** | Resolved React error 310 (invalid hook call / hook order violation) in `MultiplayerGame.js` caused by conditional hook invocations inside game state branches. Standardized all hooks to top-level execution. |
| **`6667369`** | **Legal & Privacy** | Added comprehensive privacy policy, terms of service, cookies disclosure, and disclaimer pages to comply with GDPR, CCPA, and Google AdSense publisher policies. |
| **`d430460` $\to$ `82f3288`** | **XP & Animations** | Fixed XP calculation bugs where points were lost on game-over. Added animated `LevelUpOverlay.js`. Fixed `-webkit-background-clip: text` CSS rendering glitch on dark-mode mobile screens. |
| **`e40b138`** | **Street View Polish** | Updated `PanoramaViewer.js` to suppress default Google Maps UI controls and eliminate the jarring white flash between panorama loading states. |
| **`6d755cb`** | **In-Game Clue System** | Implemented the hint system (`hintUtils.js`), text clues, and interactive circle search (`CircleToSearch.js`). |
| **`bb6b124`** | **React 19 Compatibility** | **Critical Dependency Fix**: `@dotlottie/react-player` threw severe runtime peer-dependency errors with React 19. Replaced with `@lottiefiles/dotlottie-react ^0.19.10`. |
| **`0d4af5a` $\to$ `8a7c2c0`** | **Flag Guesser Integration** | Fixed broken flag SVG URLs. Integrated Singleplayer Flag Guesser directly into the main menu. Restructured mobile multiple-choice button grid from 1 column to a 2x2 responsive touch grid. |
| **`3c049f2`** | **Profile & Avatars** | Fixed profile modal logout button event bubbling. Added user avatar fallback image handling when Google profile images return 404 or are blocked by privacy extensions. |
| **`29ad31b`** | **Story Mode Prototype** | Added introductory cinematic component (`EyeOpeningIntro.js`) and mobile companion interface (`GamePhone.js`). |
| **`1324c8e`** | **Performance & Bugfix** | Resolved game freeze bug occurring when Street View failed to locate a valid panorama within 50km. Added automatic fallback coordinate retry loop. Added live 360 Street View hero panorama to home screen. |
| **`8cd12b3` $\to$ `f394927`** | **Party Lobby Polish** | Enhanced `PartyLobby.js` mobile responsiveness. Added email notification service (`nodemailer` + `welcomeEmailTemplate.js`). Improved lobby state synchronization. |
| **`2504c10`** | **Coin Economy System** | Built complete virtual coin economy: `CoinHUD.jsx`, `DailyRewardOverlay.jsx`, `coins.js`, and `dailyReward.js`. Integrated 50/50 lifeline and streak tracking into Zustand store. |
| **`df147f7`** | **Page Speed & Chunking** | **Major Architecture Refactor**: The 96MB location database was split into continent-based lazy chunks in `public/locations/`. Profile modal re-architected with tabbed history. Added `friends.js` social system. |
| **`dd8dec3`** | **3D Branding & Coin HUD** | Integrated 3D rendered logo assets (`logo-3d.png`, `logo-3d-square.png`) and custom SVG `CoinIcon.jsx` across all headers and modal HUDs. |
| **`fca6641`** | **AI Readability Standards** | Authored `public/llms.txt` and `public/llms-full.txt` following LLM ingestion standards. Simplified brand copy to clear, engaging Plain English. |
| **`7e900cd` $\to$ `84de883`** | **AdSense Masterclasses** | Authored and polished 13 high-value masterclass guides under `src/app/guides/`. Cleaned sitemap and robots.txt to eliminate duplicate URLs and establish search engine authority. |
| **`0f2880d`** | **Location Isolation & Party Fix** | **Major Bugfix**: Country-specific games were pulling worldwide locations due to a shared location pool. Implemented `locationPools = new Map()` keyed by country code. Fixed party link joining and added a 5-second round cooldown timer for multiplayer lobbies. |
| **`3f2266b`** | **No Time Limit Option** | Added `timeLimit: 0` ("No Time Limit") option to party lobby settings and updated `MultiplayerHUD.js` to render an infinity symbol ($\infty$) instead of an expired timer. |
| **`1151536`** | **Flag Game Evolution** | Overhauled `FlagGame.js` and created `FlagPinMap.jsx`. Introduced 3 distinct difficulty modes (Easy: 4 choices, Medium: alternating map/choices, Hard: 100% map pin). |
| **Session Update** | **White Editorial Theme & Zero-Emoji Redesign** | Redesigned `flag-guesser`, `leaderboard`, and all trust/legal pages (`contact`, `disclaimer`, `privacy`, `terms`, `cookies`) into a cohesive white blog-editorial aesthetic (`#fafafa` canvas, `#ffffff` cards, `#111827` typography, `#e5e7eb` borders). Enforced strict zero-emoji policy replacing symbols with inline SVGs. Preserved all GDPR/CCPA, Google AdSense DART cookie disclosures, and interactive features. |


---

## 5. Critical Guidelines & Anti-Patterns for AI Models

When generating or editing code in this repository, **all AI models must adhere to the following rules**:

### 1. React 19 & Next.js 16 Hydration Rules
- **NEVER** import Leaflet or browser-only UI packages directly at the top of Server Components. Always use `dynamic(() => import(...), { ssr: false })`.
- **NEVER** read `window`, `localStorage`, or `document` during initial component render. Always gate browser APIs inside `useEffect` or check `typeof window !== 'undefined'`.

### 2. Zustand Store Safety
- When updating state in `src/lib/store.js`, **NEVER** add transient gameplay variables (like `currentRound` or `options`) to the `partialize` filter of `persist`. Doing so causes users to become trapped in stale game states upon refreshing.

### 3. Location Pool Key Separation
- In `src/lib/locationManager.js`, **ALWAYS** pass the `gameOptions` object to `fetchRandomLocation()` and `prefetchLocations()`.
- **NEVER** mix country-specific queues with the `'WORLDWIDE'` pool.

### 4. Firebase Transaction Consistency
- All matchmaking joins and party status transitions **MUST** run inside `runTransaction(db, ...)`.
- Always verify that the match document status is still `'waiting_for_players'` inside the transaction before modifying player maps to prevent split-brain states.

### 5. Zero External Audio Files
- **DO NOT** add `.mp3` or `.wav` files to `public/` for game UI sounds. Always use the procedural Web Audio API engine in `src/lib/sounds.js`.

### 6. Mobile Responsiveness & HUD Constraints
- The game is played heavily on mobile devices (smartphones and tablets). Always ensure:
  - Map guess overlays collapse or minimize cleanly to allow Street View exploration.
  - Buttons have minimum touch targets of `44px × 44px`.
  - Top navigation bars accommodate the `CoinHUD` and user level badges without overlapping.

---

## 6. Quick Development & Verification Commands

All development commands should be run within the `clone` directory:

```bash
# Navigate to the web application
cd clone

# Run local development server (Turbo / Next.js)
npm run dev

# Run production build check
npm run build

# Run linting checks
npm run lint

# Trigger Python SEO Analysis Pipeline
npm run seo:analyze

# Sync LLM readability documentation
npm run seo:sync-llms
```
