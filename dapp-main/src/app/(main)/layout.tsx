import Footer from "@/components/main/footer/footer";
import UserHeader from "@/components/main/user/user-header/user-header";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserHeader />
      {children}
      <Footer />
    </>
  );
}
