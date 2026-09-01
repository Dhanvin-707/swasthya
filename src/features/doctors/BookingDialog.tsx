import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField, Select, TextArea, TextInput } from "@/components/ui/form-field";
import { TIME_SLOTS } from "@/data/specialists";
import { useSwasthya } from "@/context/SwasthyaContext";
import { isFutureOrToday } from "@/lib/validation";
import { formatDateIN, makeReference, todayISO } from "@/lib/formatters";
import type { Appointment } from "@/types";

export type BookingTarget = {
  providerId: string;
  providerName: string;
  service: string;
  facilityName?: string;
};

type BookingDialogProps = {
  target: BookingTarget | null;
  onClose: () => void;
};

const MODES = [
  { value: "online", label: "Online Video Call" },
  { value: "in-person", label: "In-Person OPD" },
] as const;

export function BookingDialog({ target, onClose }: BookingDialogProps) {
  const { activePatient, addAppointment, showToast } = useSwasthya();
  const [mode, setMode] = useState<"online" | "in-person">("in-person");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<{ date?: string; timeSlot?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<Appointment | null>(null);

  const reset = () => {
    setMode("in-person");
    setDate("");
    setTimeSlot("");
    setReason("");
    setErrors({});
    setSubmitting(false);
    setConfirmed(null);
  };

  const close = () => {
    reset();
    onClose();
  };

  const submit = () => {
    if (submitting) return;
    const nextErrors: typeof errors = {};
    if (!date) nextErrors.date = "Choose a date.";
    else if (!isFutureOrToday(date)) nextErrors.date = "Date cannot be in the past.";
    if (!timeSlot) nextErrors.timeSlot = "Choose a time slot.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !target) return;

    setSubmitting(true);
    const appointment: Appointment = {
      id: crypto.randomUUID(),
      reference: makeReference(),
      patientId: activePatient.id,
      service: target.service,
      providerId: target.providerId,
      providerName: target.providerName,
      facilityName: target.facilityName,
      mode,
      date,
      timeSlot,
      reason: reason.trim() || undefined,
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
    <Dialog open={target !== null} onOpenChange={(open) => !open && close()} title={confirmed ? "Booking Confirmed" : `Book: ${target?.providerName ?? ""}`}>
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
            <dt className="font-semibold">Provider</dt>
            <dd>{confirmed.providerName}</dd>
            {confirmed.facilityName && (
              <>
                <dt className="font-semibold">Facility</dt>
                <dd>{confirmed.facilityName}</dd>
              </>
            )}
            <dt className="font-semibold">Mode</dt>
            <dd>{MODES.find((m) => m.value === confirmed.mode)?.label}</dd>
            <dt className="font-semibold">Date</dt>
            <dd>{formatDateIN(confirmed.date)}</dd>
            <dt className="font-semibold">Time</dt>
            <dd>{confirmed.timeSlot}</dd>
            {confirmed.reason && (
              <>
                <dt className="font-semibold">Reason</dt>
                <dd>{confirmed.reason}</dd>
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
          <FormField id="bk-mode" label="Consultation mode">
            <Select
              id="bk-mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as "online" | "in-person")}
            >
              {MODES.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField id="bk-date" label="Date" error={errors.date}>
            <TextInput
              id="bk-date"
              type="date"
              min={todayISO()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormField>
          <FormField id="bk-slot" label="Time slot" error={errors.timeSlot}>
            <Select id="bk-slot" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
              <option value="">Select a time slot</option>
              {TIME_SLOTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField id="bk-reason" label="Reason for symptoms (optional)">
            <TextArea
              id="bk-reason"
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </FormField>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Booking…" : "Confirm & Add to ABHA Profile"}
          </Button>
          <p className="text-xs text-muted">
            Demo only — booking is stored locally and never sent to a real ABHA system.
          </p>
        </form>
      )}
    </Dialog>
  );
}
