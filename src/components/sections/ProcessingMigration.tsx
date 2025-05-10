import { useEffect, useState } from 'react';
import { Loader2 } from "lucide-react"

import { MigrationItem } from '@models/general';
import useGeneralStore from '@store/GeneralStore';

interface ErrorProcess {
  message: string
  error: unknown
  status: number
}

// Funciones de migración de ejemplo
const migrateUsers = async () => {
  // Lógica de migración de usuarios
  // Por ahora solo ejemplo
  console.log("Migrando users");
};
const migratePolicies = async () => {
  // Lógica de migración de policies & permissions
  console.log("Migrando policies & permissions");
};
const migrateRoles = async () => {
  // Lógica de migración de roles
  console.log("Migrando roles");
};
const migrateSchema = async () => {
  // Lógica de migración de schema
  console.log("Migrando schema");
};
const migrateFlows = async () => {
  // Lógica de migración de flows
  console.log("Migrando flows");
};
const migrateDashboards = async () => {
  // Lógica de migración de dashboards
  console.log("Migrando dashboards");
};

const ProcessingMigration = () => {
  const { isConnect, migrationsCheck, setMigrationsCheck } = useGeneralStore();

  const [errors, setErrors] = useState<ErrorProcess[]>([])
  const [process, setProcess] = useState({
    currentStep: 0,
    message: "Iniciando migración"
  })

  useEffect(() => {
    const runMigrations = async () => {
      if (!migrationsCheck || migrationsCheck.length === 0) return;
      for (let i = 0; i < migrationsCheck.length; i++) {
        const item = migrationsCheck[i] as MigrationItem;
        setProcess({
          currentStep: i + 1,
          message: `Migrando ${item}`
        });
        switch (item) {
          case "users":
            await migrateUsers();
            break;
          case "policies & permissions":
            await migratePolicies();
            break;
          case "roles":
            await migrateRoles();
            break;
          case "schema":
            await migrateSchema();
            break;
          case "flows":
            await migrateFlows();
            break;
          case "dashboards":
            await migrateDashboards();
            break;
          default:
            break;
        }
      }
      setProcess({
        currentStep: migrationsCheck.length,
        message: "Migración finalizada"
      });
    };
    runMigrations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [migrationsCheck]);

  return (
    <div className='bg-violet-400/20 rounded-lg px-4 py-2'>
      <div className='flex flex-row gap-1 items-center'>
        <Loader2 className='animate-spin' /><p>{process?.currentStep}/{migrationsCheck?.length || 0}  {process?.message}</p>
      </div>
    </div>
  )
}

export default ProcessingMigration