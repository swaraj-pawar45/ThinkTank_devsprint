# ANNADATA CONNECT — Three-Layer Master Enhanced Prompt
## End-to-End Web Platform with Three.js + Minimal Design System

---

## ═══════════════════════════════════════════
## LAYER 1 — IDENTITY & DESIGN SYSTEM
## (Feed this first. Sets the soul of the app.)
## ═══════════════════════════════════════════

You are building **ANNADATA CONNECT** — India's Intelligent Food Bridge Platform.
A government-grade, production-ready web application that upgrades the PMGKAY
food scheme with AI matching, blockchain accountability, and real-time donor-to-
beneficiary coordination. Design for trust, dignity, and national scale.

---

### 1.1 — Aesthetic Direction: "Sacred Minimal"

The visual language is **sacred minimalism** — inspired by the geometric precision
of Indian temple architecture (Jantar Mantar, step-wells), the warmth of terracotta
and turmeric, and the calm authority of government civic design at its best. Think:
Swiss grid discipline meets Indian earth tones.

**NOT**: neon dashboards, aggressive SaaS blue, generic charity-website aesthetics.
**YES**: Warm sand base, deep forest green accents, one saffron/amber highlight for
calls-to-action. Thin geometric lines. Generous white space. Data that breathes.

---

### 1.2 — Typography Stack

```css
--font-display: 'Cormorant Garamond', serif;   /* Hero headings — editorial gravitas */
--font-ui: 'DM Sans', sans-serif;              /* Body, labels, nav — clean utility */
--font-mono: 'JetBrains Mono', monospace;      /* Stats, numbers, data points */
```

Import from Google Fonts. Display font carries the emotional weight of the platform
name and section headers. DM Sans handles all functional copy. Mono gives data
readings a dashboard-like authority.

---

### 1.3 — Color System

```css
:root {
  /* Base */
  --sand-50:  #FDFAF4;   /* page background */
  --sand-100: #F5F0E8;   /* card surfaces */
  --sand-200: #E8DFD0;   /* borders, dividers */

  /* Primary — Forest Green */
  --green-600: #2D5016;  /* primary text on light */
  --green-500: #3D6B1F;  /* buttons, active states */
  --green-400: #4F8A2A;  /* hover states */
  --green-100: #EAF3DE;  /* light tints, badges */

  /* Accent — Saffron */
  --saffron-500: #D4821A; /* CTA, highlights, glow */
  --saffron-400: #E8971E; /* hover */
  --saffron-100: #FAEEDA; /* soft badge bg */

  /* Dark mode override */
  --dark-bg:   #0F1A0A;
  --dark-card: #162110;
  --dark-border: #2A3D1A;

  /* Semantic */
  --trust: var(--green-500);
  --urgent: #C0392B;
  --neutral: #6B7280;
}
```

---

### 1.4 — Three.js Visual System (Minimal, High-Impact)

Use Three.js **only** for these four specific moments. Everywhere else: pure CSS.

| Scene | Where | What it renders |
|---|---|---|
| **Hero Particle Field** | Landing page hero | 800 small particles forming a loose map of India. Gently drift. On hover/scroll, they flow toward a central point — symbolizing food flowing to those in need. Saffron color, 0.4 opacity, no physics engine. |
| **Live Hunger Heatmap Globe** | Dashboard — Map section | A low-poly India mesh (not a globe) with district-level color intensity. Green = fed, amber = moderate need, coral = critical. Rotates 0.1°/sec. Click-to-zoom on districts. |
| **Data Flow Lines** | How It Works section | Thin animated lines connecting three floating nodes: Donor → Platform → Beneficiary. Lines have traveling dot particles. Minimal, ~200 vertices total. |
| **Impact Counter Orb** | Stats section | A single soft-glowing orb whose size pulses with the live meals-delivered counter. Not decorative — it IS the number visualization. |

