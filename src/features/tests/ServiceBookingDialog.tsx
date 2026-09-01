import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField, Select, TextInput } from "@/components/ui/form-field";
import { TIME_SLOTS } from "@/data/specialists";
import { useSwasthya } from "@/context/SwasthyaContext";
import { isFutureOrToday } from "@/lib/validation";
import { formatDateIN, makeReference, todayISO } from "@/lib/formatters";
import type { Appointment } from "@/types";

export type ServiceTarget = {
  serviceId: string;
  serviceName: string;
  kind: "blood-test" | "vaccination";
};

type ServiceBookingDialogProps = {
  target: ServiceTarget | null;
  onClose: () => void;
};

export function ServiceBookingDialog({ target, onClose }: ServiceBookingDialogProps) {
  const { activePatient, addAppointment, showToast } = useSwasthya();
  const [mode, setMode] = useState<"home-sample" | "visit-lab">("visit-lab");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [address, setAddress] = useState("");
  const [priorityToken] = useState(() => `P-${Math.floor(100 + Math.random() * 900)}`);
  const [errors, setErrors] = useState<{ date?: string; timeSlot?: string; address?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<Appointment | null>(null);

  const close = () => {
    setMode("visit-lab");
    setDate("");
    setTimeSlot("");
    setAddress("");
    setErrors({});
    setSubmitting(false);
    setConfirmed(null);
    onClose();
  };

  const submit = () => {
    if (submitting) return;
    const nextErrors: typeof errors = {};
    if (!date) nextErrors.date = "Choose a date.";
    else if (!isFutureOrToday(date)) nextErrors.date = "Date cannot be in the past.";
    if (!timeSlot) nextErrors.timeSlot = "Choose a time slot.";
    if (mode === "home-sample" && address.trim().length < 10) {
      nextErrors.address = "Collection address is required for home sample collection.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !target) return;

    setSubmitting(true);
    const appointment: Appointment = {
      id: crypto.randomUUID(),
      reference: makeReference(),
      patientId: activePatient.id,
      service: target.serviceName,
      providerId: target.serviceId,
      providerName:
        target.kind === "blood-test" ? "District Mobile Testing Unit" : "PHC Vaccination Centre",
      facilityName: mode === "home-sample" ? "Home Sample Collection" : "Nearest Lab / PHC",
      mode,
      date,
      timeSlot,
      address: mode === "home-sample" ? address.trim() : undefined,
      priorityToken,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      isDemo: true,
    };
    addAppointment(appointment);
    setSubmitting(false);
    setConfirmed(appointment);
    showToast("Demo appointment added locally");
  };

  return (
    <Dialog
      open={target !== null}
      onOpenChange={(open) => !open && close()}
      title={confirmed ? "Booking Confirmed" : `Book: ${target?.serviceName ?? ""}`}
    >
      {confirmed ? (
        <div className="flex flex-col gap-3 text-sm">
          <p className="rounded-lg bg-accent-soft px-3 py-2 font-semibold text-accent">
            Demo appointment added locally — not sent to any real ABHA system.
          </p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <dt className="font-semibold">Reference</dt>
            <dd>{confirmed.reference}</dd>
            <dt className="font-semibold">Service</dt>
            <dd>{confirmed.service}</dd>
            <dt className="font-semibold">Mode</dt>
            <dd>{confirmed.mode === "home-sample" ? "Home Sample Collection" : "Visit Nearest Lab / PHC"}</dd>
            <dt className="font-semibold">Priority token</dt>
            <dd>{confirmed.priorityToken}</dd>
            <dt className="font-semibold">Date</dt>
            <dd>{formatDateIN(confirmed.date)}</dd>
            <dt className="font-semibold">Time</dt>
            <dd>{confirmed.timeSlot}</dd>
            {confirmed.address && (
              <>
                <dt className="font-semibold">Collection address</dt>
                <dd>{confirmed.address}</dd>
              </>
            )}
          </dl>
          <Button onClick={close}>Done</Button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex flex-col gap-3"
        >
          <FormField id="svc-mode" label="Service mode">
            <Select
              id="svc-mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as "home-sample" | "visit-lab")}
            >
              <option value="home-sample">Home Sample Collection</option>
              <option value="visit-lab">Visit Nearest Lab / PHC</option>
            </Select>
          </FormField>
          <FormField id="svc-token" label="Priority token" hint="Generated automatically for demo queue.">
            <TextInput id="svc-token" value={priorityToken} readOnly />
          </FormField>
          <FormField id="svc-date" label="Date" error={errors.date}>
            <TextInput
              id="svc-date"
              type="date"
              min={todayISO()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormField>
          <FormField id="svc-slot" label="Time slot" error={errors.timeSlot}>
            <Select id="svc-slot" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
              <option value="">Select a time slot</option>
              {TIME_SLOTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </FormField>
          {mode === "home-sample" && (
            <FormField id="svc-address" label="Collection address" error={errors.address}>
              <TextInput
                id="svc-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House, village, landmark"
              />
            </FormField>
          )}
          <Button type="submit" disabled={submitting}>
            {submitting ? "Booking…" : "Confirm Appointment & Add to ABHA"}
          </Button>
          <p className="text-xs text-muted">
            Demo only — booking is stored locally and never sent to a real ABHA system.
          </p>
        </form>
      )}
    </Dialog>
  );
}
