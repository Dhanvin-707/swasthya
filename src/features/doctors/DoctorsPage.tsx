import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DoctorsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Doctors Nearby</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Dev B owns this page. Map and facility list will appear here.
        </p>
      </CardContent>
    </Card>
  );
}
