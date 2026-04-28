import { BottomNavAdmin } from "@/components/layout/BottomNavAdmin";
import { Header } from "@/components/layout/Header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative pb-20 md:pb-24">
      <Header role="admin" />
      <main>{children}</main>
      <BottomNavAdmin />
    </div>
  );
}
