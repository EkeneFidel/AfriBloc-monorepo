import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance",
};

const data = [
  {
    title: "Regulatory Posture",
    contents: [
      "Issuer incorporated in the British Virgin Islands. AfriBloc is not currently licensed by the BVI Financial Services Commission (FSC).",
      "Future offerings will be made via licensed partners or under valid exemptions, and may be geo-fenced and restricted to whitelisted investors.",
      "Activities will comply with BVI law and applicable target-market laws.",
    ],
  },
  {
    title: "AML/KYC Framework",
    contents: [
      "KYC/AML/PEP checks performed via Sumsub (ID verification, liveness, sanctions/PEP).",
      "EDD thresholds (e.g., higher tiers for source of funds/wealth).",
      "Ongoing monitoring and periodic refresh; STR/SAR procedures in place.",
      "Payment name match — funding source must match the KYC’d investor (USDC wallet, card, bank transfer, mobile money).",
      "Appoint MLRO, Deputy MLRO, and Compliance Officer; maintain AML Manual and CDD records.",
      "Align to BVI Anti-Money Laundering Regulations & Code of Practice.",
    ],
  },
  {
    title: "Virtual Asset & Securities Posture",
    contents: [
      "Instruments may be treated as securities (SIBA) and/or virtual asset services (VASP Act). We avoid carrying on investment business from within BVI unless licensed; where applicable, we rely on private/offshore placements or licensed distributors.",
      "Travel Rule readiness via VASP partners where required.",
    ],
  },
  {
    title: "On-Chain Controls (Hedera)",
    contents: [
      "Tokens issued on Hedera Token Service (HTS) with KYC & Freeze controls; whitelist-only transfers.",
      "Distributions in USDC; fiat rails via vetted PSPs (Stripe, bank transfers, mobile money where supported).",
      "Safeguards — Segregated client funds, treasury controls, multi-sig approvals, audit trails.",
      "Secondary Liquidity — If enabled, transfers remain issuer-approved within the whitelist until integrated with a duly licensed venue.",
    ],
  },
  {
    title: "Contact (Compliance)",
    contents: ["compliance@afribloc.com"],
  },
];

export default function page() {
  return (
    <main className="w-full">
      <div className="col-center text-Gray-900 container gap-8 py-16 lg:gap-18">
        <div>
          <h1 className="lg:tex-start text-center text-2xl font-bold lg:text-[40px] lg:leading-[100%]">
            Compliance: AML/KYC & VA Standards
          </h1>
          <p className="text-center text-sm font-normal md:text-base">
            Last updated August 2, 2025
          </p>
        </div>
        <ul className="col-start w-full max-w-[858px] gap-8">
          {data.map((term, idx) => (
            <li key={idx} className="col-start gap-2">
              <h3 className="flex items-center gap-3 text-lg font-bold md:text-2xl">
                {term.title}
              </h3>
              <ul className="col-start list-disc gap-3 pl-4">
                {term.contents.map((content, index) => (
                  <li key={index}>
                    <p className="text-sm font-normal md:text-base">
                      {content}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
