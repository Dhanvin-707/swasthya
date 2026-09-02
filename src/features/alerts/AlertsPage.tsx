import { motion } from "framer-motion";
import { AlertTriangle, Check, Bell, Ambulance } from "lucide-react";
import { alerts } from "@/data/alerts";
import { useSwasthya } from "@/context/SwasthyaContext";
import { EmergencySosTrigger } from "@/components/shell/EmergencySos";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AlertStatus } from "@/types";

const STATUS_TONE: Record<AlertStatus, "danger" | "warn" | "info"> = {
  "Active Today": "danger",
  Upcoming: "warn",
  Ongoing: "info",
};

export default function AlertsPage() {
  const { alertsRead, markAlertRead } = useSwasthya();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
      <header>
        <h1 className="text-xl font-extrabold text-fg">Live Alerts</h1>
        <p className="text-sm text-muted">National Health Notification Network · demo notices only.</p>
      </header>

      <Card className="border-danger/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ambulance aria-hidden size={20} className="text-danger" />
            Emergency SOS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted">
            Call 108 Ambulance Now. This is a simulated demo dispatch — no real call is made.
          </p>
          <EmergencySosTrigger label="Call 108 Ambulance Now" />
          <p className="text-sm text-muted">
            A direct <a href="tel:108" className="font-semibold text-primary underline">tel:108</a> link is
            also available above for immediate calling.
          </p>
        </CardContent>
      </Card>

      <section aria-label="Alert cards" className="flex flex-col gap-3">
        <h2 className="flex items-center gap-2 text-base font-bold text-fg">
          <Bell aria-hidden size={18} />
          Notifications
        </h2>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {alerts.map((alert, idx) => {
            const isRead = alertsRead.includes(alert.id);
            return (
              <motion.li
                key={alert.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{alert.title}</CardTitle>
                      <Badge tone={STATUS_TONE[alert.status]}>{alert.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted">{alert.description}</p>
                    <p className="text-xs text-muted">
                      Last updated: {new Date(alert.lastUpdated).toLocaleString()}
                    </p>
                    <Button
                      variant={isRead ? "secondary" : "primary"}
                      size="sm"
                      onClick={() => markAlertRead(alert.id)}
                      disabled={isRead}
                      className="w-full"
                    >
                      {isRead ? (
                        <>
                          <Check aria-hidden size={16} />
                          Read
                        </>
                      ) : (
                        "Mark as Read"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.li>
            );
          })}
        </ul>
      </section>

      <p className="flex items-start gap-2 text-xs text-muted">
        <AlertTriangle aria-hidden size={16} className="mt-0.5 shrink-0 text-warn" />
        Notifications are simulated. For real emergencies call 108 or 112.
      </p>
    </div>
  );
}
