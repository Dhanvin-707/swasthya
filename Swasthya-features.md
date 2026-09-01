# Swasthya AI — Final Feature / Functionality Spec

React + Vite single-page app, "Swasthya – National Digital Health Stack". One-page app, client-side tab navigation, mock data throughout, Leaflet + OpenStreetMap. Target demo: rural India.

> This is the authoritative, consolidated feature list. Every value below (IDs, names, vitals, report text, prices, coordinates) is the real mock data the app ships — build to match it exactly.

---

## 0. Global / Shell

- **Emergency helpline bar** (tap-to-call, `tel:` links). Header label: *"24x7 Government Health Helplines"* / *"Tap any number to call directly"*. Four lines:
  - 🚑 108 Ambulance → `tel:108`
  - 📞 112 National Emergency → `tel:112`
  - 👩‍⚕️ 14555 Tele-Health → `tel:14555`
  - 💊 1800-11-4477 Jan Aushadhi → `tel:1800114477`
- **Language switcher** — 10 languages: EN + Hindi, Marathi, Telugu, Tamil, Bengali, Gujarati, Kannada, Malayalam, Punjabi (flag + native-script label).
- **Header** — "Swasthya AI" / "National Digital Health Stack", Profile link, **"Sign Out / Switch"**.
- **Mobile navigation** — responsive; a **"Toggle Navigation Menu"** hamburger (`lg:hidden` mobile layout) collapses the 7 tabs. *(new — was missing)*
- **Onboarding flow (2 steps)**, shown on first load:
  - **Step 1 — "Aadhaar & Mobile Demo Sign-up":** full name, 12-digit Aadhaar, 10-digit mobile. Two pre-filled demo citizens to pick from: **Kamla Devi (26y)** and **Ramcharan Yadav (62y)**. Validation message on empty: *"Please enter your Aadhaar and Mobile Number."* *(validation new — was missing)*
  - **Step 2 — "Choose Your Preferred Local Language":** note *"Website interface & AI doctor will transform to your chosen language."* → **"Continue to Swasthya Portal"**.
- **i18n is partial, not absent:** the AI-doctor title and all three blood-test names are translated into all 10 languages; the wider UI is not translated. *(was under-documented as "broken/clunky")*
- **Footer:** tagline only — *"Swasthya AI • National Digital Health Stack — Unified Healthcare Ecosystem for Rural & Underserved Communities"*.

### Global state (context)
`activeTab/setActiveTab`, `activePatient`, `language/setLanguage`, `userLocation` (lat/lng/city/address/isGpsActive/loading), `isQrModalOpen`, `emergencySOSAlert`, `citizens`, `completeOnboarding`, `searchByAadhaarOrAbha`, `triggerEmergency108`.

---

## 1. AI Doctor Chatbot (home)

- Chat UI with **rule-based (non-LLM) canned** replies. Input placeholder: *"Describe your symptoms or ask a health question..."*.
- **Greeting (per patient):** *"Namaste {name}! I am Swasthya AI Doctor. I can review your medical history, analyze lab reports, **check drug interactions**, and guide you to nearby specialists. How are you feeling today?"*
- **Drug-interaction check** is a real capability backed by data (`[{drug, advice}]`). *(new — was only implied)*
- **Logs observations** to the patient's Universal Health Profile (message carries `text`, `attachedDoc`, `timestamp`, `sender`).

### Quick test prompts (4) — with the canned answers the app returns
| Prompt | Canned AI reply (key values) |
|---|---|
| Analyze my CBC lab report for Anemia risk | *"Hemoglobin: 11.8 g/dL, WBC: 7,200 /uL, Platelets: 2.1 Lakh /uL (Normal)"* + *"Checks Hemoglobin, RBC, WBC, and Platelet levels for Anemia and infections."* |
| I have high fever (102°F) and joint pain for 3 days | fever/dengue-style template analysis |
| Explain Fasting Blood Sugar result of 142 mg/dL | *"Fasting Blood Sugar: 142 mg/dL, HbA1c: 7.1% (Controlled Diabetes)"* + *"Monitors Blood Glucose and 3-month Average Sugar control for Diabetes."* |
| Suggest home precautions for seasonal dengue | dengue-precaution template |