**Three.js rules:**
- Max draw calls: 4 per scene
- All scenes: `alpha: true`, transparent canvas layered over CSS content
- Fallback: CSS animation if WebGL unavailable (detect with `WEBGL.isWebGLAvailable()`)
- Performance: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`
- Dispose all geometries/materials on route change

---

### 1.5 — Motion Philosophy

```
Entrance:   fade-up, 40px, 0.6s ease-out, staggered 80ms per element
Hover:      scale(1.02), 0.2s ease — cards only
Data update: number counters animate with requestAnimationFrame
Page transitions: opacity 0→1, 0.3s
Three.js:   all animations at 60fps with delta-time, pause when tab hidden
```

No bounce, no elastic, no spring physics in CSS. This is civic infrastructure —
authority comes from stillness, not bounce.

---

## ═══════════════════════════════════════════
## LAYER 2 — ARCHITECTURE & PAGES
## (Feed this second. Builds the full structure.)
## ═══════════════════════════════════════════

### 2.1 — Tech Stack

```
Frontend:   React 18 + Vite
Routing:    React Router v6
3D:         Three.js r155 (imported via npm, not CDN in production)
State:      Zustand (lightweight, no Redux overhead)
Charts:     Recharts (for dashboard data)
Styling:    CSS Modules + CSS custom properties (no Tailwind)
Icons:      Lucide React
Maps:       Three.js custom (no Google Maps dependency)
Auth:       Mock Aadhaar OTP flow (UI only, no real auth)
API:        Mock JSON data with realistic Indian district names
```

---

### 2.2 — Page Structure (7 pages)

#### PAGE 1: `/` — Landing (Public)

**Sections in order:**

1. **Nav** — Logo (ANNADATA wordmark in Cormorant), nav links, language selector
   (EN / हि / বাং / தமிழ்), "Post Surplus" CTA button in saffron

2. **Hero** — Three.js particle field behind. Left: large display headline
   "80 करोड़ लोगों तक" (To 80 crore people) in Cormorant, English subhead below.
   Right: rotating stat cards (meals today / districts covered / active volunteers).
   Single "See It Work" scroll CTA.

3. **The Problem** — Full-width section. Two columns: left is a stark number
   (₹2.13L Cr spent. Still 194M hungry.) Right is a minimal bar showing what
   percentage leaks. CSS only, no Three.js here.

4. **How It Works** — Three.js data-flow lines scene. Three nodes: Donor /
   ANNADATA Brain / Beneficiary. Below: 3 steps in numbered cards with icons.

5. **The 0.5% Thesis** — Dark section (forest green bg). Large number animation:
   ₹1,065 Crore → 19.5× return. Pull-quote typography.

6. **Live Impact Ticker** — Real-time-feeling counter (animates on scroll entry).
   Meals today / Kg food saved / Active donors / Districts reached.

7. **Who It's For** — 4 cards: Donor / NGO / Government / Beneficiary. Each
   expands on hover to show their specific dashboard preview.

8. **Footer** — Ministry of Food and Consumer Affairs co-branding space,
   links, language, accessibility toggle.

---

#### PAGE 2: `/donor` — Donor Dashboard

**Layout:** Fixed left sidebar (220px) + main content area

**Sidebar items:**
- ANNADATA logo
- Dashboard / Post Surplus / My Donations / Impact Report / CSR Certificate / Settings

**Main area tabs:**

Tab A — **Post Surplus** (default)
```
Form fields:
- Food type (dropdown: Cooked meals / Raw grains / Packaged food / Produce)
- Quantity (number + unit toggle: kg / servings / packets)
- Available from / until (time picker)
- Location (auto-detect or manual pin)
- Photo upload (optional)
- Dietary tags: Veg / Jain / Halal / Gluten-free (multi-select chips)
- Special notes (textarea)

Below form: AI preview card — shows estimated matches before submission:
"3 NGOs within 4km can receive this. Est. pickup: 45 mins."

