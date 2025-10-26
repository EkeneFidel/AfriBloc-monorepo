import AppLogo from "@/components/ui/app-logo/app-logo";
import OnboardingProvider from "@/contexts/onboardingContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col gap-2">
      <div className="border-Gray-100 w-full border-b px-4 py-3">
        <AppLogo />
      </div>

      <OnboardingProvider>
        <section className="flex flex-1 items-center justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-[408px]">{children}</div>
        </section>
      </OnboardingProvider>
    </section>
  );
}
