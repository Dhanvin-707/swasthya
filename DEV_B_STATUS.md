# Swasthya AI — Developer B Status

Branch work performed on `main` (repo had zero commits; Dev A foundation was not present,
so the minimal foundation Dev B depends on was built here and is marked below).

Legend: [x] done · [~] done as minimal foundation (Dev A/C owned, replaceable) · [ ] pending

## Find Doctors Nearby

- [x] Leaflet/OpenStreetMap facility map (lazy-loaded, error-boundary fallback)
- [x] Manual city search (Nominatim, 500ms debounce, AbortController cancellation)
- [x] GPS permission / success / denied / unavailable / timeout states
- [x] India + Madhya Pradesh geographic scoping (bounded viewbox + countrycodes=in + India bbox reject)
- [x] Haversine distance sorting, nearest-first
- [x] Seeded local facility fallback when network/map services fail + "Offline fallback data" label
- [x] Text facility list independent of map (map failure never blanks the list)
- [x] Facility cards: distance, phone, address, Driving Directions, ETA, Book OPD
- [x] Three seeded facilities from the specification
- [x] Three tele-consultation specialists with Available Online / In OPD Consultation status
- [x] Book Consultation action (disabled while specialist in OPD)

## Tests & Vaccinations

- [x] Three government-scheme blood tests with descriptions, fasting, report times
- [x] Three National Immunization Program vaccinations with target groups
- [x] Book Blood Test / Book Vaccination actions
- [x] Service booking modal: service mode, date, time slot, priority token, conditional address
- [x] Home sample collection vs visit lab/PHC conditional fields (address required only for home sample)
- [x] Field-level validation, past-date prevention (native `min` + React fallback validator)
- [x] Duplicate-submit protection (submitting guard + form replaced by confirmation)
- [x] Confirmation summary with generated demo reference (SWAS-XXXXXX)
- [x] "Demo appointment added locally" wording; never claims real ABHA submission

## Appointment creation

- [x] Uses shared `addAppointment` context action; no direct localStorage in features
- [x] Frozen `Appointment` shape, stable provider/service IDs, `isDemo: true`

## Tests owned by Dev B (vitest + RTL)

- [x] GPS success/denied/unavailable/timeout/unsupported (geolocation.test.ts)
- [x] Geographic scoping: Thailand result rejected, India bbox filter (geocoding.test.ts)
- [x] Stale-request cancellation via AbortSignal (geocoding.test.ts)
- [x] Distance ordering + ETA sanity (distance.test.ts)
- [x] Doctor booking validation: min-date constraint, required slot (BookingDialog.test.tsx)
- [x] Appointment shape via shared addAppointment + reference format (BookingDialog.test.tsx)
- [x] Duplicate-submit prevention (BookingDialog.test.tsx)
- [x] Service booking: conditional address field, past-date prevention, priority token (ServiceBookingDialog.test.tsx)
- [x] Validation unit tests: Aadhaar/mobile/date (validation.test.ts)
- [ ] Playwright browser test for full doctor-booking path at mobile + desktop widths
      (Playwright not installed in this repo; unit/component coverage stands in for now)

## Shared foundation built because Dev A branch absent (marked [~])

- [~] Vite/React/TS scaffold extensions: vitest config, test setup
- [~] Frozen types: TabId, LanguageCode, Appointment, ChatMessage, Patient (src/types)
- [~] SwasthyaContext with setActiveTab/setActivePatient/setLanguage/completeOnboarding/
      addAppointment/cancelAppointment/toast/resetDemo (triggerEmergency108 pending with Dev C)
- [~] Typed hash router with Back/Forward support (src/app/routes.ts)
- [~] storage/formatters/validation libs, i18n with English fallback (AI-doctor title + 3 test
      names translated in all 10 languages per spec; wider UI intentionally English)
- [~] UI primitives: Button, Card, Badge, Dialog (Base UI: Escape/backdrop/focus managed),
      FormField, Toast, EmptyState/LoadingState/ErrorState, ConfirmDialog
- [~] Shell: helpline bar (tel:108/112/14555/1800114477), header, desktop + mobile nav,
      footer tagline, demo notice, 2-step onboarding gate with demo citizens + validation
- [~] ProfilePlaceholder: upcoming appointments + cancel via shared cancelAppointment,
      so Dev B bookings are visible; Developer C replaces with full Profile

## Not Dev B scope (untouched placeholders render)

- [ ] AI Doctor chat + Health Vault (Dev A)
- [ ] Disease Map, Health Feed, Live Alerts, SOS, full Profile (Dev C)

## Run

```bash
npm run dev     # dev server
npm test        # vitest, 25 tests
npm run build   # tsc -b && vite build
npm run lint    # oxlint
```
