import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclosures and Risks",
};

const data = [
  {
    title: "Market/Demand",
    content: "Occupancy, ADR, valuations may vary materially.",
  },
  {
    title: "Operational",
    content:
      "Renovations, maintenance, utilities, vendor performance, and permitting impact returns.",
  },
  {
    title: "Regulatory/Legal",
    content: "Law/tax/permit changes can affect operations and distributions.",
  },
  {
    title: "FX & Macro",
    content: "Currency/inflation can reduce results.",
  },
  {
    title: "Liquidity",
    content: "Secondary markets may be limited; exits can take time.",
  },
  {
    title: "Counterparty",
    content:
      "Property manager, tenants, payment processors, and service providers.",
  },
  {
    title: "Technology",
    content:
      "Smart contracts, token standards, keys, and third-party infra carry risk.",
  },
  {
    title: "Performance",
    content:
      "Projections are illustrative; returns not guaranteed. Capital at risk.",
  },
  {
    title: "Fees",
    content: "Fees reduce investor returns; see deal documents.",
  },
];

export default function page() {
  return (
    <main className="w-full">
      <div className="col-center text-Gray-900 container gap-8 py-16 lg:gap-18">
        <div>
          <h1 className="lg:tex-start text-center text-2xl font-bold lg:text-[40px] lg:leading-[100%]">
            Disclosures & Risks
          </h1>
          <p className="text-center text-sm font-normal md:text-base">
            Last updated August 2, 2025
          </p>
        </div>
        <ul className="col-start w-full max-w-[858px] gap-8">
          {data.map((term, idx) => (
            <li key={idx} className="col-start gap-1">
              <h3 className="text-lg font-bold md:text-2xl">
                {idx + 1}. <span>{term.title}</span>
              </h3>
              <p className="text-sm font-normal md:text-base">{term.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
