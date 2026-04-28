import { BottomNavStudent } from "@/components/layout/BottomNavStudent";

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pb-28">
      {children}
      <BottomNavStudent />
    </div>
  );
}