*(the exact reply text for all four was missing from the prior list — the CBC and FBS readouts above are the real values)*

### Health Vault (MEDICAL REPORTS)
- Drag-and-drop upload area: *"Drag and drop your medical reports here"* / *"Supports PDF, JPG, PNG files"* / **Browse Files** button.
- "Attached Medical Documents:" list, 3 seeded docs, each with a per-doc **Attach** action:
  1. Sehore District Hospital Radiology Department — 2026-08-14 • RADIOLOGY_XRAY
  2. AIIMS Bhopal Advanced Neuro-Imaging Centre — 2026-06-20 • RADIOLOGY_MRI
  3. Rampur Model PHC Unit — 2026-08-10 • TELE_CONSULTATION
- **"Analyze Selected Report with AI Doctor"** — attaching a doc triggers AI analysis; the chat receives *"Analyze attached document: {title}"*. *(new — prior list only had "Attach")*

### CTAs
- **Book Doctor Nearby** · **Call 108 Emergency**

---

## 2. Find Doctors Nearby

- **Map** (Leaflet + OSM tile layer). Controls: **"Use My Live GPS Location"** (label *"Your GPS Position"*) + city search bar.
- Real **Nominatim geocoding** (network fetch) + **haversine** distance to sort nearest-first.
- Geolocation errors: *"Geolocation is not supported by your browser."* and *"Location access denied or unavailable. Search any city in the search bar."*
- **Nearest facilities list** (3 mock, generated relative to the user location) — each shows distance, phone, address, **"Driving Directions"** (with an `eta` field), **Book OPD**:
  1. Sehore District Civil Hospital — Civil Lines, Sehore HQ
  2. Rampur Community Health Centre (CHC) — Rampur Main Road, Block Sehore
  3. Devgarh Model Health & Wellness Centre — Village Rampur, Block Sehore, MP
- **Tele-consultation specialists** (3) with availability status + **Book Consultation**:
  - **Dr. Rajesh Sharma** — General Physician & Rural Health Specialist (9 Years Exp)
  - **Dr. Ananya Verma** — Pediatrician & Child Health Specialist (12 Years Exp)
  - **Dr. V. K. Gupta** — Senior Cardiologist & Internal Medicine (18 Years Exp)
  - Status labels: *"Available Online"* / *"In OPD Consultation"*.
- **Booking modal:** mode (**Online Video Call** / **In-Person OPD**), date, time slot, reason for symptoms → **"Confirm & Add to ABHA Profile"**.

---

## 3. Tests & Vaccinations

### 3 free blood tests (Government scheme) — each with fasting requirement, report time, **Book Blood Test**
1. **Complete Blood Count (CBC)** — *"Checks Hemoglobin, RBC, WBC, and Platelet levels for Anemia and infections."*
2. **Fasting Blood Sugar & HbA1c** — *"Monitors Blood Glucose and 3-month Average Sugar control for Diabetes."*
3. **Thyroid Profile (T3, T4, TSH)** — *"Evaluates Thyroid Gland function and metabolic health."*

### 3 free vaccinations (National Immunization Program) — target group + **Book Vaccination**
1. **Seasonal Flu Vaccine (Influenza)** — *"Protects against seasonal respiratory flu viruses."*
2. **COVID-19 Precautionary Booster** — *"Enhances immunity against emerging SARS-CoV-2 strains."*
3. **Hepatitis B Vaccination** — *"Prevents liver infection caused by Hepatitis B virus."*

### Booking modal
Service mode (**Home Sample Collection** / **Visit Nearest Lab / PHC**), **priority token**, date, time slot, collection address → **"Confirm Appointment & Add to ABHA"**.

---

## 4. Disease Map (IDSP)

- **OSM outbreak map** with per-hospital case pins. Circle radius scales with case count (`radius = cases * 250`).
- **4 case pins** (coordinates → cases):
  - [23.2021, 77.085] → **14** (AIIMS Bhopal)
  - [23.2105, 77.4608] → **8** (Sehore)
  - [23.25, 77.38] → **5** (Rampur)
  - [23.28, 77.32] → **2** (Devgarh)
