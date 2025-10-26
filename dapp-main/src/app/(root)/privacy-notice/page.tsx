import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice",
};

const data = [
  {
    title: "Data We Collect",
    content:
      "Account details, contact info, transaction metadata, device/usage analytics, and KYC/AML data (ID documents, liveness, sanctions/PEP outcomes).",
  },
  {
    title: "Sources",
    content: "You; devices; payments partners; Sumsub (KYC/AML/PEP).",
  },
  {
    title: "Use of Data",
    content:
      "Law/tax/perOnboarding, KYC/AML/PEP screening (via Sumsub), servicing, fraud prevention, operations, communications, compliance.mit changes can affect operations and distributions.",
  },
  {
    title: "Lawful Basis",
    content:
      "Consent, contract necessity, legal obligation, legitimate interests.",
  },
  {
    title: "Sharing",
    content:
      "KYC/AML provider (Sumsub), payments partners (Stripe, banks, mobile money), blockchain service providers, auditors, legal/regulators where required.",
  },
  {
    title: "Storage & Transfers",
    content:
      "Secure storage; cross-border transfers with appropriate safeguards where applicable.",
  },
  {
    title: "Retention",
    content: "Kept only as required for regulatory and operational purposes.",
  },
  {
    title: "Your Rights",
    content:
      "Access, rectify, erase, restrict, object, portability (subject to law).",
  },
  {
    title: "Security",
    content: "Technical/organizational measures; no method is 100% secure.",
  },
  {
    title: "Contact",
    content: "privacy@afribloc.com",
  },
];

export default function page() {
  return (
    <main className="w-full">
      <div className="col-center text-Gray-900 container gap-8 py-16 lg:gap-18">
        <div>
          <h1 className="lg:tex-start text-center text-2xl font-bold lg:text-[40px] lg:leading-[100%]">
            Privacy Notice
          </h1>
          <p className="text-center text-sm font-normal md:text-base">
            Last updated August 2, 2025
          </p>
        </div>
        <ul className="col-start w-full max-w-[858px] gap-8">
          {data.map((term, idx) => (
            <li key={idx} className="col-start gap-1">
              <h3 className="text-lg font-bold md:text-2xl flex items-center gap-3">
                <div className="size-2 md:size-2.5 rounded-full bg-black" />{" "}
                <span>{term.title}</span>
              </h3>
              <p className="text-sm font-normal md:text-base">{term.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
