import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Check, X, Bell, Ambulance, Info } from "lucide-react";
import { alerts } from "../../data/alerts";
import { useSwasthya } from "../../context/SwasthyaContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function AlertsPage() {
  const { alertsRead, markAlertRead, triggerEmergency108, closeEmergencyAlert } =
    useSwasthya();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  const handleMarkRead = (id: string) => {
    markAlertRead(id);
  };

  const openSOS = () => setConfirmOpen(true);
  const cancelSOS = () => setConfirmOpen(false);
  const confirmSOS = () => {
    setConfirmOpen(false);
    setDispatched(true);
    triggerEmergency108();
  };
  const closeDispatch = () => {
    setDispatched(false);
    closeEmergencyAlert();
  };

  return (
    <div className="space-y-4">
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ambulance className="w-5 h-5" />
            Emergency SOS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Call 108 Ambulance Now. This is a simulated demo dispatch.
          </p>
          <Button variant="destructive" onClick={openSOS} className="w-full">
            Call 108 Ambulance Now
          </Button>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              A direct <a href="tel:108" className="text-primary underline">tel:108</a> link is also available for immediate calling.
            </span>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold flex items-center gap-2">
        <Bell className="w-5 h-5" />
        Live Alerts
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {alerts.map((alert, idx) => {
          const isRead = alertsRead.includes(alert.id);
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{alert.title}</CardTitle>
                    <Badge
                      variant={
                        alert.status === "Active Today"
                          ? "destructive"
                          : alert.status === "Upcoming"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {alert.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {alert.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date(alert.lastUpdated).toLocaleString()}
                  </p>
                  <Button
                    variant={isRead ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleMarkRead(alert.id)}
                    disabled={isRead}
                    className="w-full"
                  >
                    {isRead ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Read
                      </>
                    ) : (
                      "Mark as Read"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Confirm 108 SOS
            </DialogTitle>
            <DialogDescription>
              This will simulate dispatching an ambulance. No real call will be
              made.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm">
            National 108 Emergency Ambulance Unit <strong>#MP-04-1082</strong>
            <br />
            Estimated arrival: <strong>12 minutes</strong>
          </p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={cancelSOS}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmSOS}>
              Confirm Dispatch
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={dispatched} onOpenChange={closeDispatch}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Dispatched</DialogTitle>
            <DialogDescription>
              This is a simulated dispatch for demo purposes only.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm">
            National 108 Emergency Ambulance Unit <strong>#MP-04-1082</strong> has
            been dispatched. ETA: <strong>12 minutes</strong>.
          </p>
          <div className="flex justify-end">
            <Button onClick={closeDispatch}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