- **4 tracked conditions** (filter chips) + "All Tracked Conditions":
  1. Seasonal Dengue & Viral Fever
  2. Acute Waterborne Gastroenteritis
  3. Pediatric Seasonal Bronchitis
  4. **Routine Malaria Surveillance** *(new — the 4th condition was missing; prior list named only 3)*
- **Hospital case telemetry desk:** facility, alert level (**HIGH_ALERT**), case count, phone + advisory.
- **"Report Case in Hospital Locality"** — fires a JS `alert()` only (no reporting backend).

---

## 5. Health Feed

- **3 preventive-care articles**, each with a category tag + reading time (e.g. *"7 Minutes"*) + **"Read Full Article"** (dead stub button).
- Topics: maternal 3rd-trimester care, Type-2 diabetes / foot ulcers, pediatric fever / ORS.

---

## 6. Live Alerts (National Health Notification Network)

- **3 alert cards:**
  1. Polio immunization drive — **Active Today**
  2. IV Iron Sucrose camp for pregnant mothers — **Upcoming**
  3. ABHA card linkage drive — **Ongoing**
- **"Call 108 Ambulance Now"** SOS CTA → triggers the emergency alert: **"National 108 Emergency Ambulance Unit #MP-04-1082"** with an **ETA** field, and an *"Order Dispatched"* confirmation. *(the ambulance-unit + ETA detail was missing)*

---

## 7. Profile (Personal Health Record)

### ABHA Health Card
- **ABHA Health Card ID:** `91-9826-1049` (Kamla Devi) / `91-9406-5221` (Ramcharan Yadav). Displayed formatted `91-XXXX-XXXX`.
- **"VERIFIED CITIZEN"** badge · **"Scan QR Code to Link Profile"** (opens QR modal) · **"Download Official Health Card"**.
- **QR encodes more than the ID** *(new):* `ABHA:91-9826-1049|NAME:Kamla Devi|DOB:1998-04-12|BLOOD:B+|AADHAAR:982610495831` (Ramcharan: `DOB:1962-09-05|BLOOD:O+|AADHAAR:940652210982`).

### Universal Citizen Health Passport
Fields: name, **Date of Birth & Age** *(explicit DOB — was only "age")*, blood group (B+ / O+), 12-digit Aadhaar, emergency contact, address, primary PHC, attending doctor, immunization status.

### Live Health Vitals & Metrics
Blood Pressure (120/80), Fasting Glucose, Pulse Rate, Hemoglobin — each with **Normal / Mild Low** flag.

### Medical History & Longitudinal Timeline
Per record: doctor, date, diagnosis, imaging report, prescription.

**Imaging reports (3 — the 3rd was missing):**
1. **Digital X-Ray (PA View)** — Chest / Thoracic Cavity. *Finding:* "Clear lung fields bilaterally. Costophrenic angles sharp. No bony lesion detected." *Impression:* "Chest X-Ray PA View: Lungs clear, no active infiltrates, consolidation or pleural effusion. Normal cardiac silhouette."
2. **MRI Brain (T1/T2/FLAIR)** — Brain & Cranial Cavity. *Finding:* "No focal lesion or midline shift. Gray-white matter differentiation preserved." *Impression:* "Normal cerebral parenchyma and ventricular size. No acute ischemic infarct or intracranial hemorrhage."
3. **MRI Lumbar Spine** — Spine (L1-S1). *Finding:* "Mild disc desiccation at L4-L5 level." *Impression:* "L4-L5 mild disc bulge without nerve root compression. Degenerative spondylotic changes."
   - Each report has a **scan-image viewer modal** (`radiologyImg`) — not just the X-Ray.
   - Radiologists: Dr. R. K. Saxena (Consultant Radiologist), Dr. Meena Deshmukh (Consultant Neuroradiologist).

**Prescriptions (5 — was 2) — each with dosage + price:**
| Medication | Dosage | Price |
|---|---|---|
| Paracetamol 500mg | 1 tablet 3 times a day | ₹5.50 (10 Tabs) |
| Cetirizine 10mg | 1 tablet at bedtime | ₹6.00 (10 Tabs) |
| Amlodipine 5mg | 1 tablet morning | ₹8.00 (10 Tabs) |
| Metformin 500mg | 1 tablet after breakfast & dinner | — |
| Pregabalin 75mg | 1 capsule at bedtime | — |

