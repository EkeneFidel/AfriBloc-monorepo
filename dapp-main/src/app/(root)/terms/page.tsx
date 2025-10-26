import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

const data = [
  {
    title: "No Offer ",
    content: "This site is informational only and not an offer or solicitation.",
  },
  {
    title: "Eligibility",
    content: "Access and any future investments are subject to jurisdictional limits, whitelisting, and successful KYC (via Sumsub).",
  },
  {
    title: "Accounts",
    content: "We may approve/deny/limit access; geo-fencing applies.",
  },
  {
    title: "Investments (when live)",
    content: "Governed by deal-specific documents (PPM/IM, subscription, risk factors).",
  },
  {
    title: "Transfers",
    content: "If enabled, secondary transfers are restricted to issuer-approved, whitelisted wallets.",
  },
  {
    title: "Fees",
    content: "Acquisition, service/management, and deal costs are disclosed per offering.",
  },
  {
    title: "Content Changes",
    content: "We may update, pause, or remove features without notice.",
  },
  {
    title: "Prohibited Use",
    content: "No unlawful, fraudulent, or abusive activity.",
  },
  {
    title: "IP",
    content: "Content owned by AfriBloc or its licensors.",
  },
  {
    title: "Liability",
    content: "Provided “as is”; to the extent permitted by law, warranties are disclaimed and liability limited.",
  },
  {
    title: "Governing Law / Forum",
    content: "British Virgin Islands law; BVI courts (non-exclusive) or arbitration seated in BVI.",
  },
  {
    title: "Contact",
    content: "Reach out to us on compliance@afribloc.com · contact@afribloc.com",
  },
];

export default function page() {
  return (
    <main className="w-full">
      <div className="col-center text-Gray-900 container gap-8 py-16 lg:gap-18">
        <div>
          <h1 className="lg:tex-start text-center text-2xl font-bold lg:text-[40px] lg:leading-[100%]">
            Terms and Conditions
          </h1>
          <p className="text-center text-sm md:text-base font-normal">
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
