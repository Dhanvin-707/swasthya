import { useState } from "react";
import { QrCode, Download, X } from "lucide-react";
import { useSwasthya } from "@/context/SwasthyaContext";
import {
  prescriptions,
  imagingReports,
  diagnoses,
  timeline,
  vaccinations as historyVaccinations,
} from "@/data/medicalHistory";
import { maskAadhaar, formatDateIN } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

const VITALS = [
  { label: "Blood Pressure", value: "120/80", flag: "Normal" },
  { label: "Fasting Glucose", value: "142 mg/dL", flag: "Mild High" },
  { label: "Pulse Rate", value: "78 bpm", flag: "Normal" },
  { label: "Hemoglobin", value: "11.8 g/dL", flag: "Mild Low" },
] as const;

export default function ProfilePage() {
  const { activePatient, appointments, cancelAppointment, openQrModal, closeQrModal, isQrModalOpen } =
    useSwasthya();
  const [scanReport, setScanReport] = useState<{ id: string; type: string; impression: string } | null>(null);
  const [cancelId, setCancelId] = useState<string | null>(null);

  const mine = appointments.filter((a) => a.patientId === activePatient.id);
  const upcoming = mine.filter((a) => a.status === "confirmed");
  const cancelled = mine.filter((a) => a.status === "cancelled");

  const downloadCard = () => {
    alert("This is a demo action. The health card is simulated and not a real document.");
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
      <header>
        <h1 className="text-xl font-extrabold text-fg">Profile · Personal Health Record</h1>
        <p className="text-sm text-muted">
          {activePatient.name} · Demo record — not a real ABHA account.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>ABHA Health Card</span>
            <Badge tone="success">VERIFIED CITIZEN</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="flex-1 space-y-1">
            <p className="text-2xl font-bold text-fg">{activePatient.abhaId}</p>
            <p className="text-sm text-muted">Name: {activePatient.name}</p>
            <p className="text-sm text-muted">Aadhaar: {maskAadhaar(activePatient.aadhaar)}</p>
            <p className="text-sm text-muted">Blood Group: {activePatient.bloodGroup}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={openQrModal}>
              <QrCode aria-hidden size={16} />
              Scan QR Code to Link Profile
            </Button>
            <Button variant="secondary" onClick={downloadCard}>
              <Download aria-hidden size={16} />
              Download Card
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Universal Citizen Health Passport</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm md:grid-cols-2">
          <div className="space-y-1">
            <p><span className="font-semibold">Name:</span> {activePatient.name}</p>
            <p><span className="font-semibold">Date of Birth &amp; Age:</span> {formatDateIN(activePatient.dob)} ({activePatient.displayAge})</p>
            <p><span className="font-semibold">Blood Group:</span> {activePatient.bloodGroup}</p>
            <p><span className="font-semibold">Aadhaar:</span> {maskAadhaar(activePatient.aadhaar)}</p>
            <p><span className="font-semibold">Immunization:</span> {activePatient.immunizationStatus}</p>
          </div>
          <div className="space-y-1">
            <p><span className="font-semibold">Emergency Contact:</span> {activePatient.emergencyContact}</p>
            <p><span className="font-semibold">Address:</span> {activePatient.address}</p>
            <p><span className="font-semibold">Primary PHC:</span> {activePatient.phc}</p>
            <p><span className="font-semibold">Attending Doctor:</span> {activePatient.attendingDoctor}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live Health Vitals</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {VITALS.map((v) => (
              <li key={v.label} className="rounded-lg border border-line p-3">
                <p className="text-xs text-muted">{v.label}</p>
                <p className="text-lg font-semibold text-fg">{v.value}</p>
                <Badge tone={v.flag === "Normal" ? "success" : "warn"} className="mt-1">
                  {v.flag}
                </Badge>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">Last updated: 2026-09-01 · simulated values.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Diagnoses</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc text-sm text-muted">
            {diagnoses.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medical History &amp; Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {timeline.map((t) => (
            <div key={t.id} className="flex flex-col justify-between gap-2 rounded-lg border border-line p-3 md:flex-row">
              <div>
                <p className="font-semibold text-fg">
                  {formatDateIN(t.date)} · {t.doctor}
                </p>
                <p className="text-sm text-muted">{t.diagnosis}</p>
                {t.imagingReport && <p className="text-sm text-muted">Imaging: {t.imagingReport}</p>}
                <p className="text-sm text-muted">Rx: {t.prescription}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imaging Reports</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {imagingReports.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line p-3">
              <div className="min-w-0">
                <p className="font-semibold text-fg">{r.type}</p>
                <p className="text-sm text-muted">{r.region} · {r.radiologist}</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setScanReport({ id: r.id, type: r.type, impression: r.impression })}
              >
                View Scan
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prescriptions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {prescriptions.map((p) => (
            <div key={p.id} className="flex justify-between gap-2 rounded-lg border border-line p-2 text-sm">
              <div>
                <p className="font-semibold text-fg">{p.medication}</p>
                <p className="text-muted">{p.dosage}</p>
              </div>
              <p className="font-semibold text-fg">{p.price}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vaccination Records</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {historyVaccinations.map((v) => (
            <div key={v.id} className="rounded-lg border border-line p-2 text-sm">
              <p className="font-semibold text-fg">{v.vaccine}</p>
              <p className="text-muted">
                {formatDateIN(v.date)} · {v.doctor} · {v.status}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted">
              No upcoming appointments. Book one from Find Doctors or Tests.
            </p>
          ) : (
            <ul className="space-y-3">
              {upcoming.map((a) => (
                <li key={a.id} className="flex flex-col justify-between gap-2 rounded-lg border border-line p-3 md:flex-row">
                  <div>
                    <p className="font-semibold text-fg">
                      {a.service} · {a.providerName}
                      {a.facilityName ? ` — ${a.facilityName}` : ""}
                    </p>
                    <p className="text-sm text-muted">
                      {formatDateIN(a.date)} at {a.timeSlot} · Ref {a.reference}
                      {a.priorityToken ? ` · Token ${a.priorityToken}` : ""}
                    </p>
                    <p className="text-sm text-muted">
                      Mode: {a.mode}
                      {a.address ? ` · ${a.address}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone="success">Confirmed (demo)</Badge>
                    <Button variant="danger" size="sm" onClick={() => setCancelId(a.id)}>
                      Cancel
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cancelled.length > 0 && (
            <p className="text-xs text-muted">{cancelled.length} cancelled appointment(s) on record.</p>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={isQrModalOpen}
        onOpenChange={(open) => !open && closeQrModal()}
        title="Scan QR Code to Link Profile"
      >
        <div className="break-all rounded-lg border border-line bg-bg p-4 text-xs text-fg">
          {activePatient.abhaQrPayload}
        </div>
        <p className="mt-2 text-sm text-muted">
          This is a simulated QR payload for demo purposes only — no real ABHA record.
        </p>
      </Dialog>

      <Dialog open={scanReport !== null} onOpenChange={(open) => !open && setScanReport(null)} title="Scan Image">
        {scanReport && (
          <div className="flex flex-col gap-3">
            <div className="flex h-40 items-center justify-center rounded-lg border border-line bg-bg text-sm text-muted">
              Simulated scan image placeholder — {scanReport.type}
            </div>
            <p className="text-sm text-fg">{scanReport.impression}</p>
            <div className="flex justify-end">
              <Button variant="secondary" onClick={() => setScanReport(null)}>
                <X aria-hidden size={16} />
                Close
              </Button>
            </div>
          </div>
        )}
      </Dialog>

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
