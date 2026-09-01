import { useSwasthya } from "../../context/SwasthyaContext";
import { getActivePatient } from "../../context/SwasthyaContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DoctorPage() {
  const { activePatientId, language } = useSwasthya();
  const patient = getActivePatient(activePatientId);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AI Doctor</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {patient
              ? `Namaste ${patient.fullName}! I am Swasthya AI Doctor.`
              : "Welcome to Swasthya AI Doctor."}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Current language: {language}
          </p>
          <div className="mt-4 flex gap-2">
            <Button variant="outline">Book Doctor Nearby</Button>
            <Button variant="destructive" asChild={true}>
              <a href="tel:108">Call 108 Emergency</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