**Diagnoses recorded per patient** *(new):*
- Type-2 Diabetes Mellitus & Essential Hypertension
- Mild Lumbar Spondylosis
- Mild Seasonal Respiratory Infection & Fatigue

**Vaccination records:** doctor, date, diagnosis, medication (e.g. "Annual Seasonal Influenza Vaccination Completed").

---

## 8. Cross-cutting build requirements

### Navigation and deep-link behavior

- Keep the app as a client-side SPA, but give each primary tab a stable route/hash so refresh and browser Back/Forward work: `doctor`, `doctors`, `tests`, `disease-map`, `feed`, `alerts`, `profile`.
- The active tab must be visually obvious and announced to assistive technology.
- Desktop navigation and mobile navigation must use the same source of truth; closing the mobile menu after selection is required.
- Do not place invisible or fixed overlays above navigation, dropdowns, dialogs, or map controls.
- Every dialog must support close button, Escape, backdrop click, focus management, and focus return to the launching control.

### Responsive and accessibility requirements

- Design mobile-first for 375px, 768px, 1024px, and 1440px widths with no horizontal scrolling.
- Use semantic landmarks: `header`, `nav`, `main`, `section`, and `footer`.
- Use real text labels, not placeholder-only form labels. Associate every input with a visible label and an error message.
- All interactive controls need keyboard access, a visible focus ring, and an accessible name. Icon-only controls require `aria-label`.
- Minimum interactive target size: 44x44px with adequate spacing.
- Maintain at least 4.5:1 text contrast. Never communicate status using color alone; pair it with text or an icon label.
- Use SVG icons (Lucide or equivalent) instead of emoji as functional icons. Emoji may remain only as decorative content where appropriate.
- Respect `prefers-reduced-motion`; animations must never prevent interaction or hide content.
- Upload areas must also work through a normal file picker; drag-and-drop cannot be the only path.
- Maps need a text alternative: the facility/outbreak lists must remain usable when maps fail, are blocked, or are inaccessible.

### Design-system direction

- Calm, trustworthy rural-health visual language: cyan/teal primary, health green accent, warm neutral surfaces, and red only for emergency/destructive states.
- Use Atkinson Hyperlegible or another highly readable sans-serif; base body text is at least 16px with approximately 1.5 line height.
- Use consistent semantic tokens for background, card, foreground, muted text, border, focus ring, success, warning, and emergency states. Do not scatter raw colors through components.
- Keep cards and controls visually consistent across all seven tabs. Avoid excessive gradients, neon colors, glass effects, and motion-heavy presentation.

### State and feedback requirements

Every network-backed or user-triggered operation must define these states:

- Loading state with a visible progress indicator and stable reserved layout space.
- Success state with a clear confirmation and the resulting record shown.
- Empty state with a useful next action.
- Recoverable error state with plain-language explanation and Retry.
- Disabled/submitting state to prevent duplicate bookings, uploads, reports, or SOS actions.

Required examples:

- City search: empty query, loading, no facilities found, invalid/failed geocoding, successful result.
- GPS: permission prompt, granted, denied, unavailable, timeout, and manual-search fallback.
- File upload: unsupported type, oversized file, upload/processing state, success, failure, and remove attachment.
- Chat: empty message, sending, response, failure/retry, and long-message wrapping.
- Bookings: field validation, submitting, duplicate-submit protection, confirmation, and cancellation.
- QR viewer, scan viewer, article viewer, and booking dialogs: loading/error/close behavior where applicable.

### Demo data and persistence

- Keep demo data in typed, centralized fixtures rather than scattering it inside components.
- Use stable IDs for patients, documents, reports, doctors, facilities, alerts, bookings, messages, and timeline records.
- Persist only demo state in `localStorage` so refresh preserves selected patient, language, chat messages, uploaded-document metadata, and confirmed appointments.
- Provide a clear demo reset path that restores the original seeded data and onboarding state.
- Never send or persist real Aadhaar, phone, medical, or location data in this demo. Show a visible **Demo data only — not for real medical decisions** notice.
- Treat all medical advice as informational. Include an explicit emergency disclaimer directing users to 108/112 for urgent symptoms.

### Forms and booking behavior

