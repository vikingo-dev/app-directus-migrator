import Header from "@sections/Header";
import FormConnections from "@sections/FormConnections";
import MigratorChecklist from "@sections/MigratorChecklist";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Header />
      <FormConnections />
      <MigratorChecklist />
    </div>
  );
}
