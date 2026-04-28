import { BottomNavTeacher } from "@/components/layout/BottomNavTeacher";
import { Header } from "@/components/layout/Header";

export default function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative pb-20 md:pb-24">
      <Header role="teacher" />
      <main>{children}</main>
      <BottomNavTeacher />
    </div>
  );
}
