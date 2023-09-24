import { SettingsTopbar } from "./components/settingsTopbar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <SettingsTopbar />
      <div className="flex flex-col pt-10">{children}</div>
    </div>
  );
}
