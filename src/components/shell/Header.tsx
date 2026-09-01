import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { useSwasthya } from "../../context/SwasthyaContext";
import { Tabs } from "../ui/Tabs";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { languages } from "./languages";
import "./shell.css";

export function Header() {
  const { t } = useTranslation();
  const { language, setLanguage, resetDemo, activePatient } = useSwasthya();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__brand">
          <span className="header__logo" aria-hidden="true">
            <User size={20} />
          </span>
          <div>
            <div className="header__title">{t("app.title")}</div>
            <div className="header__subtitle">{t("app.subtitle")}</div>
          </div>
        </div>

        <div className="header__actions">
          <label className="header__lang-label" htmlFor="language-select">
            <span className="sr-only">Language</span>
          </label>
          <select
            id="language-select"
            className="header__lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as typeof language)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>

          {activePatient ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                resetDemo();
                navigate("/doctor");
              }}
            >
              <LogOut aria-hidden="true" size={16} />
              <span>{t("profile.signOut")}</span>
            </Button>
          ) : null}

          <button
            type="button"
            className="header__menu-toggle"
            aria-label={t("nav.toggle")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X aria-hidden="true" size={22} />
            ) : (
              <Menu aria-hidden="true" size={22} />
            )}
          </button>
        </div>
      </div>

      <nav className="header__desktop-nav" aria-label="Primary">
        <Tabs onNavigate={() => setMobileOpen(false)} />
      </nav>

      {mobileOpen ? (
        <nav className="header__mobile-nav" aria-label="Primary">
          <Tabs onNavigate={() => setMobileOpen(false)} />
        </nav>
      ) : null}
    </header>
  );
}
