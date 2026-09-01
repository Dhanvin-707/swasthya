import { useState } from "react";
import { BLOOD_TESTS } from "@/data/tests";
import { VACCINATIONS } from "@/data/vaccinations";
import { t } from "@/i18n/translations";
import { useSwasthya } from "@/context/SwasthyaContext";
import { TestCard } from "./TestCard";
import { VaccinationCard } from "./VaccinationCard";
import { ServiceBookingDialog, type ServiceTarget } from "./ServiceBookingDialog";

export default function TestsPage() {
  const { language } = useSwasthya();
  const [target, setTarget] = useState<ServiceTarget | null>(null);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <header>
        <h1 className="text-xl font-extrabold text-fg">Tests &amp; Vaccinations</h1>
        <p className="text-sm text-muted">
          Free government-scheme tests and National Immunization Program vaccines. Demo bookings only.
        </p>
      </header>

      <section aria-label="Free blood tests" className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-fg">3 Free Blood Tests (Government Scheme)</h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {BLOOD_TESTS.map((test) => (
            <li key={test.id}>
              <TestCard
                test={{ ...test, name: t(language, test.nameKey) }}
                onBook={() => setTarget({ serviceId: test.id, serviceName: test.name, kind: "blood-test" })}
              />
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Free vaccinations" className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-fg">3 Free Vaccinations (National Immunization Program)</h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {VACCINATIONS.map((v) => (
            <li key={v.id}>
              <VaccinationCard
                vaccination={v}
                onBook={() => setTarget({ serviceId: v.id, serviceName: v.name, kind: "vaccination" })}
              />
            </li>
          ))}
        </ul>
      </section>

      <ServiceBookingDialog target={target} onClose={() => setTarget(null)} />
    </div>
  );
}
