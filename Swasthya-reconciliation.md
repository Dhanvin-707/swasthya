# Swasthya AI — Three-Branch Reconciliation Plan

## Problem

Three branches were pushed with **independent root commits** (no common ancestor):

| Branch | Contains | Stack |
|---|---|---|
| `origin/main` | Dev B (Find Doctors + Tests) + minimal foundation | React 19, Tailwind v4 (`@tailwindcss/vite`), Base UI, framer-motion |
| `origin/devc` | Dev C (Disease Map, Feed, Alerts, Profile) + stub Doctor | React 19, Tailwind v4 (`@tailwindcss/postcss` + shadcn), react-router-dom |
| `origin/feature/dev-a-platform-doctor` | Dev A (AI Doctor + Health Vault) | React 18, hand-written CSS, react-router-dom |

Each branch redefined shared state, types, data, and shell differently, so they cannot be merged directly.

## Decision

**Adopt `origin/main` as the single canonical base.** It has the cleanest modern stack, the `@/` alias, a working hash-router + onboarding + appointments context, Dev B fully done (25 tests), and a theme that already matches the spec (cyan/green, warm neutral).

Port Dev C's feature pages and rebuild Dev A's features onto `main`. Do not adopt Dev C's shadcn/postcss/tailwind-config setup or Dev A's React 18 setup.

## Target end state

One working SPA on `main` with all seven tabs:

1. AI Doctor + Health Vault (Dev A)
2. Find Doctors Nearby (Dev B — keep as-is)
3. Tests & Vaccinations (Dev B — keep as-is)
4. Disease Map (Dev C — port)
5. Health Feed (Dev C — port)
6. Live Alerts + SOS (Dev C — port)
7. Profile (Dev C — port, replaces `ProfilePlaceholder`)

---

## Execution steps

### Step 1 — Work off a clean integration branch

- [x] Checkout `main`, create `feature/integration` branch.
- [x] Verify `npm install`, `npm test`, `npm run build`, `npm run lint` all pass on the base before changes.

### Step 2 — Unify types (`src/types/index.ts`)

Keep `main`'s existing types and ADD the Dev C types `main` is missing:

- [x] `UserLocation`
- [x] `UploadedDocument`
- [x] `Alert`
- [x] `Article`
- [x] `Outbreak`
- [x] `ImagingReport`
- [x] `Prescription`
- [x] `TimelineRecord`

Normalize `Patient` to `main`'s shape (keep `name`, `displayAge`, `dob`, `bloodGroup`, `aadhaar`, `abhaId`, `mobile`, `address`, `phc`, `attendingDoctor`, `emergencyContact`, `immunizationStatus`) and add `abhaQrPayload`.

### Step 3 — Extend the shared context (`src/context/SwasthyaContext.tsx`)

Keep `main`'s context contract and ADD the cross-feature state Dev A and Dev C need:

- [x] `userLocation` + `setUserLocation`
- [x] `chatMessages` (per patient) + `addChatMessage(patientId, message)`
- [x] `uploadedDocs` (per patient) + `addUploadedDocument(patientId, doc)`
- [x] `markDocumentAttached(patientId, docId)`
- [x] `alertsRead` + `markAlertRead(id)`
- [x] `emergencySOSAlert` + `triggerEmergency108()` + `closeEmergencyAlert()`
- [x] `isQrModalOpen` + `openQrModal()` + `closeQrModal()`

Preserve `main`'s existing `activePatient`, `onboardingDone`, `completeOnboarding(patientId, lang)`, `addAppointment`, `cancelAppointment`, `showToast`, `resetDemo`.

### Step 4 — Centralize data (`src/data/`)

- [x] Port Dev C data: `outbreaks.ts`, `articles.ts`, `alerts.ts`, `medicalHistory.ts`.
- [x] Add Dev A data: `chatReplies.ts`, `drugInteractions.ts`, `medicalReports.ts`.
- [x] Normalize all IDs to `main`'s patient IDs (`patient-kamla`, `patient-ramcharan`).
- [x] Re-export everything from `src/data/index.ts`.

### Step 5 — Port Dev C feature pages onto `main`

Rewrite imports to `main`'s `@/` context/types/UI and its Tailwind token names (`bg`, `card`, `fg`, `muted`, `line`, `primary`, `accent`, `warn`, `danger`).

- [ ] `src/features/disease-map/DiseaseMapPage.tsx` (+ outbreak map, filters, telemetry)
- [ ] `src/features/feed/FeedPage.tsx` (+ article cards + viewer)
- [ ] `src/features/alerts/AlertsPage.tsx` (+ alert cards + SOS dialog)
- [ ] `src/features/profile/ProfilePage.tsx` (full: ABHA card, QR, passport, vitals, timeline, imaging, prescriptions) — delete `src/features/ProfilePlaceholder.tsx`.

### Step 6 — Build Dev A features on `main`

- [ ] `src/features/doctor/DoctorPage.tsx` (chat panel + quick prompts + drug interactions + Health Vault)
- [ ] `src/features/doctor/ChatPanel.tsx`
- [ ] `src/features/doctor/QuickPrompts.tsx`
- [ ] `src/features/doctor/DrugInteractionPanel.tsx`
- [ ] `src/features/doctor/HealthVault.tsx`
- [ ] `src/features/doctor/FileUpload.tsx`
- [ ] `src/services/fileValidation.ts`

### Step 7 — Wire the shell (`src/app/App.tsx`)

- [ ] Replace the Doctor/Health-Vault, Disease Map, Feed, and Alerts placeholders with the real pages.
- [ ] Keep Doctors + Tests lazy-loaded.
- [ ] Wire the SOS action and QR modal where applicable.
- [ ] Confirm all seven hash routes render the correct page.

### Step 8 — Verify

- [ ] `npm run build` (tsc -b + vite build) passes.
- [ ] `npm test` passes (existing 25 + new tests).
- [ ] `npm run lint` passes.
- [ ] Manual smoke: onboarding → each of 7 tabs → booking appears in Profile → SOS dialog → reset.

### Step 9 — Commit and publish

- [ ] Commit on `feature/integration`.
- [ ] Push `feature/integration`.
- [ ] Merge `feature/integration` into `main` and push `main`.

---

## Out of scope / decisions

- Do not reconcile Dev A's React 18 branch or Dev C's shadcn setup into the tree; their logic is ported, their tooling is dropped.
- Old branches remain on origin for history; `main` becomes the single source of truth going forward.
- No real backend, LLM, ABHA, or dispatch — demo-only, consistent with `Swasthya-features.md`.
