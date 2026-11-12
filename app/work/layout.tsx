import { SiteHeader } from "@/components/SiteHeader";

export default function WorkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader variant="case" />
      <main id="main" className="flex-1">
        {children}
      </main>
    </>
  );
}
