export default function PatientsLayout({
  children,
  details,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
}) {
  return (
    <div className="flex h-svh w-full flex-col">
      <div className="flex flex-1 overflow-hidden">
        {children}
        {details}
      </div>
    </div>
  );
}
