import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSwasthya } from "../../context/SwasthyaContext";
import { tabs } from "../../app/routes";
import { Button } from "@/components/ui/button";

export function Nav() {
  const { activeTab, setActiveTab } = useSwasthya();
  const [open, setOpen] = useState(false);

  const handleSelect = (id: typeof tabs[number]["id"]) => {
    setActiveTab(id);
    window.location.hash = id;
    setOpen(false);
  };

  return (
    <nav aria-label="Primary" className="bg-secondary text-secondary-foreground border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between lg:justify-start lg:gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden my-2"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="primary-menu"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <ul
            id="primary-menu"
            className={`${
              open ? "block" : "hidden"
            } lg:flex flex-col lg:flex-row gap-1 pb-2 lg:pb-0`}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => handleSelect(tab.id)}
                    className={`w-full text-left lg:text-center px-4 py-3 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring min-h-[44px] ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
