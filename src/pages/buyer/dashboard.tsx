import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import AuthWrapper from "../../components/wrappers/Auth";

const BuyerDashboard: NextPage = () => {
  return (
    <AuthWrapper title="Buyer Dashboard">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Buyer Dashboard</h1>
        <p>Welcome to your buyer dashboard!</p>
        {/* Add buyer-specific dashboard content here */}
      </div>
    </AuthWrapper>
  );
};

export default BuyerDashboard;