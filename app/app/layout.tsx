import { AppHeader, AppSidebar } from "@/components/site-chrome";

export default function PatientAppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AppHeader />
      <div className="flex min-h-[calc(100vh-64px)]">
        <AppSidebar />
        <main className="min-w-0 flex-1 p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