Submit button: saffron, full-width, "Connect My Surplus →"
```

Tab B — **My Donations** — Timeline of past donations with status badges
(Matched / Picked Up / Delivered / Impact Verified)

Tab C — **Impact Report** — Recharts bar/line charts:
- Meals donated per month
- CO₂ saved (kg)
- Geographic distribution (district names listed)
- Download as PDF button

Tab D — **CSR Certificate** — Auto-generated certificate preview with:
company name, 80G deduction amount, SEBI ESG category, download button

---

#### PAGE 3: `/beneficiary` — Beneficiary Portal

**Design principle:** Maximum dignity, minimum friction. No hunger imagery.
Looks like a booking app, not a charity form.

**Above fold:** "Your Food, Your Schedule" heading. Aadhaar OTP login widget.

**After login — My Food Schedule:**
- Upcoming pickup slots (card per slot: location, time, food type, contact)
- "Book a Slot" button → opens availability calendar
- Dietary preferences (persistent settings): Veg / Non-veg / Jain / Halal / Diabetic
- Language preference (persisted)

**Slot booking flow (3 steps):**
1. Choose pickup point (map or list view of nearest FPS/NGO)
2. Choose time slot (calendar grid, green = available)
3. Confirm — get QR code for pickup

**No-smartphone path shown as info card:**
"Call 1800-XXX-XXXX free. Available in 15 languages. 24/7."

---

#### PAGE 4: `/ngo` — NGO Operations Dashboard

**Layout:** Top stats bar + main grid

**Stats bar (4 metric cards):**
Incoming donations today / Volunteers available / Beneficiaries served / Pending pickups

**Main grid:**

Left (60%) — **Live Feed**
Real-time list of incoming surplus donations in the NGO's area.
Each item: food type, quantity, donor name/type, distance, pickup window.
Action buttons: Accept / Delegate to volunteer / Decline

Right (40%) — **Volunteer Map**
Three.js scene: district-level dots showing volunteer locations (mock data).
Click volunteer → see their current assignment and availability.

**Bottom section:**
- Pending deliveries table with status tracking
- Completed today summary

---

#### PAGE 5: `/government` — District Admin Dashboard

**The most data-dense page. Authority aesthetic.**

**Top bar:** District selector dropdown + date range + Export button

**Row 1 — 5 KPI cards:**
FPS shops active / Ghost beneficiaries flagged / Food distributed (MT) /
Leakage alerts / Exclusion errors corrected

**Row 2 — Two panels:**
Left: Recharts line chart — food distributed vs. hunger index score over 12 months
Right: Three.js India mesh heatmap (the low-poly district map). Color = need score.
Hover tooltip shows district stats. Click = drill down.

**Row 3 — Alerts table:**
FPS shops with anomalous patterns (flagged by AI), sortable, with action buttons.

**Row 4 — Beneficiary corrections:**
Households recommended for inclusion (exclusion errors detected by AI engine).
Approve / Review / Reject per row.

---

#### PAGE 6: `/volunteer` — Volunteer App

**Mobile-first layout (375px optimized, scales to desktop)**

**Header:** Name, rating stars, pickups this month

**Main card — Current Assignment (if active):**
Large card with: pickup location name, donor type, food quantity, drop-off point.
"Navigate" button (links to Google Maps with coordinates).
"Mark Picked Up" / "Mark Delivered" action buttons.

**Below — Available Nearby:**
List of open pickup requests within 5km, sorted by urgency.
Each: food type, distance, pickup window, reward points.

**Bottom nav (mobile):** Home / Available / My History / Profile

---

#### PAGE 7: `/impact` — Public Impact Dashboard (No login)

**For media, government, and citizens. Fully public.**

**Hero number:** Animated counter — Total meals connected through ANNADATA.

**Three.js orb scene:** The pulsing impact orb that scales with the meal count.

**District leaderboard:** Top 20 districts by meals rescued. Clean table.

**Month-by-month chart:** Recharts area chart, green fill.

**Food type breakdown:** Donut chart — Cooked / Grains / Produce / Packaged.

**Corporate donors wall:** Logo grid (placeholder logos with names).

**"Embed This Widget"** button — gives a code snippet for media sites.

---

### 2.3 — Shared Components Library

Build these as reusable components:

```
<AnnadataNav />           — Responsive nav with language selector
<SurplusCard />           — Donation listing card with status badge
<BeneficiaryCard />       — Slot booking card (dignity-first design)
<MetricCard />            — KPI stat card with animated number
<StatusBadge />           — Matched/Delivered/Pending/Critical
<FoodTypeChip />          — Dietary tag chips (Veg/Halal/Jain etc.)
<DistrictHeatmap />       — Three.js India map component (reused on 2 pages)
<ImpactOrb />             — Three.js pulsing orb component
<ParticleField />         — Three.js hero particle component
<DataFlowLines />         — Three.js donor→platform→beneficiary animation
<OTPWidget />             — Mock Aadhaar OTP login (3-box input)
<LanguageSelector />      — Dropdown with 8 Indian languages
<TimelineItem />          — Donation history timeline entry
<AlertRow />              — Government dashboard anomaly alert
<DonorForm />             — Full surplus posting form
<SlotCalendar />          — Beneficiary slot booking calendar grid
```

---

## ═══════════════════════════════════════════
## LAYER 3 — DATA, INTERACTIONS & EDGE CASES
## (Feed this third. Makes it feel alive and real.)
## ═══════════════════════════════════════════

### 3.1 — Mock Data Specification

All data is mock but must feel real. Use actual Indian:
- District names: Muzaffarpur, Barabanki, Shivpuri, Nandurbar, Kalahandi, Koraput
- Food types: Dal-chawal, Rajma, Khichdi, Atta, Arhar dal, Poha, Rice (sona masoori)
- NGO names: Aastha Foundation, Umeed Trust, Jai Kisan Samiti, Gareeb Nawaz Sewa
- Volunteer names: Common Indian names across regions
- FPS codes: Follow real format (e.g., UP-LKO-2847, MH-PNE-0391)

**Mock API endpoints to simulate (use setTimeout 200-800ms for realism):**

```javascript
GET  /api/surplus/nearby          // Returns 8-12 donation listings
POST /api/surplus/post            // Simulates AI matching, returns 3 matched NGOs
GET  /api/beneficiary/slots       // Returns available pickup slots
GET  /api/dashboard/kpis          // Returns all 5 KPI metrics
GET  /api/heatmap/districts       // Returns 50 district objects with need scores
GET  /api/impact/live             // Returns incrementing counter (setInterval)
POST /api/auth/otp/send           // Simulates OTP send
POST /api/auth/otp/verify         // Always succeeds with code "1234" for demo
```

---

### 3.2 — Key Micro-Interactions

**Surplus posting — AI matching animation:**
After form submit → loading state (0.8s) → result card slides up with 3 matched
NGOs. Each NGO card counts up its distance and ETA. Green checkmark pulses.

**Beneficiary slot booking — QR generation:**
After confirming slot → paper-fold animation (CSS transform) reveals QR code card.
QR is a real-format placeholder. Card has download button.

**Government dashboard — anomaly alert:**
When a flagged FPS appears in the table, the row has a subtle left-border pulse
animation (saffron color, 2s loop). Clicking "Investigate" opens a modal with
a mini chart showing the anomalous distribution pattern.

**Volunteer "Mark Delivered" flow:**
Button press → haptic-style CSS scale animation → confetti burst (pure CSS,
5 colored divs, 1s animation) → points counter animates up → card archved.

**Three.js particle field on scroll:**
As user scrolls past the hero, particles use GSAP ScrollTrigger (or manual
scroll listener) to flow from dispersed → clustered → dispersed again. Speed
correlates with scroll velocity. Max: 800 particles. Color: saffron #D4821A.

**Language switch:**
On language change, all text elements do a 0.15s fade-out, text swaps, 0.15s
fade-in. Font stays the same (DM Sans covers Devanagari and Latin well).
Store language preference in localStorage.

---

### 3.3 — Accessibility Requirements

```
- WCAG 2.1 AA minimum
- All Three.js canvases: aria-hidden="true" (decorative only)
- All data shown in 3D also available as text/table alternative
- Color contrast ratio: minimum 4.5:1 for all text
- Focus indicators: 2px saffron outline on all interactive elements
- Screen reader: all form fields labeled, all buttons have aria-label
- Reduce motion: @media (prefers-reduced-motion) disables all Three.js animations
  and replaces with static renders
