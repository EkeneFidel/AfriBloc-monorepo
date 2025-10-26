import React from "react";
import PortfolioCard from "./portfolio-card";
import { PortfolioStatTypes } from "@/types/property";

export default function PortfolioStats({
  statsData,
}: {
  statsData: PortfolioStatTypes;
}) {
  return (
    <React.Fragment>
      <PortfolioCard
        title="Total Portfolio"
        value={parseInt(statsData?.totalPortfolio)}
      />

      <PortfolioCard
        title="Total Amount invested"
        value={parseInt(statsData?.totalIncome)}
      />
    </React.Fragment>
  );
}