- Validate Aadhaar as exactly 12 digits and mobile as a valid 10-digit Indian number after the `+91` prefix; display field-level errors beside the relevant input.
- Dates cannot be in the past. Time-slot choices must be unavailable when already selected or no longer available.
- Collection address is required for home sample collection and hidden or optional for visit-to-lab mode.
- Booking confirmation must show service, provider/facility, mode, date, time, reason, address when relevant, and a generated demo booking reference.
- Confirmed bookings must appear in the Profile timeline or a dedicated “Upcoming appointments” block, with a Cancel action and cancellation confirmation.
- Do not claim that an appointment was sent to a real ABHA system; label it as **Demo appointment added locally**.

### Emergency and safety behavior

- `tel:` links remain available from every tab and are visually distinct from normal actions.
- The 108 SOS action requires a deliberate confirmation step to prevent accidental calls, except the direct `tel:108` helpline link.
- The SOS confirmation must show the unit, ETA, patient/location context used, and a clear “This is demo data” label.
- Never expose a user’s full Aadhaar in normal UI. Mask it except where the demo explicitly requires the QR payload, and label the QR as simulated.
- Do not describe hardcoded outputs as diagnosis, prescriptions, verified live outbreaks, real appointments, or real-time emergency dispatches.

### Internationalization

- Store all visible copy in translation dictionaries keyed by language; do not mix translated and hardcoded strings inside components.
- Define a fallback to English for missing translations and preserve the selected language across refresh.
- Support long translated labels without clipping buttons, tabs, cards, or modal content.
- Format dates, times, numbers, and currency consistently for the Indian locale.

### Performance and resilience

- Lazy-load tab-heavy content, Leaflet maps, scan images, and article content where practical.
- Reserve dimensions for maps and images to prevent layout shift; use optimized images and descriptive alt text.
- Debounce city search and cancel stale requests so an older response cannot overwrite a newer location.
- Scope facility search to India/Madhya Pradesh and reject implausible distances before rendering results.
- Handle OSM/Nominatim rate limits and failures with the local seeded facility fallback; show when fallback data is being used.
- Do not require map tiles or network access for the rest of the portal to remain usable.

### Component and testing requirements

- Keep shared components for `Button`, `Card`, `Badge`, `Dialog`, `FormField`, `Tabs`, `Toast`, `EmptyState`, `LoadingState`, and `ErrorState`.
- Add automated tests for onboarding validation, language persistence, tab navigation, chat prompt replies, file validation, booking validation, appointment persistence, GPS/search fallback, disease filters, SOS confirmation, and reset-demo behavior.
- Add browser tests at 375px and desktop width covering the primary happy paths and the known overlay/navigation regression.
- Run accessibility checks for keyboard navigation, dialog focus, form labels, contrast, map alternatives, and reduced-motion behavior.
- Acceptance criterion: a fresh visitor can complete onboarding, use each tab, submit one booking, view the resulting profile record, refresh without losing demo state, and reset the demo without errors.

---

## 9. Recommended additions to the visible product

These are small additions that improve usefulness without turning the demo into a full backend product:

- Persistent **Demo mode / Not medical advice** banner.
- **Upcoming appointments** card in Profile with provider, service, date/time, reference, and Cancel.
- **Notifications/read state** for alerts and booking confirmations.
- **Back/Cancel/Reset** actions in onboarding and every modal.
- **Download/share-safe report view** that masks Aadhaar and clearly labels reports as simulated.
- **No-results and offline fallback** panels for maps, facilities, alerts, and feed content.
- A compact **Help & emergency guidance** panel explaining when to call 108, 112, or 14555.
- A visible **last updated** timestamp on disease alerts, live vitals, and health alerts so mock data is not mistaken for live telemetry.

---

## Known problems (why the current demo feels rough)
- Fixed-overlay elements block clicks on the nav and dropdowns (this is why automated tab-walks stall on the home tab).
- Language switching is only partial (AI-doctor + test names translate; rest of UI does not).
- OSM geo lookup can return off-region hospitals (e.g. a Thailand hospital at 2,517 km) — geo-scoping is broken.
- "Report Case" and "Read Full Article" are stubs (JS alert / dead button).
- AI replies are hardcoded templates, not real LLM output.
