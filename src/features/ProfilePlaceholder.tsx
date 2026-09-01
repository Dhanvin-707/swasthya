import { useSwasthya } from "@/context/SwasthyaContext";
import { formatDateIN } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useState } from "react";

// Minimal hand-off surface so Dev B bookings are visible in Profile.
// Developer C owns the full Profile page and replaces this component.
export function ProfilePlaceholder() {
  const { activePatient, appointments, cancelAppointment } = useSwasthya();
  const [cancelId, setCancelId] = useState<string | null>(null);
  const mine = appointments.filter((a) => a.patientId === activePatient.id);
  const upcoming = mine.filter((a) => a.status === "confirmed");
  const cancelled = mine.filter((a) => a.status === "cancelled");

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
      <header>
        <h1 className="text-xl font-extrabold text-fg">Profile</h1>
        <p className="text-sm text-muted">
          {activePatient.name} · ABHA {activePatient.abhaId} · Demo record. Full profile page owned
          by Developer C.
        </p>
      </header>

      <section aria-label="Upcoming appointments" className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-fg">Upcoming Appointments</h2>
        {upcoming.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line bg-card p-6 text-sm text-muted">
            No upcoming appointments. Book a doctor, test, or vaccination to see it here.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {upcoming.map((a) => (
              <li key={a.id}>
                <Card className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <CardTitle>{a.service}</CardTitle>
                    <p className="text-sm text-muted">
                      {a.providerName}
                      {a.facilityName ? ` — ${a.facilityName}` : ""}
                    </p>
                    <p className="text-sm text-muted">
                      {formatDateIN(a.date)} · {a.timeSlot} · Ref {a.reference}
                      {a.priorityToken ? ` · Token ${a.priorityToken}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone="success">Confirmed (demo)</Badge>
                    <Button variant="danger" size="sm" onClick={() => setCancelId(a.id)}>
                      Cancel
                    </Button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
        {cancelled.length > 0 && (
          <p className="text-xs text-muted">{cancelled.length} cancelled appointment(s) on record.</p>
        )}
      </section>

      <ConfirmDialog
        open={cancelId !== null}
        onOpenChange={(open) => !open && setCancelId(null)}
        title="Cancel appointment?"
        body="This removes the demo appointment from your local profile. This cannot be undone."
        confirmLabel="Cancel Appointment"
        danger
        onConfirm={() => {
          if (cancelId) cancelAppointment(cancelId);
          setCancelId(null);
        }}
      />
    </div>
  );
}
