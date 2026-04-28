export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f8f6f3] text-stone-900">
      <main className="mx-auto w-full max-w-3xl">{children}</main>
    </div>
  );
}
