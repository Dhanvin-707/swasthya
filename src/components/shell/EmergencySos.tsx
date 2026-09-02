import { useState } from "react";
import { useSwasthya } from "@/context/SwasthyaContext";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function EmergencySosTrigger({ label }: { label: string }) {
  const { triggerEmergency108 } = useSwasthya();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Dialog open={open} onOpenChange={setOpen} title="Confirm 108 Emergency SOS">
        <p className="text-sm text-muted">
          This will simulate dispatching an ambulance. No real call will be made.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setOpen(false);
              triggerEmergency108();
            }}
          >
            Confirm Dispatch
          </Button>
        </div>
      </Dialog>
    </>
  );
}

export function EmergencySosDispatchedDialog() {
  const { emergencySOSAlert, closeEmergencyAlert, activePatient, userLocation } = useSwasthya();

  return (
    <Dialog
      open={emergencySOSAlert}
      onOpenChange={(open) => !open && closeEmergencyAlert()}
      title="Order Dispatched"
    >
      <p className="text-sm text-fg">
        National 108 Emergency Ambulance Unit <strong>#MP-04-1082</strong> has been dispatched.
      </p>
      <p className="mt-2 text-sm text-muted">
        Estimated arrival: <strong>12 minutes</strong>
      </p>
      <p className="mt-2 text-sm text-muted">
        Patient: {activePatient.name} · Location: {userLocation.address ?? "Sehore, Madhya Pradesh"}
      </p>
      <p className="mt-3 text-xs font-semibold text-warn">
        This is a simulated demo dispatch — no real ambulance was called.
      </p>
      <div className="mt-4 flex justify-end">
        <Button onClick={closeEmergencyAlert}>OK</Button>
      </div>
    </Dialog>
  );
}
