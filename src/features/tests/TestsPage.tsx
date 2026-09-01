import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TestsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tests & Vaccinations</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Dev B owns this page. Free blood tests and vaccination bookings will
          appear here.
        </p>
      </CardContent>
    </Card>
  );
}
