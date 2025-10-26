import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
};

const data = [
  {
    title:
      "AfriBloc is not a bank; investments are not deposits and not insured.",
    content: "",
  },
  {
    title:
      "Nothing here is investment, legal, tax, or accounting advice. Seek professional advice.",
    content: "",
  },
  {
    title:
      "Nothing here is investment, legal, tax, or accounting advice. Seek professional advice.",
    content: "",
  },
  {
    title: "Past performance is not indicative of future results.",
    content: "",
  },
  {
    title:
      "Availability is subject to jurisdiction, eligibility, and KYC (via Sumsub) when live.",
    content: "",
  },
  {
    title:
      "References to partners/rails (Hedera, USDC, Stripe, bank transfer, mobile money) do not imply endorsement.",
    content: "",
  },
];

export default function page() {
  return (
    <main className="w-full">
      <div className="col-center text-Gray-900 container gap-8 py-16 lg:gap-18">
        <div>
          <h1 className="lg:tex-start text-center text-2xl font-bold lg:text-[40px] lg:leading-[100%]">
            Disclaimer
          </h1>
          <p className="text-center text-sm font-normal md:text-base">
            Last updated August 2, 2025
          </p>
        </div>
        <ul className="col-start w-full max-w-[858px] gap-8">
          {data.map((term, idx) => (
            <li key={idx} className="col-start gap-1">
              <h3 className="flex items-start gap-1 text-lg font-bold">
                {idx + 1}. <span>{term.title}</span>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
