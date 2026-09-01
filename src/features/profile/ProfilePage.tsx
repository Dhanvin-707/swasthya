import { useState } from "react";
import { QrCode, Download, X } from "lucide-react";
import { useSwasthya, getActivePatient } from "../../context/SwasthyaContext";
import {
  prescriptions,
  imagingReports,
  diagnoses,
  timeline,
  vaccinations,
} from "../../data/medicalHistory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ProfilePage() {
  const {
    activePatientId,
    appointments,
    cancelAppointment,
    openQrModal,
    closeQrModal,
    isQrModalOpen,
  } = useSwasthya();
  const [scanOpen, setScanOpen] = useState(false);
  const [scanImage, setScanImage] = useState<string | null>(null);

  const patient = getActivePatient(activePatientId);
  if (!patient) {
    return (
      <Card>
        <CardContent className="p-6">
          No patient selected. Please complete onboarding.
        </CardContent>
      </Card>
    );
  }

  const maskAadhaar = (a: string) => `XXXX-XXXX-${a.slice(-4)}`;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>ABHA Health Card</span>
            <Badge variant="default">VERIFIED CITIZEN</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-1 space-y-1">
              <p className="text-2xl font-bold">{patient.abhaId}</p>
              <p className="text-sm text-muted-foreground">
                Name: {patient.fullName}
              </p>
              <p className="text-sm text-muted-foreground">
                Aadhaar: {maskAadhaar(patient.aadhaar)}
              </p>
              <p className="text-sm text-muted-foreground">
                Blood: {patient.bloodGroup}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={openQrModal}>
                <QrCode className="w-4 h-4 mr-2" />
                Scan QR
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Card
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Universal Citizen Health Passport</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p>
              <span className="font-medium">DOB:</span> {patient.dob}
            </p>
            <p>
              <span className="font-medium">Blood Group:</span> {patient.bloodGroup}
            </p>
            <p>
              <span className="font-medium">Emergency:</span> {patient.emergencyContact}
            </p>
          </div>
          <div className="space-y-1">
            <p>
              <span className="font-medium">Address:</span> {patient.address}
            </p>
            <p>
              <span className="font-medium">Primary PHC:</span> {patient.primaryPHC}
            </p>
            <p>
              <span className="font-medium">Attending Doctor:</span> {patient.attendingDoctor}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live Health Vitals</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Blood Pressure", value: "120/80", flag: "Normal" },
            { label: "Fasting Glucose", value: "142 mg/dL", flag: "Mild High" },
            { label: "Pulse Rate", value: "78 bpm", flag: "Normal" },
            { label: "Hemoglobin", value: "11.8 g/dL", flag: "Mild Low" },
          ].map((v) => (
            <div key={v.label} className="p-3 border rounded-lg">
              <div className="text-xs text-muted-foreground">{v.label}</div>
              <div className="text-lg font-semibold">{v.value}</div>
              <Badge
                variant={v.flag === "Normal" ? "default" : "secondary"}
                className="mt-1"
              >
                {v.flag}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Diagnoses</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {diagnoses.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medical History & Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {timeline.map((t) => (
            <div
              key={t.id}
              className="p-3 border rounded-lg flex flex-col md:flex-row justify-between gap-2"
            >
              <div>
                <div className="font-medium">
                  {t.date} • {t.doctor}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t.diagnosis}
                </div>
                {t.imagingReport && (
                  <div className="text-sm text-muted-foreground">
                    Imaging: {t.imagingReport}
                  </div>
                )}
                <div className="text-sm text-muted-foreground">
                  Rx: {t.prescription}
                </div>
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
            <div
              key={r.id}
              className="p-3 border rounded-lg flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{r.type}</div>
                <div className="text-sm text-muted-foreground">
                  {r.radiologist}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setScanImage(r.image);
                  setScanOpen(true);
                }}
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
            <div
              key={p.id}
              className="flex justify-between p-2 border rounded-lg text-sm"
            >
              <div>
                <div className="font-medium">{p.medication}</div>
                <div className="text-muted-foreground">{p.dosage}</div>
              </div>
              <div className="font-medium">{p.price}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vaccination Records</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {vaccinations.map((v) => (
            <div key={v.id} className="text-sm border p-2 rounded-lg">
              <div className="font-medium">{v.vaccine}</div>
              <div className="text-muted-foreground">
                {v.date} • {v.doctor} • {v.status}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {appointments.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No upcoming appointments. Book one from Find Doctors or Tests.
            </p>
          ) : (
            appointments.map((a) => (
              <div
                key={a.id}
                className="p-3 border rounded-lg flex flex-col md:flex-row justify-between gap-2"
              >
                <div>
                  <div className="font-medium">
                    {a.service} • {a.providerName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {a.date} at {a.timeSlot} • Ref: {a.reference}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Mode: {a.mode}
                    {a.address && ` • ${a.address}`}
                  </div>
                </div>
                {a.status === "confirmed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => cancelAppointment(a.id)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog open={isQrModalOpen} onOpenChange={closeQrModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan QR Code to Link Profile</DialogTitle>
          </DialogHeader>
          <div className="p-4 bg-white rounded-lg text-black text-xs break-all border">
            {patient.abhaQrPayload}
          </div>
          <p className="text-sm text-muted-foreground">
            This is a simulated QR payload for demo purposes only.
          </p>
        </DialogContent>
      </Dialog>

      <Dialog open={scanOpen} onOpenChange={setScanOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Scan Image</DialogTitle>
          </DialogHeader>
          <div className="h-48 bg-muted flex items-center justify-center rounded-lg text-muted-foreground text-sm">
            {scanImage || "Simulated scan image placeholder"}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setScanOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
