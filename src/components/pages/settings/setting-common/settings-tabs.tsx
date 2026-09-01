"use client";

import Link from "next/link";

import { useRouter } from "next/router";


const TABS = [
  { href: "/settings/company-profile", label: "Company Profile" },
  { href: "/settings/contact-person", label: "Contact Person" },
  { href: "/settings/security", label: "Security" },
  { href: "/settings/personalization", label: "Personalization" },
  { href: "/settings/api", label: "API KEY" },
];

export function SettingsTabs() {
  
const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-primary-500/40 shadow-sm p-2 w-full sm:w-56 shrink-0 h-fit">
      {TABS.map((tab) => {
       const isActive = router.pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              isActive ? "text-gray-900 bg-gray-50" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#A3195B] rounded-r-full" />
            )}
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}