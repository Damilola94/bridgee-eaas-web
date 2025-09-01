import { useRouter } from "next/router";
import { useEffect } from "react";

import BusinessDetails from './BusinessDetails';
import PersonalDetails from './PersonalDetails';
import SecuritySettings from './SecuritySettings';

import Tabs from "./Tabs";
import AccountDetails from "./AccountDetails";
import Support from "./Support";

const options = [
  { title: "Profile Details", tab: "personal-details" },
  { title: "Business Details", tab: "business-details" },
  { title: "Account Details", tab: "account-details" },
  { title: "Security Settings", tab: "security-settings" },
  { title: "Support", tab: "support" },
];

function SettingsContainer() {
  const router = useRouter();
  const { tab } = router?.query || {};

  useEffect(() => {
    if (!router?.query?.tab) {
      router.push({
        pathname: "/settings",
        query: { tab: "personal-details" },
      });
    }
  }, [router]);

  const renderTabContent = () => {
    switch (tab) {
      case "personal-details":
        return <PersonalDetails />;
      case "business-details":
        return <BusinessDetails />;
      case "account-details":
        return <AccountDetails />;
      case "security-settings":
        return <SecuritySettings />;
      case "support":
        return <Support />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <Tabs options={options} pathname="/settings" />
      <div
        className={`${
          tab !== "security-settings"
            ? "bg-white rounded-lg p-10 shadow w-full xl:w-[60%] mt-12"
            : ""
        }`}
      >
        {renderTabContent()}
      </div>
    </div>
  );
}

export default SettingsContainer;