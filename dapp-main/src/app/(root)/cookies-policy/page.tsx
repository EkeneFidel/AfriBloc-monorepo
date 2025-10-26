import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies Policy",
};

const data = [
  {
    title: "What we use",
    content:
      "Essential cookies (security/session), analytics (usage), performance/UX, and vendor SDKs.",
  },
  {
    title: "Control",
    content:
      "Manage via browser settings and our cookie banner. Disabling some cookies may reduce functionality.",
  },
  {
    title: "Third-party",
    content:
      "Some analytics/KYC/payments tools (e.g., Sumsub, Stripe) may set their cookies/SDKs.",
  },
];

export default function page() {
  return (
    <main className="w-full">
      <div className="col-center text-Gray-900 container gap-8 py-16 lg:gap-18">
        <div>
          <h1 className="lg:tex-start text-center text-2xl font-bold lg:text-[40px] lg:leading-[100%]">
            Cookies Policy
          </h1>
          <p className="text-center text-sm font-normal md:text-base">
            Last updated August 2, 2025
          </p>
        </div>
        <ul className="col-start w-full max-w-[858px] gap-8">
          {data.map((term, idx) => (
            <li key={idx} className="col-start gap-1">
              <h3 className="flex items-center gap-3 text-lg font-bold md:text-2xl">
                <div className="size-2 rounded-full bg-black md:size-2.5" />{" "}
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
