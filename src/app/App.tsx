import { useEffect, useState } from "react";
import { useSwasthya } from "../context/SwasthyaContext";
import { Header } from "../components/shell/Header";
import { Nav } from "../components/shell/Nav";
import { Footer } from "../components/shell/Footer";
import { EmergencyBar } from "../components/shell/EmergencyBar";
import { Onboarding } from "../components/shell/Onboarding";
import { DoctorPage } from "../features/doctor/DoctorPage";
import { DoctorsPage } from "../features/doctors/DoctorsPage";
import { TestsPage } from "../features/tests/TestsPage";
import { DiseaseMapPage } from "../features/disease-map/DiseaseMapPage";
import { FeedPage } from "../features/feed/FeedPage";
import { AlertsPage } from "../features/alerts/AlertsPage";
import { ProfilePage } from "../features/profile/ProfilePage";

const pages: Record<string, React.FC> = {
  doctor: DoctorPage,
  doctors: DoctorsPage,
  tests: TestsPage,
  "disease-map": DiseaseMapPage,
  feed: FeedPage,
  alerts: AlertsPage,
  profile: ProfilePage,
};

export default function App() {
  const { activeTab, onboardingComplete, completeOnboarding, language } = useSwasthya();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hash = window.location.hash.replace("#", "") || "doctor";
    // Optional: sync hash with state on mount
    void hash;
  }, []);

  if (!mounted) return null;

  if (!onboardingComplete) {
    return <Onboarding onComplete={completeOnboarding} />;
  }

  const Page = pages[activeTab] || DoctorPage;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <EmergencyBar />
      <Header />
      <Nav />
      <main id="main" className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <Page />
      </main>
      <Footer language={language} />
    </div>
  );
}
