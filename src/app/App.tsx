import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Providers } from "./providers";
import { pathToTab } from "./routes";
import { useSwasthya } from "../context/SwasthyaContext";
import { EmergencyBar } from "../components/shell/EmergencyBar";
import { Header } from "../components/shell/Header";
import { Footer } from "../components/shell/Footer";
import { DemoNotice } from "../components/shell/DemoNotice";
import { Onboarding } from "../features/onboarding/Onboarding";
import { DoctorPage } from "../features/doctor/DoctorPage";
import { PlaceholderPage } from "../features/PlaceholderPage";

function Shell() {
  const location = useLocation();
  const { setActiveTab, onboardingComplete } = useSwasthya();

  useEffect(() => {
    setActiveTab(pathToTab(location.pathname));
  }, [location.pathname, setActiveTab]);

  if (!onboardingComplete) {
    return (
      <div className="app">
        <EmergencyBar />
        <Onboarding />
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <EmergencyBar />
      <Header />
      <DemoNotice />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Navigate to="/doctor" replace />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/doctors" element={<PlaceholderPage title="Find Doctors Nearby" />} />
          <Route path="/tests" element={<PlaceholderPage title="Tests & Vaccinations" />} />
          <Route path="/disease-map" element={<PlaceholderPage title="Disease Map" />} />
          <Route path="/feed" element={<PlaceholderPage title="Health Feed" />} />
          <Route path="/alerts" element={<PlaceholderPage title="Live Alerts" />} />
          <Route path="/profile" element={<PlaceholderPage title="Profile" />} />
          <Route path="*" element={<Navigate to="/doctor" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Providers>
      <Shell />
    </Providers>
  );
}
