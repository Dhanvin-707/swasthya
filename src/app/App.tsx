import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { SwasthyaProvider, useSwasthya } from "@/context/SwasthyaContext";
import { HelplineBar } from "@/components/shell/HelplineBar";
import { Header } from "@/components/shell/Header";
import { NavTabs } from "@/components/shell/NavTabs";
import { Footer, DemoNotice } from "@/components/shell/Footer";
import { Onboarding } from "@/components/shell/Onboarding";
import { ToastViewport } from "@/components/ui/toast";
import { LoadingState } from "@/components/ui/states";
import { ProfilePlaceholder } from "@/features/ProfilePlaceholder";

const DoctorsPage = lazy(() => import("@/features/doctors/DoctorsPage"));
const TestsPage = lazy(() => import("@/features/tests/TestsPage"));

function Placeholder({ title, owner }: { title: string; owner: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <section className="rounded-xl border border-dashed border-line bg-card p-8 text-center">
        <h1 className="text-lg font-bold text-fg">{title}</h1>
        <p className="mt-2 text-sm text-muted">
          Page slot ready. Feature implementation owned by {owner} on a separate branch.
        </p>
      </section>
    </div>
  );
}

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
    case "profile":
      content = <ProfilePlaceholder />;
      break;
    case "disease-map":
      content = <Placeholder title="Disease Map (IDSP)" owner="Developer C" />;
      break;
    case "feed":
      content = <Placeholder title="Health Feed" owner="Developer C" />;
      break;
    case "alerts":
      content = <Placeholder title="Live Alerts" owner="Developer C" />;
      break;
    default:
      content = <Placeholder title="AI Doctor & Health Vault" owner="Developer A" />;
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