- IVR path: always prominently displayed for non-digital users
- Font size: base 16px, never below 14px
```

---

### 3.4 — Performance Budgets

```
First Contentful Paint:  < 1.2s
Largest Contentful Paint: < 2.5s
Three.js bundle:         < 180KB gzipped (tree-shake aggressively)
Total JS bundle:         < 350KB gzipped
Images:                  WebP with fallback, lazy-loaded below fold
Three.js scenes:         Pause rendering when not in viewport (IntersectionObserver)
Fonts:                   Preloaded with font-display: swap
```

---

### 3.5 — Responsive Breakpoints

```css
/* Mobile first */
--bp-sm:  480px;   /* large mobile */
--bp-md:  768px;   /* tablet */
--bp-lg:  1024px;  /* desktop */
--bp-xl:  1280px;  /* wide desktop */
--bp-2xl: 1536px;  /* government monitor screens */
```

**Mobile-critical pages:** `/beneficiary` and `/volunteer` are mobile-first,
full-screen-card layouts. Government and NGO dashboards collapse to tabbed
panels on mobile. Three.js scenes reduce particle count by 60% on mobile.

---

### 3.6 — Government Trust Signals (Design Details)

These details make the platform feel official, not startup-y:

- Header carries a subtle Ashoka Chakra geometric motif (SVG, 10% opacity)
- Footer: "Supported under Digital India Initiative" + NIC logo placeholder
- All certificates use a formal bordered template (CSS border with corner marks)
- Error states are calm and instructional, never alarming ("Please try again
  in a moment" not "Error 500")
- Success states use green checkmarks, not confetti (except volunteer delivery —
  that one earns the celebration)
- Data tables have alternating row colors using --sand-50 and --sand-100
- Every number above 1,000 uses Indian number formatting: 1,00,000 not 100,000
- Dates in DD/MM/YYYY format throughout
- Currency always ₹ with Indian lakh/crore notation

---

### 3.7 — Three.js Scene — Complete Implementation Notes

**Scene 1: Hero Particle Field**
```javascript
// Config
const PARTICLE_COUNT = 800;        // reduce to 480 on mobile
const PARTICLE_COLOR = 0xD4821A;   // saffron
const PARTICLE_OPACITY = 0.5;
const DRIFT_SPEED = 0.0003;        // very slow drift

