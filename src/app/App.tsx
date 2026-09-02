import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { SwasthyaProvider, useSwasthya } from "@/context/SwasthyaContext";
import { HelplineBar } from "@/components/shell/HelplineBar";
import { Header } from "@/components/shell/Header";
import { NavTabs } from "@/components/shell/NavTabs";
import { Footer, DemoNotice } from "@/components/shell/Footer";
import { Onboarding } from "@/components/shell/Onboarding";
import { EmergencySosDispatchedDialog } from "@/components/shell/EmergencySos";
import { ToastViewport } from "@/components/ui/toast";
import { LoadingState } from "@/components/ui/states";
import DoctorPage from "@/features/doctor/DoctorPage";
import FeedPage from "@/features/feed/FeedPage";
import AlertsPage from "@/features/alerts/AlertsPage";
import ProfilePage from "@/features/profile/ProfilePage";

const DoctorsPage = lazy(() => import("@/features/doctors/DoctorsPage"));
const TestsPage = lazy(() => import("@/features/tests/TestsPage"));
const DiseaseMapPage = lazy(() => import("@/features/disease-map/DiseaseMapPage"));

function TabContent() {
  const { activeTab } = useSwasthya();

  let content;
  switch (activeTab) {
    case "doctors":
      content = (
        <Suspense fallback={<LoadingState label="Loading Find Doctors…" />}>
          <DoctorsPage />
        </Suspense>
      );
      break;
    case "tests":
      content = (
        <Suspense fallback={<LoadingState label="Loading Tests & Vaccinations…" />}>
          <TestsPage />
        </Suspense>
      );
      break;
    case "disease-map":
      content = (
        <Suspense fallback={<LoadingState label="Loading Disease Map…" />}>
          <DiseaseMapPage />
        </Suspense>
      );
      break;
    case "feed":
      content = <FeedPage />;
      break;
    case "alerts":
      content = <AlertsPage />;
      break;
    case "profile":
      content = <ProfilePage />;
      break;
    default:
      content = <DoctorPage />;
  }

  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
    >
      {content}
    </motion.div>
  );
}

function Shell() {
  const { onboardingDone } = useSwasthya();
  if (!onboardingDone) return <Onboarding />;
  return (
    <div className="flex min-h-screen flex-col">
      <HelplineBar />
      <DemoNotice />
      <Header />
      <NavTabs />
      <main className="flex-1">
        <TabContent />
      </main>
      <Footer />
      <ToastViewport />
      <EmergencySosDispatchedDialog />
    </div>
  );
}

export default function App() {
  return (
    <SwasthyaProvider>
      <Shell />
    </SwasthyaProvider>
  );
}
