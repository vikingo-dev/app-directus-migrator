"use client"
import { useState } from 'react'
import { Server } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import useGeneralStore from '@store/GeneralStore';
import type { MigrationItem } from '@models/general';
import ProcessingMigration from "./ProcessingMigration"

const MIGRATION_ITEMS: { key: MigrationItem; message: string }[] = [
  { key: "schema", message: "If this is your first migration, don't forget to select the schema" },
  { key: "policies & permissions", message: "" },
  { key: "roles", message: "When migrating roles, also migrate policies and permissions now or before" },
  { key: "users", message: "When migrating users, also migrate roles now or before" },
  { key: "flows", message: "" },
  { key: "dashboards", message: "" },
];

const MigratorChecklist = () => {
  const { isConnect, migrationsCheck, setMigrationsCheck } = useGeneralStore();
  const [processing, setProcessing] = useState(false)

  // Seleccionar o deseleccionar todos
  const handleToggleAll = () => {
    if (migrationsCheck.length === MIGRATION_ITEMS.length) {
      MIGRATION_ITEMS.forEach(itemObj => setMigrationsCheck(itemObj.key, false));
    } else {
      MIGRATION_ITEMS.forEach(itemObj => {
        if (!migrationsCheck.includes(itemObj.key)) setMigrationsCheck(itemObj.key, false);
      });
    }
  };

  // Alternar un solo item
  const handleToggleItem = (item: MigrationItem) => {
    setMigrationsCheck(item, false);
  };

  return (
    <div className='CardGlass'>
      <AnimatePresence mode="wait">
        {processing ? (
          <ProcessingMigration />
        ) : (
          <>
            {isConnect ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='flex flex-col gap-2'
              >
                <h3 className='font-extrabold text-xl font-mono mb-4'>Select the data you want to migrate</h3>
                <label className='flex items-center gap-2 font-semibold cursor-pointer'>
                  <input
                    type="checkbox"
                    checked={migrationsCheck.length === MIGRATION_ITEMS.length}
                    onChange={handleToggleAll}
                    className="peer sr-only"
                  />
                  <span className="w-5 h-5 flex items-center justify-center border-2 border-violet-500 rounded transition-colors duration-200 bg-white dark:bg-gray-900 peer-checked:bg-violet-600 peer-checked:border-violet-600">
                    {migrationsCheck.length === MIGRATION_ITEMS.length && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    )}
                  </span>
                  Select All
                </label>
                <hr />
                {MIGRATION_ITEMS.map((itemObj) => (
                  <motion.label
                    key={itemObj.key}
                    className='flex items-center gap-2 cursor-pointer'
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="checkbox"
                      checked={migrationsCheck.includes(itemObj.key)}
                      onChange={() => handleToggleItem(itemObj.key)}
                      className="peer sr-only"
                    />
                    <span className="w-5 h-5 flex items-center justify-center border-2 border-violet-500 rounded transition-colors duration-200 bg-white dark:bg-gray-900 peer-checked:bg-violet-600 peer-checked:border-violet-600">
                      {migrationsCheck.includes(itemObj.key) && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      )}
                    </span>
                    <span className='capitalize'>{itemObj.key}</span>
                    <span className='text-xs text-gray-500 ml-2'>{itemObj.message}</span>
                  </motion.label>
                ))}

                <button
                  // onClick={() => setIsConnect(false)}
                  className='w-fit mx-auto flex flex-row items-center gap-2'>
                  <Server />
                  Let's Start Migrating
                </button>
              </motion.div>
            ) : (
              <motion.p
                key="msg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='text-center text-gray-400 font-mono'
              >
                Complete the previous information to continue
              </motion.p>
            )}
          </>
        )}

      </AnimatePresence>
    </div>
  );
}

export default MigratorChecklist