// Geometry: BufferGeometry with random positions in India's lat/lng bounds
// roughly x: -1 to 1, y: -0.8 to 0.8 mapped to viewport
// Each particle has a "home" position and a "flow" target
// On scroll: lerp toward center point (convergence effect)
// Material: PointsMaterial, size: 2px, sizeAttenuation: true
```

**Scene 2: District Heatmap**
```javascript
// Load India GeoJSON (simplified, < 50KB)
// Convert to Three.js ShapeGeometry per district
// Color material based on need_score (0-1):
//   0.0-0.3: green-400
//   0.3-0.6: saffron-400
//   0.6-1.0: #C0392B (critical red)
// Hover: raycasting, scale(1.05) + show tooltip
// Slow rotation: mesh.rotation.y += 0.001 * delta
```

**Scene 3: Data Flow Lines**
```javascript
// Three nodes as small sphere meshes (r=0.1)
// Donor (left), Platform (center, slightly larger), Beneficiary (right)
// Three CatmullRomCurve3 paths connecting them
// Traveling dots: 5 per path, move along curve with t += 0.005
// Line material: LineBasicMaterial, opacity 0.3, color saffron
// Dot material: MeshBasicMaterial, color green-500
```

**Scene 4: Impact Orb**
```javascript
// Single SphereGeometry (radius=1, segments=32)
// MeshPhongMaterial, color green-500, emissive green-400, opacity 0.7
// Scale tied to meal count: scale = 0.8 + (meals/maxMeals) * 0.6
// Pulse animation: Math.sin(time * 2) * 0.05 added to scale
// One PointLight (saffron) orbiting the sphere
```

---

### 3.8 — Deployment Target

```
Build:    Vite production build
Host:     Vercel or Netlify (static + serverless functions for mock API)
Env vars: VITE_APP_ENV=demo (controls mock vs real API)
PWA:      Add service worker for offline support on beneficiary portal
          (critical — rural users may have intermittent connectivity)
```

---

## HOW TO USE THESE THREE LAYERS

**Option A — Full app at once:**
Paste all three layers together as one prompt. Ask for a complete Vite + React
project with file structure, all components, and all pages.

**Option B — Progressive build (recommended):**
1. Paste Layer 1 → "Build the design system: CSS variables, typography,
   Three.js base scenes, and the shared component library."
2. Paste Layer 2 → "Now build all 7 pages using the design system above."
3. Paste Layer 3 → "Now add all interactions, mock data, accessibility,
   and Three.js scene implementations as specified."

**Option C — Single page focus:**
Paste Layer 1 + Layer 3 + the specific page section from Layer 2.
Example: "Build just the Donor Dashboard using the design system and
interactions specified."

---

*ANNADATA CONNECT — Built for Bharat. Benchmarked against the world.*
*0.5% of ₹2.13 lakh crore. 19.5× return. 5 crore lives changed.*
